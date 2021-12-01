import { Container } from '@mui/material';
import Header from 'components/Header';
import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import UserEditView from 'views/UserEditView';
import UsersListView from 'views/UsersListView';

import './App.css';

function App() {
  return (
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
  );
}

export default App;
