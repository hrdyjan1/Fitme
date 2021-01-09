import React from 'react';
import {
  colors,
  FormControl,
  InputAdornment,
  Button,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from 'src/components/atoms';
import Section from 'src/components/organisms/Section';

const useStyles = makeStyles((theme) => ({
  pagePaddingTop: {
    padding: theme.spacing(0),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },

  searchInputContainer: {
    background: theme.palette.alternate.main,
    padding: theme.spacing(2),
    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.11)',
    borderRadius: theme.spacing(1),
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0 !important',
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: theme.spacing(2),
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 0,
    },
    '& .MuiOutlinedInput-input': {
      padding: 0,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },

  searchButton: {
    maxHeight: 45,
    minWidth: 135,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
}));

const top5Categories = [
  { title: 'Jóga' },
  { title: 'Běhání' },
  { title: 'Posilování' },
  { title: 'Aerobik' },
  { title: 'Zumba' },
];

function Search() {
  const classes = useStyles();

  return (
    <Section className={classes.pagePaddingTop}>
      <div className={classes.searchInputContainer} data-aos="fade-up">
        <FormControl fullWidth variant="outlined">
          <Autocomplete
            id="combo-box-demo"
            options={top5Categories}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
              // size="medium"
                variant="outlined"
                placeholder="Vyhledávat podle kategorie"
                label="Vyhledávání"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        fontIconClass="fas fa-search"
                        fontIconColor={colors.blueGrey[900]}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.searchButton}
        >
          Vyhledávat
        </Button>
      </div>
    </Section>
  );
}

export { Search };
