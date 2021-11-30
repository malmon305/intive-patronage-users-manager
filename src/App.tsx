import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import UserEditView from 'views/UserEditView';
import UsersListView from 'views/UsersListView';

import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<UsersListView />} />
          <Route path="/edit" element={<UserEditView />} />
        </Routes>
      </Suspense>
    </Router>
    </div>
  );
}

export default App;
