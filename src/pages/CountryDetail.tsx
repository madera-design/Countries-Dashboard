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
  Divider,
  Container
} from '@mui/material';
import { useCountriesStore } from '../store/useCountriesStore';
import { FaArrowLeft } from "react-icons/fa6";

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
        <Button 
          startIcon={<FaArrowLeft/>}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to list
        </Button>
        <Typography variant="h5" color="error">Country not found</Typography>
      </Box>
    );
  }

  return (
    <Container fixed>
      <Box>
        <Button 
          startIcon={<FaArrowLeft/>}
          onClick={() => navigate('/')}
          sx={{ mb: 4 }}
        >
          Back to list
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
                  primary="Common Name"
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
                  primary="Population"
                  secondary={country.population.toLocaleString()}
                />
              </ListItem>
              <Divider />

              {country.languages && (
                <>
                  <ListItem>
                    <ListItemText 
                      primary="Languages"
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
                      primary="Currencies"
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
                  primary="Timezones"
                  secondary={country.timezones.join(', ')}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>

  );
}