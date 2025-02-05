import { create } from 'zustand';
import axios from 'axios';
import { Country } from '../types/country';

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedRegion: string;
  sortOrder: 'asc' | 'desc' | null;
  currentPage: number;
  itemsPerPage: number;
  fetchCountries: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedRegion: (region: string) => void;
  setSortOrder: (order: 'asc' | 'desc' | null) => void;
  setCurrentPage: (page: number) => void;
  getPaginatedCountries: () => Country[];
  getTotalPages: () => number;
  filterCountries: () => void;
}

export const useCountriesStore = create<CountriesState>((set, get) => ({
  countries: [],
  filteredCountries: [],
  loading: false,
  error: null,
  searchTerm: '',
  selectedRegion: '',
  sortOrder: null,
  currentPage: 0,
  itemsPerPage: 15,
  filterCountries: () => {
    const { countries, searchTerm, selectedRegion, sortOrder } = get();
    
    let filtered = [...countries];

    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(country =>
        country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.population - b.population;
        }
        return b.population - a.population;
      });
    }

    set({ filteredCountries: filtered });
  },

  fetchCountries: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      set({ countries: response.data });
      get().filterCountries();
    } catch (error) {
      set({ error: 'Failed to fetch countries' });
    } finally {
      set({ loading: false });
    }
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term, currentPage: 0 });
    get().filterCountries();
  },

  setSelectedRegion: (region: string) => {
    set({ selectedRegion: region, currentPage: 0 });
    get().filterCountries();
  },

  setSortOrder: (order: 'asc' | 'desc' | null) => {
    set({ sortOrder: order, currentPage: 0 });
    get().filterCountries();
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  getPaginatedCountries: () => {
    const { filteredCountries, currentPage, itemsPerPage } = get();
    const start = currentPage * itemsPerPage;
    return filteredCountries.slice(start, start + itemsPerPage);
  },

  getTotalPages: () => {
    const { filteredCountries, itemsPerPage } = get();
    return Math.ceil(filteredCountries.length / itemsPerPage);
  },
}));