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
  Container,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import { useCountriesStore } from '../store/useCountriesStore';
import { FaArrowLeft, FaCity, FaClock, FaGlobe, FaLanguage, FaUsers } from "react-icons/fa6";
import MapCountry from '../components/MapCountry';
import { FaMoneyBillAlt } from 'react-icons/fa';

export const CountryDetail: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();
  const { countries, loading } = useCountriesStore();
  const theme = useTheme();

  const country = countries.find(c => c.name.common === countryName);

  const textColor = theme.palette.mode === 'dark' ? '#ffffff' : '#002680';
  const secondaryTextColor = theme.palette.mode === 'dark' ? '#b0b0b0' : '#757575';

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
          startIcon={<FaArrowLeft />}
          onClick={() => navigate('/')}
          sx={{ mt: 5 }}
        >
          Back to list
        </Button>
        <Typography variant="h1" color="error">Country not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box>
        <Button
          startIcon={<FaArrowLeft />}
          onClick={() => navigate('/')}
          sx={{ mb: 5 }}
        >
          Back to list
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Typography variant="h4" sx={{ color: textColor, fontWeight: 'bold' }}> 
            {country.name.official}
          </Typography>
          <Card
            sx={{
              width: 'auto', 
              height: '100px', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              image={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              sx={{
                width: 'auto', 
                height: '100%', 
                objectFit: 'contain',
              }}
            />
          </Card>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: textColor }}> 
                  <FaGlobe size={20}/>
                </ListItemIcon>
                <ListItemText
                  primary="Common Name"
                  secondary={country.name.common}
                  secondaryTypographyProps={{ color: secondaryTextColor }} 
                />
              </ListItem>
              <Divider />

              {country.capital && (
                <>
                  <ListItem>
                    <ListItemIcon sx={{ color: textColor }}> 
                      <FaCity size={20}/>
                    </ListItemIcon>
                    <ListItemText
                      primary="Capital"
                      secondary={country.capital.join(', ')}
                      secondaryTypographyProps={{ color: secondaryTextColor }} 
                    />
                  </ListItem>
                  <Divider />
                </>
              )}

              <ListItem>
                <ListItemIcon sx={{ color: textColor }}> 
                  <FaUsers size={20}/>
                </ListItemIcon>
                <ListItemText
                  primary="Population"
                  secondary={country.population.toLocaleString()}
                  secondaryTypographyProps={{ color: secondaryTextColor }} 
                />
              </ListItem>
              <Divider />

              {country.languages && (
                <>
                  <ListItem>
                    <ListItemIcon sx={{ color: textColor }}> 
                      <FaLanguage size={20}/>
                    </ListItemIcon>
                    <ListItemText
                      primary="Languages"
                      secondary={Object.values(country.languages).join(', ')}
                      secondaryTypographyProps={{ color: secondaryTextColor }} 
                    />
                  </ListItem>
                  <Divider />
                </>
              )}

              {country.currencies && (
                <>
                  <ListItem>
                    <ListItemIcon sx={{ color: textColor }}> 
                      <FaMoneyBillAlt size={20}/>
                    </ListItemIcon>
                    <ListItemText
                      primary="Currencies"
                      secondary={Object.values(country.currencies)
                        .map(currency => `${currency.name} (${currency.symbol})`)
                        .join(', ')}
                      secondaryTypographyProps={{ color: secondaryTextColor }} 
                    />
                  </ListItem>
                  <Divider />
                </>
              )}

              <ListItem>
                <ListItemIcon sx={{ color: textColor }}> 
                  <FaClock size={20}/>
                </ListItemIcon>
                <ListItemText
                  primary="Timezones"
                  secondary={country.timezones.join(', ')}
                  secondaryTypographyProps={{ color: secondaryTextColor }} 
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <Box
                  sx={{
                    width: '100%',
                    borderRadius: '16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    overflow: 'hidden',
                    mt: 2,
                  }}
                >
                  <Typography variant="h5" component="div" sx={{ p: 2, color: textColor, fontWeight: 'bold', display: 'flex'}}>
                    Geographical area 
                  </Typography>
                  {country.latlng && (
                    <MapCountry latlng={[parseFloat(country.latlng[0]), parseFloat(country.latlng[1])]} />
                  )}
                </Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};