import React from 'react';
// import { gql, useQuery } from '@apollo/client';
import {
  TextField,
  FormControl,
  FormControlLabel,
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Toolbar,
  Typography,
  RadioGroup,
  Radio
} from '@material-ui/core'
import {Close, Visibility, VisibilityOff} from '@material-ui/icons'
import useTheme from '@material-ui/core/styles/useTheme'

// const GET_PLACES = gql`
//   query SaveUser {
//     places {
//       id
//       name
//       description
//     }
//   }
// `;

export default function SignUpDialog(props) {
  const { show, close } = props;
  const theme = useTheme();
  // const { } = useQuery(GET_PLACES);
  const [values, setValues] = React.useState({
    userType: 'athlete',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog fullWidth className="registration" open={show}>
      <Toolbar variant="regular" className={'toolbar'} style={{'background-color': theme.palette.primary.main}}>
        <div/>
        <Box color="white">
          <Typography variant="h6">Registrace do aplikace FitMe</Typography>
        </Box>
        <IconButton color="white" onClick={close}><Close color="white"/></IconButton>
      </Toolbar>
      <DialogContent>
        <form autoComplete="on">
          <Box width="100%" display="flex" flexDirection="column" flexWrap="wrap" alignItems="center">
            <FormControl component="fieldset">
              <div>Gender</div>
              <RadioGroup aria-label="gender" name="gender1" value={values.userType} onChange={handleChange}>
                <FormControlLabel value="athlete" control={<Radio />} label="Sportovec" />
                <FormControlLabel disabled value="owner" control={<Radio />} label="Sportoviště" />
                <FormControlLabel disabled value="sportsground" control={<Radio />} label="Sportoviště" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box width="100%" display="flex" flexDirection="column" flexWrap="wrap" alignItems="center">
            <Box width="70%">
              <TextField
                label="Jméno"
                value={values.firstName}
                required variant="filled"
                fullWidth margin="normal"
                autoComplete/>
              <TextField
                label="Příjmení"
                value={values.lastName}
                required variant="filled"
                fullWidth margin="normal"
                autoComplete/>
              <TextField
                label="Email"
                value={values.email}
                required variant="filled"
                fullWidth margin="normal"
                autoComplete/>
              <FormControl fullWidth variant="filled" margin="normal">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  required
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl fullWidth variant="filled" margin="normal">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.passwordCheck}
                  required
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
          <Box width="60%">
            <Button size="large" fullWidth variant="contained" color="primary">Registrovat</Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
