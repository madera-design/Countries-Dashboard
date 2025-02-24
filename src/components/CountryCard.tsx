import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Country } from '../types/country';
import { FaCity, FaGlobe, FaUsers } from 'react-icons/fa6';

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const textColor = theme.palette.mode === 'dark' ? '#ffffff' : '#002680';

  return (
    <Card
      onClick={() => navigate(`/country/${country.name.common}`)}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        position: 'relative', 
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out',
          '& .details-overlay': {
            opacity: 1, 
            visibility: 'visible',
          },
        },
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
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          sx={{ color: textColor, fontWeight: 'bold', position: 'relative', zIndex: 1 }}
        >
          {country.name.common}
        </Typography>
      </CardContent>
      <Box
        className="details-overlay" 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          opacity: 0,
          visibility: 'hidden', 
          transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <List sx={{ color: '#fff', width: '80%' }}>
          <ListItem>
            <ListItemIcon sx={{ color: '#fff' }}>
              <FaUsers size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Population"
              secondary={country.population.toLocaleString()}
              secondaryTypographyProps={{ color: '#fff' }}
            />
          </ListItem>
          <Divider sx={{ backgroundColor: '#fff' }} />
          <ListItem>
            <ListItemIcon sx={{ color: '#fff' }}>
              <FaGlobe size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Region"
              secondary={country.region}
              secondaryTypographyProps={{ color: '#fff' }}
            />
          </ListItem>
          <Divider sx={{ backgroundColor: '#fff' }} />
          {country.capital && (
            <>
              <ListItem>
                <ListItemIcon sx={{ color: '#fff' }}>
                  <FaCity size={20} />
                </ListItemIcon>
                <ListItemText
                  primary="Capital"
                  secondary={country.capital.join(', ')}
                  secondaryTypographyProps={{ color: '#fff' }}
                />
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Card>
  );
};