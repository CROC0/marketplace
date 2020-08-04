import React from 'react';

import Routes from './routes';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { useStoreState } from './store/hooks';

const App: React.FC = () => {
  const theme = useStoreState((state) => state.palette.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
