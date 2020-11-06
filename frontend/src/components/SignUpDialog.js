import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {name, email, password} from 'src/constants/regex'
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
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

const SIGN_UP = gql`
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      firstName
      lastName
      email
      password
    }
  }
`;

export default function SignUpDialog(props) {
  const { show, close } = props;
  const [signup] = useMutation(SIGN_UP);
  const theme = useTheme();
  const [values, setValues] = React.useState({
    userType: 'athlete',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [showErrors, setShowErrors] = React.useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    passwordCheck: false,
  });
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPasswordCheck, setShowPasswordCheck] = React.useState(false)


  const updateValue = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const showError = (prop, value) => {
    setShowErrors({ ...showErrors, [prop]: value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetDialog = () => {
    setValues({
      userType: 'athlete',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordCheck: '',
    })
    setShowErrors({
      firstname: false,
      lastname: false,
      email: false,
      password: false,
      passwordCheck: false,
    })
    setShowPassword(false)
    setShowPasswordCheck(false)
  }

  const onSave = () => {
    signup({
      variables: {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
       }
    }).then(response => {
      // TODO loading state, response data - verified user -> sign in
    }).catch((error) => {
      // TODO handle error state
    })
    resetDialog()
  }

  const onClose = () => {
    resetDialog()
    close()
  }

  return (
    <Dialog fullWidth className="registration" open={show}>
      <Toolbar variant="regular" className={'toolbar'} style={{'backgroundColor': theme.palette.info.main}}>
        <div/>
        <Box color="white">
          <Typography variant="h6">Registrace do aplikace FitMe</Typography>
        </Box>
        <IconButton onClick={() => onClose()}><Close fontSize="large" style={{color: 'white'}}/></IconButton>
      </Toolbar>
      <DialogContent>
        <form autoComplete="on">
          <Box
            marginTop="20px"
            paddingLeft="15px"
            paddingTop="10px"
            marginLeft="17.5%"
            marginRight="17.5%"
            bgcolor="WhiteSmoke">
            <FormControl component="fieldset">
              <div>Vyberte kategorii účtu</div>
              <RadioGroup name="gender1" value={values.userType} onChange={updateValue('userType')}>
                <FormControlLabel
                  value="athlete"
                  control={<Radio color="primary" />}
                  label="Sportovec" />
                <FormControlLabel
                  disabled
                  value="owner"
                  control={<Radio color="primary" />}
                  label="Majitel sportoviště" />
                <FormControlLabel
                  disabled
                  value="sportsground"
                  control={<Radio color="primary" />}
                  label="Trenér" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box width="100%" display="flex" flexDirection="column" flexWrap="wrap" alignItems="center">
            <Box width="65%">
              <TextField
                id="signup-firstname"
                label="Jméno"
                name="name"
                placeholder="Zadejte své jméno"
                onChange={updateValue('firstname')}
                onBlur={() => showError('firstname', true)}
                error={showErrors.firstname && !name.test(values.firstname)}
                helperText={showErrors.firstname && !name.test(values.firstname) &&
                  'Jméno smí obsahovat pouze písmena a nesmí být delší než 50 znaků'}
                variant="filled"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}/>
              <TextField
                id="signup-lastname"
                label="Příjmení"
                name="lastname"
                placeholder="Zadejte své příjmení"
                onChange={updateValue('lastname')}
                onBlur={() => showError('lastname', true)}
                error={showErrors.lastname && !name.test(values.lastname)}
                helperText={showErrors.lastname && !name.test(values.lastname) &&
                  'Příjmení smí obsahovat pouze písmena a nesmí být delší než 50 znaků'}
                variant="filled"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}/>
              <TextField
                id="signup-email"
                label="Email"
                name="email"
                placeholder="Zadejte svůj email"
                onChange={updateValue('email')}
                onBlur={() => showError('email', true)}
                error={showErrors.email && !email.test(values.email)}
                helperText={showErrors.email && !email.test(values.email) && 'E-mail nemá správný formát.'}
                variant="filled"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}/>
              <FormControl fullWidth variant="filled" margin="normal">
                <InputLabel shrink htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Zadejte své heslo"
                  onChange={updateValue('password')}
                  onBlur={() => showError('password', true)}
                  error={showErrors.password && !password.test(values.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error>
                  {showErrors.password && !password.test(values.password) &&
                  'Heslo musí být minimálně 8 znaků dlouhé, musí obsahovat číslici a velké i malé písmeno.'}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth variant="filled" margin="normal">
                <InputLabel shrink htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="signup-password-check"
                  type={showPasswordCheck ? 'text' : 'password'}
                  name="password-check"
                  placeholder="Zadejte své heslo znovu"
                  onChange={updateValue('passwordCheck')}
                  onBlur={() => showError('passwordCheck', true)}
                  error={showErrors.passwordCheck && values.password !== values.passwordCheck}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPasswordCheck ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error>
                  {showErrors.passwordCheck && values.password !== values.passwordCheck && 'Hesla se neshodují.'}
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Box
          marginTop="10px"
          marginBottom="25px"
          width="100%"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center">
          <Box width="60%">
            <Button onClick={() => onSave()} size="large" fullWidth variant="contained" color="primary">
              Registrovat
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
