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
  useTheme, // Importar useTheme
} from '@mui/material';
import { useCountriesStore } from '../store/useCountriesStore';
import { FaArrowLeft, FaCity, FaClock, FaGlobe, FaLanguage, FaUsers } from "react-icons/fa6";
import MapCountry from '../components/MapCountry';
import { FaMoneyBillAlt } from 'react-icons/fa';

export const CountryDetail: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();
  const { countries, loading } = useCountriesStore();
  const theme = useTheme(); // Obtener el tema actual

  const country = countries.find(c => c.name.common === countryName);

  // Determinar el color del texto basado en el modo (oscuro/claro)
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

        {/* Título y bandera alineados horizontalmente */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Typography variant="h4" sx={{ color: textColor, fontWeight: 'bold' }}> {/* Color dinámico */}
            {country.name.official}
          </Typography>
          <Card
            sx={{
              width: 'auto', // Ancho automático según el contenido
              height: '80px', // Altura proporcional al texto
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
                width: 'auto', // Ancho automático
                height: '100%', // Altura completa del contenedor
                objectFit: 'contain',
              }}
            />
          </Card>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: textColor }}> {/* Color dinámico */}
                  <FaGlobe />
                </ListItemIcon>
                <ListItemText
                  primary="Common Name"
                  secondary={country.name.common}
                  secondaryTypographyProps={{ color: secondaryTextColor }} // Color dinámico
                />
              </ListItem>
              <Divider />

              {country.capital && (
                <>
                  <ListItem>
                    <ListItemIcon sx={{ color: textColor }}> {/* Color dinámico */}
                      <FaCity />
                    </ListItemIcon>
                    <ListItemText
                      primary="Capital"
                      secondary={country.capital.join(', ')}
                      secondaryTypographyProps={{ color: secondaryTextColor }} // Color dinámico
                    />
                  </ListItem>
                  <Divider />
                </>
              )}

              <ListItem>
                <ListItemIcon sx={{ color: textColor }}> {/* Color dinámico */}
                  <FaUsers />
                </ListItemIcon>
                <ListItemText
                  primary="Population"
                  secondary={country.population.toLocaleString()}
                  secondaryTypographyProps={{ color: secondaryTextColor }} // Color dinámico
                />
              </ListItem>
              <Divider />

              {country.languages && (
                <>
                  <ListItem>
                    <ListItemIcon sx={{ color: textColor }}> {/* Color dinámico */}
                      <FaLanguage />
                    </ListItemIcon>
                    <ListItemText
                      primary="Languages"
                      secondary={Object.values(country.languages).join(', ')}
                      secondaryTypographyProps={{ color: secondaryTextColor }} // Color dinámico
                    />
                  </ListItem>
                  <Divider />
                </>
              )}

              {country.currencies && (
                <>
                  <ListItem>
                    <ListItemIcon sx={{ color: textColor }}> {/* Color dinámico */}
                      <FaMoneyBillAlt />
                    </ListItemIcon>
                    <ListItemText
                      primary="Currencies"
                      secondary={Object.values(country.currencies)
                        .map(currency => `${currency.name} (${currency.symbol})`)
                        .join(', ')}
                      secondaryTypographyProps={{ color: secondaryTextColor }} // Color dinámico
                    />
                  </ListItem>
                  <Divider />
                </>
              )}

              <ListItem>
                <ListItemIcon sx={{ color: textColor }}> {/* Color dinámico */}
                  <FaClock />
                </ListItemIcon>
                <ListItemText
                  primary="Timezones"
                  secondary={country.timezones.join(', ')}
                  secondaryTypographyProps={{ color: secondaryTextColor }} // Color dinámico
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
                  <Typography variant="h5" sx={{ p: 2, color: textColor, fontWeight: 'bold' }}> {/* Color dinámico */}
                    Geographical area
                  </Typography>
                  <MapCountry latlng={country.latlng} />
                </Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};