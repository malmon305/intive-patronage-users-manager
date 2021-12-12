import React from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { User } from 'services/models/User';

interface FormDatePickerProps {
  name: Path<User>;
  label: string;
  control: Control<User, object>;
}

function FormDatePicker(props: FormDatePickerProps) {
  const { name, label, control } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            onChange={onChange}
            inputVariant="outlined"
            format="yyyy-MM-dd"
            autoOk
            fullWidth
            margin="normal"
            value={value}
            label={label}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
}

export default FormDatePicker;
