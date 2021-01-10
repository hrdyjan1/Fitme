/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react'
import {
  Grid,
  Box,
  TextField, Button
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { InputLabel } from 'src/components/atoms'

const AddSportTypeForm = ({sportTypes, placeSportTypes, reFetchData, onSave, loading}) => {
  const [selectedSportType, setSelectedSportType] = React.useState(null)

  useEffect(() => {
    reFetchData();
  }, []);

  const onSavePlaceSportType = () => {
    console.log()
    onSave(selectedSportType.stid).then(() => {
      setSelectedSportType(null)
      reFetchData()
    })
  }

  const hasPlaceSportType = (sportType) => (
    placeSportTypes.some(placeSportType => placeSportType.stid === sportType.stid)
  )


  return (
    <div>
      <InputLabel label="Sportovní disciplína"/>
      <Autocomplete
        id="combo-box-demo"
        options={sportTypes}
        getOptionLabel={(option => option.sportTypeName)}
        getOptionDisabled={(option) => hasPlaceSportType(option)}
        onChange={(e, value) => setSelectedSportType(value)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Vyberte disciplínu" variant="outlined" />
        )}
      />
      <Box marginY={4}>
        <Grid item container justify="center">
          <Button
            onClick={onSavePlaceSportType}
            disabled={loading || (!selectedSportType)}
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
}

export { AddSportTypeForm };
