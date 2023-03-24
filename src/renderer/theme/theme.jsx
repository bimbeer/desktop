import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
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
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'yellow.500',
      },
      variants: {
        outline: {
          field: {
            borderColor: 'gray',
          },
        },
      },
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'yellow.500',
      },
    },
    NumberInput: {
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
});
export default theme;
