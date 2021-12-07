import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { User } from 'services/models/User';
import { Cell, Order } from 'components/EnhancedTableHeadCell';
import { EnhancedTableHead } from 'components/EnhancedTableHead';
import EnhancedTableToolbar from 'components/EnhancedTableToolbar';

const rows = [
  new User({
    id: '6193ce0799647b845f24e587',
    name: 'Kaufman',
    lastName: 'Britt',
    email: 'wahprocuradeumbbn@nonise.com',
    age: 30,
    gender: 'male',
    phoneNumber: '+1 (922) 480-3988',
    address: '370 Rose Street, Neibert, Oregon, 6286',
    dateOfBirth: '1994-05-21',
    hobbies: ['6193ce84e806ff3cbc4521fe', '6193ce846eed7ffbaa5a26b2', '6193ce84e3ef251bb52871b6']
  }),
  new User({
    id: '6193ce074efc3e500843eb80',
    name: 'Cecelia',
    lastName: 'Ortega',
    email: 'qakram.mousta@outlook.sbs',
    age: 21,
    gender: 'female',
    phoneNumber: '+1 (941) 535-2271',
    address: '472 Schweikerts Walk, Clara, Maine, 9933',
    dateOfBirth: '1990-04-04',
    hobbies: ['6193ce843cd350c9a18b5b32']
  }),
  new User({
    id: '6193ce07272dbb6ca898def0',
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
  }),
  new User({
    id: '6193ce07b8fba748ef8131cb',
    name: 'Adkins',
    lastName: 'Moody',
    email: 'xsalemabdul@nroeor.com',
    age: 32,
    gender: 'male',
    phoneNumber: '+1 (972) 508-2167',
    address: '883 Adelphi Street, Graball, Michigan, 4021',
    dateOfBirth: '1988-08-03',
    hobbies: ['6193ce840b1d30d78d2e1413', '6193ce8404766c242ca1f3c4']
  }),
  new User({
    id: '6193ce0727ef5f8ba1e24781',
    name: 'Frieda',
    lastName: 'Morris',
    email: 'csherry.ahm@hdtniudn.com',
    age: 39,
    gender: 'female',
    phoneNumber: '+1 (872) 585-3698',
    address: '759 Alton Place, Wakulla, New Jersey, 2365',
    dateOfBirth: '1990-10-31',
    hobbies: ['6193ce8497316f30f74b3417', '6193ce84afce6bc5d4a85896']
  })
];

const userCells: readonly Cell<User>[] = [
  {
    id: 'name',
    sortable: true,
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'email',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'age',
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: 'Age'
  },
  {
    id: 'gender',
    sortable: false,
    numeric: false,
    disablePadding: true,
    label: 'Gender'
  },
  {
    id: 'phoneNumber',
    sortable: false,
    numeric: false,
    disablePadding: false,
    label: 'Phone number'
  },
  {
    id: 'address',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Address'
  },
  {
    id: 'dateOfBirth',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Date of birth'
  },
  {
    id: 'hobbies',

    sortable: false,
    numeric: false,
    disablePadding: false,
    label: 'Hobbies'
  }
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function UsersListView() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof User>('id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%', mt: 5 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead<User>
              cells={userCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice()
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell align="left">{row.gender}</TableCell>
                      <TableCell align="left">{row.phoneNumber}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.dateOfBirth}</TableCell>
                      <TableCell align="left">{row.hobbies.join(', ')}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default UsersListView;
