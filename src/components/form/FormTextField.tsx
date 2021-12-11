import React from 'react';
import { TextField } from '@mui/material';
import { Control, Controller, FieldError, Path } from 'react-hook-form';

interface FormTextFieldProps<T> {
  name: Path<T>;
  label: string;
  control: Control<T, object>;
  rules?: any;
  error?: FieldError;
  errorText?: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
}

function FormTextField<T>(props: FormTextFieldProps<T>) {
  const { name, label, control, rules, error, errorText, type } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? errorText : null}
          fullWidth
          margin="normal"
          value={value}
          label={label}
        />
      )}
    />
  );
}

FormTextField.defaultProps = {
  rules: undefined,
  error: undefined,
  errorText: '',
  type: undefined
};

export default FormTextField;
