// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import { ThemeDirection, ThemeMode } from 'config';
import useAuth from 'hooks/useAuth';
//asset
import WelcomeImage from 'assets/images/banner/welcome-banner.png';
import WelcomeImageArrow from 'assets/images/banner/welcome-arrow.png';

// ==============================|| ANALYTICS - WELCOME ||============================== //

export default function WelcomeBanner({props}) {
  const theme = useTheme();
console.log({props});

  return (
    <MainCard
      border={false}
      sx={{
        background: `linear-gradient(250.38deg, ${theme.palette.primary.lighter} 2.39%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`,
        ...(theme.direction === ThemeDirection.RTL && {
          background: `linear-gradient(60.38deg, ${theme.palette.primary.lighter} 114%, ${theme.palette.primary.light} 34.42%, ${theme.palette.primary.main} 60.95%, ${theme.palette.primary.dark} 84.83%, ${theme.palette.primary.darker} 104.37%)`
        })
      }}
    >
      <Grid container>
        <Grid item md={6} sm={6} xs={12}>
          <Stack spacing={2} sx={{ padding: 3.4 }}>
            <Typography variant="h2" color="background.paper">
            Welcome {props}
            </Typography>
            {/* <Typography variant="h6" color="background.paper">
              The purpose of a product update is to add new features, fix bugs or improve the performance of the product.
            </Typography> */}
            {/* <Box>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  color: 'background.paper',
                  borderColor: 'background.paper',
                  '&:hover': {
                    color: 'background.paper',
                    borderColor: 'background.paper',
                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'primary.darker' : 'primary.main'
                  }
                }}
              >
                View full statistic
              </Button>
            </Box> */}
          </Stack>
        </Grid>
        <Grid item sm={6} xs={12} sx={{ display: { xs: 'none', sm: 'initial' } }}>
          <Stack sx={{ position: 'relative', pr: { sm: 3, md: 8 } }} justifyContent="center" alignItems="flex-end">
            <img src={WelcomeImage} alt="Welcome" />
            <Box sx={{ position: 'absolute', bottom: 0, right: '10%' }}>
              <img src={WelcomeImageArrow} alt="Welcome Arrow" />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
