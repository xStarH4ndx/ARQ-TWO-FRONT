import { useState } from "react"
import { IconButton, InputAdornment, TextField, Button, Typography, Box } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration submitted")
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }} noValidate>
      <Typography variant="h5" gutterBottom>
        Crear Cuenta
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Rellena todos los campos para crear tu cuenta
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="register-name"
        label="Nombre Completo"
        name="name"
        type="text"
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="register-email"
        label="Email"
        name="email"
        type="email"
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="register-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        id="confirm-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" fullWidth variant="contained" color="info" sx={{ mt: 2 }}>
        Create Account
      </Button>
    </Box>
  )
}
