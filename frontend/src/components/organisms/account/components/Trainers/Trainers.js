/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  ListItem,
  Avatar,
} from '@material-ui/core';
import CardBase from 'src/components/organisms/cardBase';

const useStyles = makeStyles((theme) => ({
  root: {},
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  cardBase: {
    borderWidth: 1,
    borderRadius: theme.spacing(1),
    '& .card-base__content': {
      padding: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
      },
    },
  },
  avatar: {
    width: 110,
    height: 110,
    justifyContent: 'flex-end',
    border: `4px solid ${theme.palette.alternate.dark}`,
    borderRadius: '100%',
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  listItem: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  listItemAvatar: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
    },
  },
  listItemText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 0,
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
}));

export const data = [
  {
    title: 'Fitness trenérka',
    authorPhoto: {
      src:
        'https://us.123rf.com/450wm/donets/donets1506/donets150600766/41721329-female-user-icon-with-long-shadow-on-white-background.jpg?ver=6',
    },
    authorName: 'Kate Segelson',
  },
  {
    title: 'Zumba lektor',
    authorPhoto: {
      src:
        'https://us.123rf.com/450wm/donets/donets1506/donets150600766/41721329-female-user-icon-with-long-shadow-on-white-background.jpg?ver=6',
    },
    authorName: 'Alex Johnson',
  },
  {
    title: 'Badminton specialistka',
    authorPhoto: {
      src:
        'https://us.123rf.com/450wm/donets/donets1506/donets150600766/41721329-female-user-icon-with-long-shadow-on-white-background.jpg?ver=6',
    },
    authorName: 'Valeria Kogan',
  },
  {
    title: 'Hatha Yoga Coach',
    authorPhoto: {
      src:
        'https://us.123rf.com/450wm/donets/donets1506/donets150600766/41721329-female-user-icon-with-long-shadow-on-white-background.jpg?ver=6',
    },
    authorName: 'Akachi Luccini',
  },
  {
    title: 'Fitness tréner',
    authorPhoto: {
      src:
        'https://us.123rf.com/450wm/donets/donets1506/donets150600766/41721329-female-user-icon-with-long-shadow-on-white-background.jpg?ver=6',
    },
    authorName: 'Jack Smith',
  },
  {
    title: 'Výživová poradkyně',
    authorPhoto: {
      src:
        'https://us.123rf.com/450wm/donets/donets1506/donets150600766/41721329-female-user-icon-with-long-shadow-on-white-background.jpg?ver=6',
    },
    authorName: 'Veronica Adams',
  },
];

const Billing = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">
            Přidávání a odebírání trenérů
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box marginY={4}>
            <Divider />
          </Box>
        </Grid>

        <Grid container spacing={isMd ? 2 : 1}>
          {data.map((item) => (
            <Grid item sm={6} key={item.toString()} data-aos="fade-up">
              <CardBase className={classes.cardBase}>
                <ListItem disableGutters className={classes.listItem}>
                  <Grid container>
                    <Grid
                      item
                      xs={8}
                      container
                      direction="column"
                      justify="center"
                    >
                      <Typography>{item.title}</Typography>
                      <Typography>{item.authorName}</Typography>
                    </Grid>
                    <Grid item xs={4} justify="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar
                          {...item.authorPhoto}
                          className={classes.avatar}
                        />
                      </Box>
                    </Grid>
                    <Grid item sm={12}>
                      <Box marginY={2}>
                        <Typography>
                          Tréner/ka působící na našem sportovišti poskytující
                          prvotřídní rady, jak s treéninkem tak v oblasti
                          výživy.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
              </CardBase>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Box marginY={4}>
            <Divider />
          </Box>
        </Grid>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              className={classes.inputTitle}
            >
              Jméno
            </Typography>
            <TextField
              placeholder="Jan"
              variant="outlined"
              size="medium"
              name="firstName"
              fullWidth
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              className={classes.inputTitle}
            >
              Přijímení
            </Typography>
            <TextField
              placeholder="Novák"
              variant="outlined"
              size="medium"
              name="lastName"
              fullWidth
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              className={classes.inputTitle}
            >
              Popis
            </Typography>
            <TextField
              placeholder="Jako trenér ..."
              variant="outlined"
              name="bio"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              Uložit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Billing;
