import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  MenuItem,
  Select,
  OutlinedInput,
  FormControl,
  InputLabel,
  Box,
  Chip,
  Button,
  Grid,
  Typography,
  FormHelperText
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, useForm } from 'react-hook-form';
import { User } from 'services/models/User';
import UserEditViewSkeleton from 'components/skeletons/UserEditViewSkeleton';
import UsersService from 'services/UsersService';
import useLoading from 'hooks/useLoading';
import FormTextField from 'components/form/FormTextField';
import FormSelect from 'components/form/FormSelect';
import FormDatePicker from 'components/form/FormDatePicker';
import Hobby from 'services/models/Hobby';
import HobbiesService from 'services/HobbiesService';
import { useSnackbar } from 'notistack';

function UserEditView() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params?.id;
  const isInCreatemode = id === undefined;

  const { enqueueSnackbar } = useSnackbar();

  const usersService = UsersService.getInstance();
  const hobbiesService = HobbiesService.getInstance();

  const [serviceUser, isLoadingUser, setIsLoadingUser] = useLoading<User>(User.fromAny({ id: '' }), () => {
    if (isInCreatemode) {
      return Promise.resolve(User.fromAny({ id: '' }));
    }
    return usersService.getUser(id);
  });

  const [serviceHobbies, isLoadingHobbies] = useLoading<Hobby[]>([], () => hobbiesService.getHobbies());

  const onCreateSubmit = async (formUser: User) => {
    setIsLoadingUser(true);

    try {
      await usersService.createUser(formUser);
    } catch (error) {
      enqueueSnackbar("Sorry, we couldn't save your data... :(", {
        variant: 'error',
        autoHideDuration: 3000
      });
      setIsLoadingUser(false);
    }

    enqueueSnackbar('User saved successfully! :)', {
      variant: 'success',
      autoHideDuration: 3000
    });
    navigate('/');
  };

  const onUpdateSubmit = async (formUser: User) => {
    setIsLoadingUser(true);

    try {
      await usersService.updateUser(formUser);
    } catch (error) {
      enqueueSnackbar("Sorry, we couldn't save your data... :(", {
        variant: 'error',
        autoHideDuration: 3000
      });
      setIsLoadingUser(false);
    }

    enqueueSnackbar('User saved successfully! :)', {
      variant: 'success',
      autoHideDuration: 3000
    });
    navigate('/');
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<User>({ mode: 'onBlur' });
  const onSubmit = (data: User) => {
    if (isInCreatemode) {
      onCreateSubmit(data);
      return;
    }
    onUpdateSubmit(data);
  };

  React.useEffect(() => {
    reset(serviceUser);
  }, [isLoadingUser]);

  return isLoadingUser ? (
    <UserEditViewSkeleton id={id} />
  ) : (
    <form>
      <Box sx={{ flexGrow: 1 }}>
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ marginTop: 2 }}>
              {id ? 'Edit user' : 'Add new user'}
            </Typography>
          </Grid>
          <Grid item container spacing={2} flexDirection="column">
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="name"
                label="Name"
                control={control}
                rules={{ required: true }}
                error={errors.name}
                errorText="Name is required"
              />
              <FormTextField
                name="email"
                label="Email"
                control={control}
                rules={{ required: true }}
                error={errors.email}
                errorText="Email is required"
              />
              <FormDatePicker name="dateOfBirth" label="Date of birth" control={control} />
              <FormTextField
                name="age"
                label="Age"
                control={control}
                rules={{
                  required: true,
                  message: 'Age is required',
                  min: { value: 1, message: 'Age value must be higher or equal to 1' },
                  max: { value: 150, message: 'Age value must be smaller than 150' }
                }}
                error={errors.age}
                errorText={errors.age?.message}
                type="number"
              />
              <FormSelect name="gender" label="Gender" control={control} />
              <FormTextField name="phoneNumber" label="Phone number" control={control} />
              <FormTextField name="address" label="Address" control={control} />
            </Grid>
            <Grid item container xs={12} sm={6}>
              {isLoadingHobbies ? (
                'Loading...'
              ) : (
                <Controller
                  name="hobbies"
                  rules={{ required: true, validate: (value) => value.length !== 0 }}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="hobbies-label">Hobbies</InputLabel>

                      <Select
                        onClose={onBlur}
                        onBlur={onBlur}
                        error={!!errors.hobbies}
                        labelId="hobbies-label"
                        multiple
                        value={value}
                        onChange={onChange}
                        input={<OutlinedInput label="Hobbies" />}
                        renderValue={(selectedHobbies) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selectedHobbies.map((hobby) => (
                              <Chip key={hobby} label={hobby} />
                            ))}
                          </Box>
                        )}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 500
                            }
                          }
                        }}
                      >
                        {serviceHobbies.map((hobby) => (
                          <MenuItem key={hobby.name} value={hobby.name}>
                            {hobby.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.hobbies ? 'At least one hobby should be selected' : null}</FormHelperText>
                    </FormControl>
                  )}
                />
              )}
            </Grid>
          </Grid>

          <Grid container item xs={12} justifyContent="flex-end">
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              sx={{ marginRight: 1 }}
              disabled={!isDirty || !isValid}
            >
              SAVE
            </Button>
            <Button
              disabled={!isDirty}
              onClick={() => reset()}
              color="error"
              variant="contained"
              sx={{ marginRight: 1 }}
            >
              RESET
            </Button>
            <Button variant="contained" component={Link} to="/" sx={{ marginRight: 1 }}>
              CANCEL
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default UserEditView;
