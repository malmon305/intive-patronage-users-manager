import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Toolbar,
  Typography,
  IconButton,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
  Box,
  Paper,
  Table,
  Tooltip
} from '@mui/material';

interface TableCellSkeletonProps {
  width?: number;
}

function TableCellSkeleton(props: TableCellSkeletonProps) {
  const { width } = props;
  return <Skeleton animation="wave" height={48} width={width} />;
}

TableCellSkeleton.defaultProps = {
  width: undefined
};

function UsersListView() {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div" sx={{ flex: '1 1 100%' }}>
            Users
          </Typography>
          <Tooltip title="">
            <IconButton disabled>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableBody>
              {Array.from({ length: 9 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <TableCellSkeleton width={38} />
                  </TableCell>
                  <TableCell component="th" padding="none">
                    <TableCellSkeleton width={50} />
                  </TableCell>
                  <TableCell>
                    <TableCellSkeleton width={200} />
                  </TableCell>
                  <TableCell align="right">
                    <TableCellSkeleton width={40} />
                  </TableCell>
                  <TableCell>
                    <TableCellSkeleton width={60} />
                  </TableCell>
                  <TableCell>
                    <TableCellSkeleton width={150} />
                  </TableCell>
                  <TableCell>
                    <TableCellSkeleton width={150} />
                  </TableCell>
                  <TableCell>
                    <TableCellSkeleton width={150} />
                  </TableCell>
                  <TableCell>
                    <TableCellSkeleton width={300} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton disabled aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton disabled aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default UsersListView;
