import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'yellow.500',
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'yellow.500',
      },
    },
    Radio: {
      defaultProps: {
        colorScheme: 'yellow',
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        color: 'white',
      },
    },
  },
  palette: {
    primary: '#141517',
    secondary: '#1c1e1f',
    accent: '#d4af37',
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});
export default theme;
