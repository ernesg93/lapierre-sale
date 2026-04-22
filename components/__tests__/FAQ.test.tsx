import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../FAQ';

describe('FAQ Component', () => {
  it('renders the title and all questions', () => {
    render(<FAQ />);
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
    expect(screen.getByText('¿Ha tenido caídas o reparaciones estructurales?')).toBeInTheDocument();
    expect(screen.getByText('¿Por qué la vendes con menos de 1 año?')).toBeInTheDocument();
    expect(screen.getByText('¿Qué incluye exactamente el pack de accesorios?')).toBeInTheDocument();
  });

  it('initially has all answers collapsed', () => {
    const { container } = render(<FAQ />);
    // In FAQ.tsx, the answer container has 'grid-rows-[0fr]' when closed
    const answerContainers = container.querySelectorAll('.grid.transition-all');
    answerContainers.forEach(container => {
      expect(container).toHaveClass('grid-rows-[0fr]');
      expect(container).toHaveClass('opacity-0');
    });
  });

  it('toggles an answer when a question is clicked', () => {
    render(<FAQ />);
    const question = screen.getByText('¿Ha tenido caídas o reparaciones estructurales?');
    const button = question.closest('button');
    
    if (!button) throw new Error('Question button not found');

    // Click to open
    fireEvent.click(button);
    
    // The container for the answer is the parent of the paragraph
    const answerText = screen.getByText(/cuadro jamás tocó el asfalto/);
    const container = answerText.closest('.grid.transition-all');
    
    expect(container).toHaveClass('grid-rows-[1fr]');
    expect(container).toHaveClass('opacity-100');

    // Click again to close
    fireEvent.click(button);
    expect(container).toHaveClass('grid-rows-[0fr]');
    expect(container).toHaveClass('opacity-0');
  });

  it('only allows one answer to be open at a time (exclusive toggle)', () => {
    render(<FAQ />);
    const questions = [
      screen.getByText('¿Ha tenido caídas o reparaciones estructurales?'),
      screen.getByText('¿Por qué la vendes con menos de 1 año?')
    ];
    
    const buttons = questions.map(q => q.closest('button')!);

    // Open first
    fireEvent.click(buttons[0]);
    const firstAnswer = screen.getByText(/cuadro jamás tocó el asfalto/).closest('.grid.transition-all');
    expect(firstAnswer).toHaveClass('grid-rows-[1fr]');

    // Open second
    fireEvent.click(buttons[1]);
    const secondAnswer = screen.getByText(/cambio de disciplina/).closest('.grid.transition-all');
    
    expect(secondAnswer).toHaveClass('grid-rows-[1fr]');
    // First one should now be closed
    expect(firstAnswer).toHaveClass('grid-rows-[0fr]');
  });
});
