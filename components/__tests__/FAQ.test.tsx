import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQ from '../FAQ';

describe('FAQ Component', () => {
  const firstQuestion = '¿Ha tenido caídas o reparaciones estructurales?';
  const secondQuestion = '¿Por qué la vendes con menos de 1 año?';

  const getQuestionButton = (label: string) => screen.getByRole('button', { name: label });

  const getControlledPanel = (button: HTMLElement) => {
    const panelId = button.getAttribute('aria-controls');
    if (!panelId) {
      throw new Error('Expected question button to define aria-controls');
    }

    const panel = document.getElementById(panelId);
    if (!panel) {
      throw new Error(`Expected panel with id ${panelId} to exist`);
    }

    return panel;
  };

  it('exposes exactly one visible faq anchor destination', () => {
    const { container } = render(<FAQ />);
    const faqAnchors = container.querySelectorAll('section#faq');

    expect(faqAnchors).toHaveLength(1);
    expect(faqAnchors[0]).toBeVisible();
  });

  it('renders the title and all questions', () => {
    render(<FAQ />);
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
    expect(screen.getByText('¿Ha tenido caídas o reparaciones estructurales?')).toBeInTheDocument();
    expect(screen.getByText('¿Por qué la vendes con menos de 1 año?')).toBeInTheDocument();
    expect(screen.getByText('¿Qué incluye exactamente el pack de accesorios?')).toBeInTheDocument();
  });

  it('initially has all answers collapsed', () => {
    render(<FAQ />);
    const questionButtons = screen.getAllByRole('button');

    expect(questionButtons).toHaveLength(3);
    questionButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls');
      const panel = getControlledPanel(button);
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveAttribute('hidden');
    });
  });

  it('toggles an answer when a question is clicked', () => {
    render(<FAQ />);
    const button = getQuestionButton(firstQuestion);
    const panel = getControlledPanel(button);

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('hidden');
    expect(panel).toContainElement(screen.getByText(/cuadro jamás tocó el asfalto/i));

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('hidden');
  });

  it('only allows one answer to be open at a time (exclusive toggle)', () => {
    render(<FAQ />);
    const firstButton = getQuestionButton(firstQuestion);
    const secondButton = getQuestionButton(secondQuestion);

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(secondButton);
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');

    expect(getControlledPanel(secondButton)).toContainElement(screen.getByText(/cambio de disciplina/i));
  });

  it('keeps FAQ toggles keyboard-focusable with visible-focus utilities', () => {
    render(<FAQ />);
    const firstButton = getQuestionButton(firstQuestion);

    firstButton.focus();

    expect(document.activeElement).toBe(firstButton);
    expect(firstButton.className).toContain('focus-visible:outline-2');
    expect(firstButton.className).toContain('focus-visible:outline-offset-2');
  });
});
