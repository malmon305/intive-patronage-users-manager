import React from 'react';
import { Link } from 'react-router-dom';

function UsersListView() {
  const x = 1;
  return (
    <>
      <p>UserEditView {x} component</p>
      <p>
        <Link to="/edit">Edit</Link>
      </p>
    </>
  );
}

export default UsersListView;
