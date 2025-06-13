import React from "react";
import { Button, Divider, Paper, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";


const SideBar: React.FC = () => {
    const theme = useTheme()
    const navigate = useNavigate();
    return (
        <Paper sx={{
            display: { xs: 'none', md: 'block', borderRadius: 0 },
            p: 2,
            backgroundColor: theme.palette.background.paper,
            textAlign: 'center',
          }}>
            PANEL DE CONTROL
            <Divider sx={{mt:1}}/>
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/home')}>
                Mis Casas
            </Button>
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/inventario')}>
                Inventario
            </Button>
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/gastos')}>
                Gastos
            </Button>
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth onClick={() => navigate('/recetas')}>
                Recetas
            </Button>
        </Paper>
    )
}

export default SideBar;