import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PlayerScreen } from './PlayerScreen';
import { createInitialState } from '../../domain/types';

const mockScene = {
  id: 'test_scene',
  narrative: 'This is a test story.\n\nParagraph 2.',
  choices: [
    { id: 'c1', label: 'Go Left', next: 'scene_2' },
    { id: 'c2', label: 'Go Right', next: 'scene_3' }
  ],
  title: 'Test Station'
};

const mockSettings = {
  textSize: 'M' as const,
  reduceMotion: false,
  immersionFx: false,
  showStatus: true,
  autoSave: true
};

describe('PlayerScreen', () => {
  it('renders narrative text correctly', () => {
    render(
      <PlayerScreen 
        scene={mockScene}
        choices={mockScene.choices}
        gameState={createInitialState('test_scene')}
        onChoice={() => {}}
        settings={mockSettings}
        onUpdateSettings={() => {}}
        onExit={() => {}}
      />
    );

    expect(screen.getByText('This is a test story.')).toBeTruthy();
    expect(screen.getByText('Paragraph 2.')).toBeTruthy();
  });

  it('renders choice buttons', () => {
    render(
      <PlayerScreen 
        scene={mockScene}
        choices={mockScene.choices}
        gameState={createInitialState('test_scene')}
        onChoice={() => {}}
        settings={mockSettings}
        onUpdateSettings={() => {}}
        onExit={() => {}}
      />
    );

    expect(screen.getByText('Go Left')).toBeTruthy();
    expect(screen.getByText('Go Right')).toBeTruthy();
  });

  it('calls onChoice when button is clicked', () => {
    vi.useFakeTimers();
    const handleChoice = vi.fn();
    render(
      <PlayerScreen 
        scene={mockScene}
        choices={mockScene.choices}
        gameState={createInitialState('test_scene')}
        onChoice={handleChoice}
        settings={mockSettings}
        onUpdateSettings={() => {}}
        onExit={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Go Left'));

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(handleChoice).toHaveBeenCalledWith(mockScene.choices[0]);
    vi.useRealTimers();
  });
});
