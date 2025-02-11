import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import globalStyles from 'src/config/globalStyles'
import theme from 'src/config/theme'
import { SnackbarProvider } from 'notistack'
import { createTheme, ThemeProvider as MaterialThemeProvider } from '@mui/material/styles'

const GlobalStyle = createGlobalStyle`${globalStyles}`

const themeUITheme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#00c8ff'
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700
    },
    body1: {
      fontSize: '1rem'
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <MaterialThemeProvider theme={themeUITheme}>
            <App />
          </MaterialThemeProvider>
        </SnackbarProvider>
        <GlobalStyle />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
