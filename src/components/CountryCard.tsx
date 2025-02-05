import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Country } from '../types/country';
import { FaCity,FaGlobe,FaUsers } from 'react-icons/fa6';

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
      <Typography gutterBottom variant="h6" component="div" noWrap sx={{ color: '#002680', fontWeight: 'bold' }}>
          {country.name.common}
        </Typography>
      <List>
        <ListItem>
          <ListItemIcon sx={{ color: '#002680' }}>
            <FaUsers />
          </ListItemIcon>
          <ListItemText 
            primary="Population"
            secondary={country.population.toLocaleString()}
            secondaryTypographyProps={{ color: '#757575' }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon sx={{ color: '#002680' }}>
            <FaGlobe />
          </ListItemIcon>
          <ListItemText 
            primary="Region"
            secondary={country.population.toLocaleString()}
            secondaryTypographyProps={{ color: '#757575' }}
          />
        </ListItem>
        <Divider />
        {country.capital && (
          <>
            <ListItem>
              <ListItemIcon sx={{ color: '#002680' }}>
                <FaCity />
              </ListItemIcon>
              <ListItemText 
                primary="Capital"
                secondary={country.capital.join(', ')}
                secondaryTypographyProps={{ color: '#757575' }}
              />
            </ListItem>
          </>
        )}
        </List>
      </CardContent>
    </Card>
  );
};