/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  Grid, Box, TextField, Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { InputLabel } from 'src/components/atoms';

const AddTrainerForm = ({
  trainers,
  placeTrainers,
  reFetchData,
  onSave,
  loading,
}) => {
  const [selectedTrainer, setSelectedTrainer] = React.useState(null);

  useEffect(() => {
    reFetchData();
  }, [reFetchData]);

  const onSavePlaceTrainer = () => {
    onSave(selectedTrainer.id).then(() => {
      setSelectedTrainer(null);
      reFetchData();
    });
  };

  const hasPlaceTrainer = (trainer) => placeTrainers.some((placeTrainer) => placeTrainer.id === trainer.id);

  return (
    <div>
      <InputLabel label="Přidání trenéra" />
      <Autocomplete
        id="combo-box-demo"
        value={selectedTrainer}
        options={trainers}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        getOptionDisabled={(option) => hasPlaceTrainer(option)}
        onChange={(e, value) => setSelectedTrainer(value)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Vyberte disciplínu"
            variant="outlined"
          />
        )}
      />
      <Box marginY={4}>
        <Grid item container justify="center">
          <Button
            onClick={onSavePlaceTrainer}
            disabled={loading || !selectedTrainer}
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            Přidat
          </Button>
        </Grid>
      </Box>
    </div>
  );
};

export { AddTrainerForm };
