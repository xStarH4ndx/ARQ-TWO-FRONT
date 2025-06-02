import { useState } from "react"
import { IconButton, InputAdornment, TextField, Button, Typography, Box, Link } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted")
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }} noValidate>
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Escribe tus credenciales para acceder a tu cuenta
      </Typography>

      <TextField
        margin="dense"
        required
        fullWidth
        id="login-email"
        label="Email"
        name="email"
        type="email"
        variant="filled"
      />

      <TextField
        margin="dense"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="login-password"
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="filled"
      />

      <Box display="flex" justifyContent="center" mb={2}>
        <Link href="/forgot-password" underline="hover" color="primary">
          Recuperar Contraseña
        </Link>
      </Box>

      <Button type="submit" fullWidth variant="contained" color="info">
        Iniciar Sesión
      </Button>
    </Box>
  )
}
