import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'muiTheme/customTheme';
import AppRoutes from 'routing/appRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
