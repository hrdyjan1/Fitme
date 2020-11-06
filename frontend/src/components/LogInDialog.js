import React from 'react';
// import { gql, useQuery } from '@apollo/client';
import {
  TextField,
  FormControl,
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
  Typography
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

export default function LogInDialog(props) {
  const { show, close } = props;
  const theme = useTheme();
  // const { } = useQuery(GET_PLACES);
  const [values, setValues] = React.useState({
    email: '',
    password: '',
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
          <Typography variant="h6">Přihlášení do aplikace FitMe</Typography>
        </Box>
        <IconButton color="white" onClick={close}><Close color="white"/></IconButton>
      </Toolbar>
      <DialogContent>
        <form autoComplete="on">
          <Box width="100%" display="flex" flexDirection="column" flexWrap="wrap" alignItems="center">
            <Box width="70%">
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
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Box width="100%" display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
          <Box width="60%">
            <Button size="large" fullWidth variant="contained" color="primary">Přihlásit se</Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
