import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  Layout: {
    headerHeight: 84,
    navWidth: 400
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
          text_secondary: '#65676b',
          bg_secondary: '#f7f8fa'
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
          text_primary: '#3F7000',
          bg_primary: '#E0EDCD',
          text_secondary: '#000000',
          bg_secondary: '#ffffff'
        }
      }
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
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
          color: theme.palette.text.main,
          fontWeight: 400
        },
        a: {
          textDecoration: 'none',
          color: 'inherit'
        }
      })
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 500
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 'bold'
    }
  }
})

export default theme
