import * as React from 'react';
import { Skeleton } from '@mui/material';

interface TextFieldSkeletonProps {
  width?: number;
}

function TextFieldSkeleton(props: TextFieldSkeletonProps) {
  const { width } = props;
  return <Skeleton animation="wave" variant="rectangular" width={width} />;
}

TextFieldSkeleton.defaultProps = {
  width: undefined
};

function UserEditViewSkeleton() {
  return <Skeleton width={100} height={100} />;
}

export default UserEditViewSkeleton;
