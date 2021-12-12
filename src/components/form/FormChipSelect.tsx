import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { MenuItem, Select, OutlinedInput, FormControl, InputLabel, Box, Chip, SelectChangeEvent } from '@mui/material';
import { Control, Controller, Path } from 'react-hook-form';
import { User } from 'services/models/User';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const hobbies = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

interface FormChipSelectProps {
  name: Path<User>;
  label: string;
  control: Control<User, object>;
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

function FormChipSelect(props: FormChipSelectProps) {
  const { name, label, control } = props;

  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<any>, hookOnChange: (...z: any[]) => void) => {
    const {
      target: { value }
    } = event;
    hookOnChange(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Controller
      name="hobbies"
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth margin="normal">
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          {/* <Select
            labelId={`${name}-label`}
            fullWidth
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            value={value}
          >
            {generateSelectOptions()}
          </Select> */}

          <Select
            labelId={`${name}-label`}
            multiple
            value={value}
            onChange={(e) => handleChange(e, onChange)}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((item) => (
                  <Chip key={item} label={item} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {hobbies.map((hobby) => (
              <MenuItem key={hobby} value={hobby} style={getStyles(hobby, value, theme)}>
                {hobby}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default FormChipSelect;
