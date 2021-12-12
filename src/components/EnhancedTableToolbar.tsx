import * as React from 'react';
import { Toolbar, alpha, Typography, Tooltip, IconButton, InputAdornment, TextField, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { red } from '@mui/material/colors';

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, onDeleteClick, isFiltering, setIsFiltering, filterValue, setFilterValue } = props;

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
          {isFiltering ? (
            <Stack direction="row" spacing={1}>
              <TextField
                autoFocus
                label="Filter by name, email, age, address, date of birth, hobby"
                variant="standard"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                sx={{ minWidth: 310 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <IconButton onClick={() => setIsFiltering(false)}>
                <FilterListIcon />
              </IconButton>
            </Stack>
          ) : (
            <IconButton onClick={() => setIsFiltering(true)}>
              <FilterListIcon />
            </IconButton>
          )}
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  onDeleteClick: React.MouseEventHandler<SVGSVGElement>;
  isFiltering: boolean;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
}

export default EnhancedTableToolbar;
