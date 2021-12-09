import React from 'react';
import { useParams } from 'react-router-dom';

function UserEditView() {
  const params = useParams();

  return params.id ? <div>Edit mode!</div> : <div>New mode!</div>;
}

export default UserEditView;
