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
import useLoading from 'hooks/useLoading';
import UsersService from 'services/UsersService';
import UsersListSkeleton from 'components/skeletons/UsersListSkeleton';

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
  const userService = UsersService.getInstance();

  const [data, isLoading] = useLoading<User[]>(new Array<User>(), () => userService.getUsers());

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
      const newSelecteds = data.map((n) => n.id);
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

  return isLoading ? (
    <UsersListSkeleton />
  ) : (
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
              rowCount={data.length}
            />
            <TableBody>
              {data
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
