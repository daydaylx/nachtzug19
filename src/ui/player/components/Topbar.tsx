import React from 'react';

interface TopbarProps {
  chapter: number;
  title?: string;
  timeLabel?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  chapter,
  title = 'NACHTZUG 19',
  timeLabel = '02:47'
}) => {
  const safeChapter = Number.isFinite(chapter) && chapter > 0 ? chapter : 1;

  return (
    <header className="rn-topbar">
      <div className="rn-topbar-section">K{safeChapter}</div>
      <div className="rn-topbar-title">{title}</div>
      <div className="rn-topbar-section rn-topbar-time">{timeLabel}</div>
    </header>
  );
};
