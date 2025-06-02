// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@mui/material/styles'
import darkTheme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource-variable/roboto'
import { ApolloProvider } from '@apollo/client'
import { client } from './api/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* Esto aplica el fondo y estilos base del tema */}
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
)
