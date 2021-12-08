import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TableContainer, TableBody, TableCell, TableRow, Skeleton, Box, Paper, Table } from '@mui/material';
// import EnhancedTableToolbar from 'components/EnhancedTableToolbar';

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
    <Box sx={{ width: '100%', mt: 5 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={0} /> */}
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
