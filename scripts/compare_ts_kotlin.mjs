#!/usr/bin/env node
/**
 * TS-Kotlin Parity Checker
 * Detects schema and engine drift between TypeScript and Android Kotlin code.
 */

import fs from 'fs/promises';

const PATHS = {
  tsTypes: './src/domain/types/index.ts',
  tsEngine: './src/domain/engine/gameEngine.ts',
  ktModels: './android-native/app/src/main/java/de/daydaylx/nachtzug19/model/Models.kt',
  ktEngine: './android-native/app/src/main/java/de/daydaylx/nachtzug19/engine/GameEngine.kt',
  ktViewModel: './android-native/app/src/main/java/de/daydaylx/nachtzug19/ui/GameViewModel.kt'
};

function extractTsUnionMembers(source, typeName) {
  const match = source.match(new RegExp(`export type ${typeName}\\s*=\\s*([\\s\\S]*?);`));
  if (!match) return [];
  const members = [];
  const pattern = /'([^']+)'/g;
  let current = pattern.exec(match[1]);
  while (current) {
    members.push(current[1]);
    current = pattern.exec(match[1]);
  }
  return members;
}

function extractBalancedBlock(source, openIndex, openChar, closeChar) {
  let depth = 0;
  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];
    if (char === openChar) {
      depth += 1;
      continue;
    }
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openIndex + 1, i);
      }
    }
  }
  return '';
}

function extractKtEnumSerialNames(source, enumName) {
  const start = source.indexOf(`enum class ${enumName}`);
  if (start === -1) return [];
  const open = source.indexOf('{', start);
  if (open === -1) return [];
  const block = extractBalancedBlock(source, open, '{', '}');
  return [...block.matchAll(/@SerialName\("([^"]+)"\)/g)].map((match) => match[1]);
}

function extractTsObjectKeys(source, typeName) {
  const match = source.match(new RegExp(`export type ${typeName}\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!match) return [];
  return [...match[1].matchAll(/^\s*([a-zA-Z0-9_]+)\s*:/gm)].map((entry) => entry[1]);
}

function extractKtDataClassFields(source, className) {
  const start = source.indexOf(`data class ${className}(`);
  if (start === -1) return [];
  const open = source.indexOf('(', start);
  if (open === -1) return [];
  const block = extractBalancedBlock(source, open, '(', ')');
  return [...block.matchAll(/\bval\s+([a-zA-Z0-9_]+)\s*:/g)].map((entry) => entry[1]);
}

function diffSets(leftKeys, rightKeys) {
  const left = new Set(leftKeys);
  const right = new Set(rightKeys);
  const onlyLeft = [...left].filter((key) => !right.has(key)).sort();
  const onlyRight = [...right].filter((key) => !left.has(key)).sort();
  return { onlyLeft, onlyRight };
}

function formatList(values) {
  return values.length === 0 ? 'none' : values.join(', ');
}

async function main() {
  console.log('🔧 TS-Kotlin Parity Analysis');
  console.log('='.repeat(80));

  const [tsTypes, tsEngine, ktModels, ktEngine, ktViewModel] = await Promise.all([
    fs.readFile(PATHS.tsTypes, 'utf-8'),
    fs.readFile(PATHS.tsEngine, 'utf-8'),
    fs.readFile(PATHS.ktModels, 'utf-8'),
    fs.readFile(PATHS.ktEngine, 'utf-8'),
    fs.readFile(PATHS.ktViewModel, 'utf-8')
  ]);

  const issues = [];
  const checks = [];

  const tsEffectTargets = extractTsUnionMembers(tsTypes, 'EffectTarget');
  const ktEffectTargets = extractKtEnumSerialNames(ktModels, 'EffectTarget');
  const effectTargetDiff = diffSets(tsEffectTargets, ktEffectTargets);
  checks.push({
    name: 'EffectTarget parity',
    details: `TS=${tsEffectTargets.length}, Kotlin=${ktEffectTargets.length}`
  });
  if (effectTargetDiff.onlyLeft.length || effectTargetDiff.onlyRight.length) {
    issues.push({
      id: 'PARITY-001',
      severity: 'P0',
      symptom: 'EffectTarget schema drift between TypeScript and Kotlin',
      evidence: {
        ts_only: effectTargetDiff.onlyLeft,
        kotlin_only: effectTargetDiff.onlyRight
      }
    });
  }

  const tsItems = extractTsObjectKeys(tsTypes, 'Items');
  const ktItems = extractKtDataClassFields(ktModels, 'Items');
  const itemsDiff = diffSets(tsItems, ktItems);
  checks.push({
    name: 'Items parity',
    details: `TS=${tsItems.length}, Kotlin=${ktItems.length}`
  });
  if (itemsDiff.onlyLeft.length || itemsDiff.onlyRight.length) {
    issues.push({
      id: 'PARITY-002',
      severity: 'P0',
      symptom: 'Items schema drift between TypeScript and Kotlin',
      evidence: {
        ts_only: itemsDiff.onlyLeft,
        kotlin_only: itemsDiff.onlyRight
      }
    });
  }

  const ktSetSupportsString =
    ktEngine.includes('stringOrNull')
    || (ktEngine.includes('isString') && ktEngine.includes('content'));
  checks.push({
    name: 'Kotlin set/compare string support',
    details: ktSetSupportsString ? 'present' : 'missing'
  });
  if (!ktSetSupportsString) {
    issues.push({
      id: 'PARITY-003',
      severity: 'P0',
      symptom: 'Kotlin engine does not support string-valued set/compare effects',
      evidence: {
        expected: 'string handling via stringOrNull or JsonPrimitive.isString/content in set/compare',
        found: false
      }
    });
  }

  const tsHasAutoNext = tsEngine.includes('export function checkAutoNext');
  const tsHasAutoNextIntegration = tsEngine.includes('advanceAutoNextIfNeeded(): boolean');
  const ktHasAutoNext = ktEngine.includes('fun checkAutoNext');
  const ktHasAutoNextIntegration = ktEngine.includes('fun advanceAutoNextIfNeeded(): Boolean');
  const viewModelTriggersAutoNext = ktViewModel.includes('advanceAutoTransitionsIfNeeded()');
  checks.push({
    name: 'Auto-next hook presence',
    details: `tsHelper=${tsHasAutoNext}, tsIntegration=${tsHasAutoNextIntegration}, ktHelper=${ktHasAutoNext}, ktIntegration=${ktHasAutoNextIntegration}, viewModelHook=${viewModelTriggersAutoNext}`
  });
  if (!tsHasAutoNext || !tsHasAutoNextIntegration || !ktHasAutoNext || !ktHasAutoNextIntegration || !viewModelTriggersAutoNext) {
    issues.push({
      id: 'PARITY-004',
      severity: 'P1',
      symptom: 'Auto-next helper exists without complete runtime integration',
      evidence: {
        ts_helper: tsHasAutoNext,
        ts_integration: tsHasAutoNextIntegration,
        kotlin_helper: ktHasAutoNext,
        kotlin_integration: ktHasAutoNextIntegration,
        viewmodel_hook: viewModelTriggersAutoNext
      }
    });
  }

  const reportLines = [];
  reportLines.push('# TS-Kotlin Parity Report');
  reportLines.push('');
  reportLines.push(`**Generated:** ${new Date().toISOString()}`);
  reportLines.push('');
  reportLines.push('## Summary');
  reportLines.push('');
  reportLines.push(`- **Total Checks:** ${checks.length}`);
  reportLines.push(`- **Total Parity Issues:** ${issues.length}`);
  reportLines.push('');
  reportLines.push('## Check Results');
  reportLines.push('');
  checks.forEach((check) => {
    reportLines.push(`- **${check.name}:** ${check.details}`);
  });
  reportLines.push('');

  if (issues.length === 0) {
    reportLines.push('✅ **No parity drift detected for checked schema and flow hooks.**');
    reportLines.push('');
  } else {
    reportLines.push('## Issues');
    reportLines.push('');
    issues.forEach((issue) => {
      reportLines.push(`### ${issue.id}: ${issue.symptom}`);
      reportLines.push('');
      reportLines.push(`- **Severity:** ${issue.severity}`);
      reportLines.push('- **Evidence:**');
      reportLines.push('  ```json');
      reportLines.push(`  ${JSON.stringify(issue.evidence, null, 2)}`);
      reportLines.push('  ```');
      reportLines.push('');
    });
  }

  await fs.mkdir('./reports', { recursive: true });
  await fs.writeFile('./reports/ts_kotlin_parity.md', reportLines.join('\n'));

  console.log(`✅ EffectTarget parity: TS=${tsEffectTargets.length}, Kotlin=${ktEffectTargets.length}`);
  if (effectTargetDiff.onlyLeft.length || effectTargetDiff.onlyRight.length) {
    console.log(`   TS only: ${formatList(effectTargetDiff.onlyLeft)}`);
    console.log(`   Kotlin only: ${formatList(effectTargetDiff.onlyRight)}`);
  }

  console.log(`✅ Items parity: TS=${tsItems.length}, Kotlin=${ktItems.length}`);
  if (itemsDiff.onlyLeft.length || itemsDiff.onlyRight.length) {
    console.log(`   TS only: ${formatList(itemsDiff.onlyLeft)}`);
    console.log(`   Kotlin only: ${formatList(itemsDiff.onlyRight)}`);
  }

  console.log(`✅ Kotlin string effect support: ${ktSetSupportsString ? 'present' : 'missing'}`);
  console.log(`✅ Auto-next hooks: ts=${tsHasAutoNext}, ts-integration=${tsHasAutoNextIntegration}, kt=${ktHasAutoNext}, kt-integration=${ktHasAutoNextIntegration}, viewmodel=${viewModelTriggersAutoNext}`);
  console.log('✅ Written: reports/ts_kotlin_parity.md');
  console.log('='.repeat(80));
  console.log(`✅ Parity check complete: ${issues.length} issues found`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
