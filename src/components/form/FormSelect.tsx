import React from 'react';
import { MenuItem, Select, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import { Control, Controller, Path } from 'react-hook-form';

const options = [
  {
    label: 'Female',
    value: 'female'
  },
  {
    label: 'Male',
    value: 'male'
  },
  {
    label: 'Other',
    value: 'other'
  }
];

interface FormSelectProps<T> {
  name: Path<T>;
  label: string;
  control: Control<T, object>;
}

function FormSelect<T>(props: FormSelectProps<T>) {
  const { name, label, control } = props;

  const generateSelectOptions = () =>
    options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth margin="normal">
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            fullWidth
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            value={value}
          >
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default FormSelect;
