import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Country } from '../types/country';

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const navigate = useNavigate();

  return (
    <Card 
      onClick={() => navigate(`/country/${country.name.common}`)}
      sx={{ 
        cursor: 'pointer', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
        <CardMedia
          component="img"
          image={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {country.name.common}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Población: {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Región: {country.region}
          </Typography>
          {country.capital && (
            <Typography variant="body2" color="text.secondary">
              Capital: {country.capital[0]}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};