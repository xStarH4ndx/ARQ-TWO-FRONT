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
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth>
                Usuarios
            </Button>
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth>
                Despensa
            </Button>
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth>
                Útiles de Aseo
            </Button>
            <Button variant="text" color="inherit" sx={{ mt: 2 }} fullWidth>
                Finanzas
            </Button>
        </Paper>
    )
}

export default SideBar;