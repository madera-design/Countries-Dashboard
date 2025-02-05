import React, { useState } from 'react';
import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Pagination,
  Stack,
  Button
} from '@mui/material';
import { FaPersonArrowUpFromLine, FaPersonArrowDownToLine } from "react-icons/fa6";
import { useCountriesStore } from '../store/useCountriesStore';
import { CountryCard } from '../components/CountryCard';
import ChartModal from '../components/ChartModal';

export const CountriesList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { 
    loading, 
    error, 
    searchTerm, 
    selectedRegion,
    sortOrder,
    currentPage,
    setSearchTerm, 
    setSelectedRegion,
    setSortOrder,
    setCurrentPage,
    fetchCountries,
    getPaginatedCountries,
    getTotalPages
  } = useCountriesStore();

  React.useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page - 1); // Convert from 1-based to 0-based indexing
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const paginatedCountries = getPaginatedCountries();
  const totalPages = getTotalPages();

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Buscar país"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200, flex: 1 }}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Region</InputLabel>
          <Select
            value={selectedRegion}
            label="Region"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="Africa">África</MenuItem>
            <MenuItem value="Americas">América</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europa</MenuItem>
            <MenuItem value="Oceania">Oceanía</MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={sortOrder}
          exclusive
          onChange={(_, value) => setSortOrder(value)}
          aria-label="population sort"
        >
          <ToggleButton value="asc" aria-label="sort ascending">
            <FaPersonArrowUpFromLine  size={20} />
            <Typography sx={{ ml: 1 }}>Mayor población</Typography>
          </ToggleButton>
          <ToggleButton value="desc" aria-label="sort descending">
            <FaPersonArrowDownToLine size={20} />
            <Typography sx={{ ml: 1 }}>Menor población</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Ver Gráfico de Población
        </Button>
      </Box>
      <Grid container spacing={3}>
        {paginatedCountries.map((country) => (
          <Grid item key={country.name.common} xs={12} sm={6} md={4} lg={3}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={currentPage + 1} 
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Stack>
      )}
      <ChartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};