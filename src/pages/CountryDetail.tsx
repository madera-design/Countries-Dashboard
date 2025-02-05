import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardMedia, 
  Typography, 
  Grid, 
  Button, 
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useCountriesStore } from '../store/useCountriesStore';

export const CountryDetail: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();
  const { countries, loading } = useCountriesStore();
  
  const country = countries.find(c => c.name.common === countryName);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!country) {
    return (
      <Box>
        <Typography variant="h5" color="error">País no encontrado</Typography>
        <Button 
          startIcon={<ArrowLeft />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Regresar
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button 
        startIcon={<ArrowLeft />}
        onClick={() => navigate('/')}
        sx={{ mb: 4 }}
      >
        Regresar
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CardMedia
              component="img"
              image={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {country.name.official}
          </Typography>

          <List>
            <ListItem>
              <ListItemText 
                primary="Nombre"
                secondary={country.name.common}
              />
            </ListItem>
            <Divider />

            {country.capital && (
              <>
                <ListItem>
                  <ListItemText 
                    primary="Capital"
                    secondary={country.capital.join(', ')}
                  />
                </ListItem>
                <Divider />
              </>
            )}

            <ListItem>
              <ListItemText 
                primary="Población"
                secondary={country.population.toLocaleString()}
              />
            </ListItem>
            <Divider />

            {country.languages && (
              <>
                <ListItem>
                  <ListItemText 
                    primary="Idiomas"
                    secondary={Object.values(country.languages).join(', ')}
                  />
                </ListItem>
                <Divider />
              </>
            )}

            {country.currencies && (
              <>
                <ListItem>
                  <ListItemText 
                    primary="Monedas"
                    secondary={Object.values(country.currencies)
                      .map(currency => `${currency.name} (${currency.symbol})`)
                      .join(', ')}
                  />
                </ListItem>
                <Divider />
              </>
            )}

            <ListItem>
              <ListItemText 
                primary="Zonas horarias"
                secondary={country.timezones.join(', ')}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
</Box>

  );
}