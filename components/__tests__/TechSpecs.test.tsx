import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TechSpecs from '../TechSpecs';
import { siteConfig } from '@/src/config/site';

describe('TechSpecs Component', () => {
  it('renders the section title', () => {
    render(<TechSpecs />);
    expect(screen.getByText('Ficha Técnica')).toBeInTheDocument();
  });

  it('renders all centralized visible specifications', () => {
    render(<TechSpecs />);

    const specs = siteConfig.sale.specs;

    expect(screen.getByText('Cuadro')).toBeInTheDocument();
    expect(screen.getByText(specs.frame)).toBeInTheDocument();

    expect(screen.getByText('Frenos')).toBeInTheDocument();
    expect(screen.getByText(specs.brakes)).toBeInTheDocument();

    expect(screen.getByText('Ruedas')).toBeInTheDocument();
    expect(screen.getByText(specs.wheels)).toBeInTheDocument();

    expect(screen.getByText('Transmisión')).toBeInTheDocument();
    expect(screen.getByText(specs.drivetrain)).toBeInTheDocument();

    expect(screen.getByText('Estado')).toBeInTheDocument();
    expect(screen.getByText(specs.condition)).toBeInTheDocument();

    expect(screen.getByText('Uso')).toBeInTheDocument();
    expect(screen.getByText(specs.usage)).toBeInTheDocument();
  });

  it('renders centralized condition and usage facts', () => {
    render(<TechSpecs />);

    expect(screen.getByText(siteConfig.sale.specs.condition)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.sale.specs.usage)).toBeInTheDocument();
  });

  it('renders values from sale.specs even if sale.techSpecs drift', () => {
    const techSpecsMutable = siteConfig.sale.techSpecs as unknown as Array<{ label: string; value: string }>;
    const originalTechSpecs = [...techSpecsMutable];

    techSpecsMutable.splice(0, techSpecsMutable.length, {
      label: 'Cuadro',
      value: 'Valor desalineado',
    });

    render(<TechSpecs />);

    expect(screen.getByText(siteConfig.sale.specs.frame)).toBeInTheDocument();
    expect(screen.queryByText('Valor desalineado')).not.toBeInTheDocument();

    techSpecsMutable.splice(0, techSpecsMutable.length, ...originalTechSpecs);
  });
});
