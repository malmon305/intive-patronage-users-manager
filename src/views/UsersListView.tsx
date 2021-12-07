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
import HobbiesService from 'services/HobbiesService';
import Hobby from 'services/models/Hobby';
import { Chip, IconButton, Skeleton, Tooltip } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const userCells: readonly Cell<User>[] = [
  {
    id: 'name',
    sortable: true,
    numeric: false,
    disablePadding: true,
    label: 'Name',
    width: '10%'
  },
  {
    id: 'email',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Email',
    width: '1%'
  },
  {
    id: 'age',
    sortable: true,
    numeric: true,
    disablePadding: false,
    label: 'Age',
    width: '1%'
  },
  {
    id: 'gender',
    sortable: false,
    numeric: false,
    disablePadding: false,
    label: 'Gender',
    width: '5%'
  },
  {
    id: 'phoneNumber',
    sortable: false,
    numeric: false,
    disablePadding: false,
    label: 'Phone number',
    width: '10%'
  },
  {
    id: 'address',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Address',
    width: '23%'
  },
  {
    id: 'dateOfBirth',
    sortable: true,
    numeric: false,
    disablePadding: false,
    label: 'Date of birth',
    width: '10%'
  },
  {
    id: 'hobbies',
    sortable: false,
    numeric: false,
    disablePadding: false,
    label: 'Hobbies',
    width: '20%'
  },
  {
    id: 'action',
    sortable: false,
    numeric: true,
    disablePadding: false,
    label: 'Actions',
    width: '10%'
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
  const usersService = UsersService.getInstance();
  const hobbiesService = HobbiesService.getInstance();

  const [users, isLoadingUsers] = useLoading<User[]>(new Array<User>(), () => usersService.getUsers());
  const [hobbies, isLoadingHobbies] = useLoading<Hobby[]>(new Array<Hobby>(), () => hobbiesService.getHobbies());

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
      const newSelecteds = users.map((n) => n.id);
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

  return isLoadingUsers ? (
    <UsersListSkeleton />
  ) : (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: 760 }}>
          <Table stickyHeader aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead<User>
              cells={userCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={(event, property) => handleRequestSort(event, property as keyof User)}
              rowCount={users.length}
            />
            <TableBody>
              {users
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
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.dateOfBirth}</TableCell>
                      <TableCell>
                        {isLoadingHobbies ? (
                          <Skeleton animation="wave" height={100} />
                        ) : (
                          row.hobbies.map((hobby) => (
                            <Chip
                              sx={{ margin: 0.2 }}
                              color="success"
                              variant="outlined"
                              size="small"
                              label={hobbies.find((h) => h.id === hobby)?.name}
                            />
                          ))
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit User">
                          <IconButton aria-label="edit">
                            <EditIcon sx={{ color: blue[600] }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User">
                          <IconButton aria-label="delete">
                            <DeleteIcon sx={{ color: red[600] }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
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
