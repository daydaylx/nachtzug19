import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ReaderCard } from './ReaderCard';
import { Scene } from '../../../domain/types';

describe('ReaderCard', () => {
  const mockScene: Scene = {
    id: 'test_scene',
    title: 'Test Title',
    narrative: 'Paragraph 1.\n\nParagraph 2.',
    choices: []
  };

  it('renders title and narrative', () => {
    render(<ReaderCard scene={mockScene} textSize="M" driftEnabled={false} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 1.')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2.')).toBeInTheDocument();
  });

  it('applies drift class when driftEnabled is true', () => {
    const { container } = render(<ReaderCard scene={mockScene} textSize="M" driftEnabled={true} />);
    const card = container.querySelector('.rn-reader-card--drift');
    expect(card).toBeInTheDocument();
  });
});
