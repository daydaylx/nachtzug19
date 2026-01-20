import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChoiceTray } from './ChoiceTray';
import { Choice } from '../../../domain/types';

describe('ChoiceTray', () => {
  const mockChoices: Choice[] = [
    { id: 'c1', label: 'Choice 1' },
    { id: 'c2', label: 'Choice 2' }
  ];
  const mockOnChoose = vi.fn();
  const mockOnToggleStatus = vi.fn();
  const mockOnToggleSettings = vi.fn();

  it('renders choices', () => {
    render(
      <ChoiceTray
        choices={mockChoices}
        onChoose={mockOnChoose}
        isProcessing={false}
        onToggleStatus={mockOnToggleStatus}
        onToggleSettings={mockOnToggleSettings}
        showStatusToggle={true}
        committedIndex={null}
      />
    );

    expect(screen.getByText('Choice 1')).toBeInTheDocument();
    expect(screen.getByText('Choice 2')).toBeInTheDocument();
  });

  it('calls onChoose when choice is clicked', () => {
    render(
      <ChoiceTray
        choices={mockChoices}
        onChoose={mockOnChoose}
        isProcessing={false}
        onToggleStatus={mockOnToggleStatus}
        onToggleSettings={mockOnToggleSettings}
        showStatusToggle={true}
        committedIndex={null}
      />
    );

    fireEvent.click(screen.getByText('Choice 1').closest('button')!);
    expect(mockOnChoose).toHaveBeenCalledWith(mockChoices[0], 0);
  });

  it('disables buttons when isProcessing is true', () => {
    render(
      <ChoiceTray
        choices={mockChoices}
        onChoose={mockOnChoose}
        isProcessing={true}
        onToggleStatus={mockOnToggleStatus}
        onToggleSettings={mockOnToggleSettings}
        showStatusToggle={true}
        committedIndex={null}
      />
    );

    const button = screen.getByText('Choice 1').closest('button')!;
    expect(button).toBeDisabled();
  });
});
