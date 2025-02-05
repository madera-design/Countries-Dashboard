import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CountryCard } from '../components/CountryCard';
import { BrowserRouter } from 'react-router-dom';

const mockCountry = {
  name: {
    common: 'Test Country',
    official: 'Official Test Country',
  },
  flags: {
    png: 'test-flag.png',
    svg: 'test-flag.svg',
    alt: 'Flag of Test Country',
  },
  capital: ['Test Capital'],
  population: 1000000,
  region: 'Test Region',
  languages: { test: 'Test Language' },
  currencies: {
    TEST: {
      name: 'Test Currency',
      symbol: 'T',
    },
  },
  timezones: ['UTC+00:00'],
  latlng: ['10', '20'], // Tupla de dos elementos
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    // Verificar que el nombre del país y la bandera estén presentes
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByAltText('Flag of Test Country')).toBeInTheDocument();
  });
});