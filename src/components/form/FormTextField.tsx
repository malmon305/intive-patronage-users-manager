import React from 'react';
import { TextField } from '@mui/material';
import { Control, Controller, Path } from 'react-hook-form';

interface FormTextFieldProps<T> {
  name: Path<T>;
  label: string;
  control: Control<T, object>;
}

function FormTextField<T>(props: FormTextFieldProps<T>) {
  const { name, label, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField onChange={onChange} fullWidth margin="normal" value={value} label={label} />
      )}
    />
  );
}

export default FormTextField;
