import * as React from 'react';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function TextFieldSkeleton() {
  return <Skeleton animation="wave" variant="rectangular" width={736} height={56} sx={{ mt: 3 }} />;
}

interface UserEditViewSkeletonProps {
  id?: string;
}

function UserEditViewSkeleton(props: UserEditViewSkeletonProps) {
  const { id } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            {id ? 'Edit user' : 'Add new user'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} flexDirection="column">
          <Grid item xs={12} sm={6}>
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
          </Grid>
          <Grid item container xs={12} sm={6}>
            <TextFieldSkeleton />
          </Grid>
        </Grid>

        <Grid container item xs={12} justifyContent="flex-end">
          <Button variant="contained" color="success" startIcon={<SaveIcon />} sx={{ marginRight: 1 }} disabled>
            SAVE
          </Button>
          <Button color="error" variant="contained" sx={{ marginRight: 1 }} disabled>
            RESET
          </Button>
          <Button variant="contained" sx={{ marginRight: 1 }} disabled>
            CANCEL
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

UserEditViewSkeleton.defaultProps = {
  id: undefined
};

export default UserEditViewSkeleton;
