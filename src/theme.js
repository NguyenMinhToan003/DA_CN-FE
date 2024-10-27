import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  Layout: {
    headerHeight: 64,
    navWidth: 350
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#3366ff',
          more: '#e3f2fd'
        },
        secondary: {
          main: '#ffffff',
          more: '#3366ff'
        },
        text: {
          main: '#3a414e',
          default: '#ffffff'
        },
        background: {
          default: '#eff1f7'
        },
        messages: {
          text_primary: '#3F7000',
          bg_primary: '#E0EDCD',
          text_secondary: '#282523',
          bg_secondary: '#fce2ca'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#373e4a',
          more: '#3366ff'
        },
        secondary: {
          main: '#232b38',
          more: '#d5e6fd'
        },
        text: {
          main: '#a8adb5',
          default: '#ffffff'
        },
        background: {
          default: '#181e2b'
        },
        messages: {
          text_primary: '#1d2439',
          bg_primary: '#e7d4c5',
          text_secondary: '#101524',
          bg_secondary: '#E0EDCD'
        }
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: theme => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: text => text.palette.text.main,
          fontWeight: 200,
          fontSize: '1rem',
          fontFamily: 'Poppins , sans-serif'
        },
        a: {
          textDecoration: 'none',
          color: 'inherit'
        }
      })
    }
  }
})

export default theme
