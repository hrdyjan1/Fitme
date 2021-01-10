import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { SectionHeader } from '../profile/SectionHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function ChipList({ data: chipData }) {
  const classes = useStyles();

  return (
    <>
      <SectionHeader
        title="Kategorie"
        align="left"
        disableGutter
        subtitleProps={{
          color: 'textPrimary',
          variant: 'body1',
        }}
      />

      <Paper component="ul" className={classes.root}>
        {chipData.map((data) => (
          <li key={data.key}>
            <Chip label={data.label} className={classes.chip} />
          </li>
        ))}
      </Paper>
    </>
  );
}

export { ChipList };
