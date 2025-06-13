import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/UserStore';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    useUserStore.getState().logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'left' }}
          >
            Bienvenido, Usuario
          </Typography>
          <Button
            color="inherit"
            variant="text"
            sx={{ marginRight: 1.2 }}
            onClick={() => navigate('/perfil')}
          >
            Mi Perfil
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
