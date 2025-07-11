// import { Tabs, Tab, Box, Paper, Typography } from "@mui/material"
// import { useState } from "react"
// import LoginForm from "../components/auth/loginForm"
// import RegisterForm from "../components/auth/registerForm"

// export default function AuthPage() {
//   const [tab, setTab] = useState(0)

//   return (
//     <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
//       <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
//         <Box textAlign="center">
//             <Typography variant="h4" gutterBottom>
//                 Bienvenido
//             </Typography>
//             <Typography variant="body1">
//                 Inicia Sesión o Regístrate
//             </Typography>
//         </Box>
//         <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
//           <Tab label="Login" />
//           <Tab label="Register" />
//         </Tabs>

//         <Box>
//           {tab === 0 && <LoginForm />}
//           {tab === 1 && <RegisterForm />}
//         </Box>
//       </Paper>
//     </Box>
//   )
// }
