import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from 'components/Header';
import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import UserEditView from 'views/UserEditView';
import UsersListView from 'views/UsersListView';

const darkTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Header />
          <Container>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<UsersListView />} />
                <Route path="/edit" element={<UserEditView />} />
              </Routes>
            </Suspense>
          </Container>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
