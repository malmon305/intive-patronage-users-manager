import * as React from 'react';
import { Toolbar, alpha, Typography, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { red } from '@mui/material/colors';

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, onDeleteClick } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Users
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon sx={{ color: red[600] }} onClick={onDeleteClick} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDeleteClick?: React.MouseEventHandler<SVGSVGElement>;
}

EnhancedTableToolbar.defaultProps = {
  onDeleteClick: () => {}
};

export default EnhancedTableToolbar;
