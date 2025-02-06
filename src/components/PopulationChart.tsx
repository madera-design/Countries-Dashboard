import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '@mui/material/styles';

ChartJS.register(ArcElement, Tooltip, Legend);

const PopulationChart = () => {
  const theme = useTheme();

  const data = {
    labels: ['Asia', 'Africa', 'Europe', 'Latin America and the Caribbean', 'North America', 'Oceania'],
    datasets: [
      {
        label: 'Distribution of world population by continent in 2024',
        data: [57.05, 17.67, 8.93, 7.9, 7.9, 0.55],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.palette.mode === 'dark' ? '#fff' : '#000', 
        },
      },
      title: {
        display: true,
        text: 'Distribution of world population by continent in 2024',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PopulationChart;