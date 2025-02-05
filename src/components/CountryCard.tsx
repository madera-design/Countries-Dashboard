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
  const secondaryTextColor = theme.palette.mode === 'dark' ? '#b0b0b0' : '#757575';

  return (
    <Card
      onClick={() => navigate(`/country/${country.name.common}`)}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out',
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
          sx={{ color: textColor, fontWeight: 'bold' }}
        >
          {country.name.common}
        </Typography>
        <List>
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
          <ListItem>
            <ListItemIcon sx={{ color: textColor }}> 
              <FaGlobe size={20}/>
            </ListItemIcon>
            <ListItemText
              primary="Region"
              secondary={country.region} 
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
            </>
          )}
        </List>
      </CardContent>
    </Card>
  );
};