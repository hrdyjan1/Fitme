import { createMuiTheme } from '@material-ui/core/styles';
import { palette } from 'src/constants/palette';

const theme = createMuiTheme({
  layout: {
    contentWidth: 1140,
  },
  palette,
  typography: {
    fontFamily: [
      'Zilla Slab',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export { theme };
