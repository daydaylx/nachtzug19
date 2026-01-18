import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePlayerSession } from './state/usePlayerSession';
import { nachtzug19Manifest } from '../../content/nachtzug19/manifest';

const SceneProbe: React.FC = () => {
  const { currentScene, isLoading } = usePlayerSession();

  return (
    <div data-testid="scene">
      {isLoading ? 'loading' : currentScene?.id || 'none'}
    </div>
  );
};

const ChoiceHarness: React.FC = () => {
  const { currentScene, availableChoices, makeChoice, isLoading } = usePlayerSession();

  if (isLoading || !currentScene) {
    return <div data-testid="scene">loading</div>;
  }

  const nextChoice = availableChoices.find((choice) => choice.next);
  const nextId = nextChoice?.next || '';

  return (
    <div>
      <div data-testid="scene" data-next={nextId}>{currentScene.id}</div>
      <button type="button" onClick={() => nextChoice && makeChoice(nextChoice)} disabled={!nextChoice}>
        choose
      </button>
    </div>
  );
};

const ContinueHarness: React.FC = () => {
  const { currentScene, continueGame, isLoading, canContinue } = usePlayerSession();

  return (
    <div>
      <div data-testid="scene">{currentScene?.id || 'none'}</div>
      <button type="button" onClick={continueGame} disabled={isLoading || !canContinue}>
        continue
      </button>
    </div>
  );
};

describe('Player session', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads the start scene', async () => {
    render(<SceneProbe />);

    await waitFor(() => {
      expect(screen.getByTestId('scene').textContent).toBe(nachtzug19Manifest.start_scene_id);
    });
  });

  it('advances to the next scene on choice click', async () => {
    render(<ChoiceHarness />);

    await waitFor(() => {
      const nextId = screen.getByTestId('scene').getAttribute('data-next');
      expect(nextId).toBeTruthy();
    });

    const nextId = screen.getByTestId('scene').getAttribute('data-next') as string;
    fireEvent.click(screen.getByRole('button', { name: 'choose' }));

    await waitFor(() => {
      expect(screen.getByTestId('scene').textContent).toBe(nextId);
    });
  });

  it('restores autosave on continue', async () => {
    const { unmount } = render(<ChoiceHarness />);

    await waitFor(() => {
      const nextId = screen.getByTestId('scene').getAttribute('data-next');
      expect(nextId).toBeTruthy();
    });

    const nextId = screen.getByTestId('scene').getAttribute('data-next') as string;
    fireEvent.click(screen.getByRole('button', { name: 'choose' }));

    await waitFor(() => {
      expect(screen.getByTestId('scene').textContent).toBe(nextId);
    });

    unmount();

    render(<ContinueHarness />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'continue' })).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole('button', { name: 'continue' }));

    await waitFor(() => {
      expect(screen.getByTestId('scene').textContent).toBe(nextId);
    });
  });
});
