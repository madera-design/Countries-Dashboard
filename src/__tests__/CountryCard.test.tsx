import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Population: 1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Test Region')).toBeInTheDocument();
    expect(screen.getByText('Capital: Test Capital')).toBeInTheDocument();
    expect(screen.getByAltText('Flag of Test Country')).toBeInTheDocument();
  });

  it('navigates when clicked', () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    const card = screen.getByText('Test Country').closest('.MuiCard-root');
    fireEvent.click(card);
    
    // Check if the current location includes the country name
    expect(window.location.pathname).toBe('/country/Test Country');
  });
});