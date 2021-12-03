// import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import React from 'react';

const users: GridRowsProp = [
  {
    id: '6193ce0799647b845f24e587',
    fullName: 'Kaufman Britt',
    name: 'Kaufman',
    lastName: 'Britt',
    email: 'wahprocuradeumbbn@nonise.com',
    age: 30,
    gender: 'male',
    phoneNumber: '+1 (922) 480-3988',
    address: '370 Rose Street, Neibert, Oregon, 6286',
    dateOfBirth: '1994-05-21',
    hobbies: ['6193ce84e806ff3cbc4521fe', '6193ce846eed7ffbaa5a26b2', '6193ce84e3ef251bb52871b6']
  },
  {
    id: '6193ce074efc3e500843eb80',
    fullName: 'Cecelia Ortega',
    name: 'Cecelia',
    lastName: 'Ortega',
    email: 'qakram.mousta@outlook.sbs',
    age: 21,
    gender: 'female',
    phoneNumber: '+1 (941) 535-2271',
    address: '472 Schweikerts Walk,\n Clara, Maine, 9933',
    dateOfBirth: '1990-04-04',
    hobbies: ['6193ce843cd350c9a18b5b32']
  },
  {
    id: '6193ce07272dbb6ca898def0',
    fullName: 'Cabrera Stokes',
    name: 'Cabrera',
    lastName: 'Stokes',
    email: 'tcherkihaddadar@fiikra.tk',
    age: 21,
    gender: 'male',
    phoneNumber: '+1 (999) 497-2758',
    address: '703 Lexington Avenue, Manitou, North Carolina, 3497',
    dateOfBirth: '1996-05-25',
    hobbies: [
      '6193ce84e806ff3cbc4521fe',
      '6193ce84fddf0ea59cd715cc',
      '6193ce843502e8f81392a69c',
      '6193ce8499ba67b92d63c9be'
    ]
  }
];

function UsersListView() {
  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Full name', width: 120 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'age', headerName: 'Age', width: 60 },
    { field: 'gender', headerName: 'Gender', width: 75 },
    { field: 'phoneNumber', headerName: 'Phone number', width: 120 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'dateOfBirth', headerName: 'Date of birth', width: 60 },
    { field: 'hobbies', headerName: 'Hobbies', width: 60 }
  ];

  return (
    /* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" width="50%">
              Full name
            </TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center" width="100%">
              Phone number
            </TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Date of birth</TableCell>
            <TableCell align="center">Hobbies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" width="50%">{`${user.name} ${user.lastName}`}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.age}</TableCell>
              <TableCell align="center">{user.gender}</TableCell>
              <TableCell align="center" width="100%">
                {user.phoneNumber}
              </TableCell>
              <TableCell align="center">{user.address}</TableCell>
              <TableCell align="center">{user.dateOfBirth}</TableCell>
              <TableCell align="center">{user.hobbies.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */
    <div style={{ height: 400, width: '100%', marginTop: 30 }}>
      <DataGrid columns={columns} rows={users} checkboxSelection pagination />
    </div>
  );
}
export default UsersListView;
