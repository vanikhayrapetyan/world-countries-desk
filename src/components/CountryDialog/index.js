import React from 'react';
import {
  Box,
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  useTheme,
} from '@mui/material';

const styles = (theme) => ({
  btn: {
    color: '#111'
  }
});

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function CountryDialog({open, data, onClose}) {
  const theme = useTheme();
  const classes = styles(theme);
  const handleClose = () => {
    onClose();
  };

  const {
    native_name: nativeName,
    country_name: name,
    capital,
    region,
    subregion,
    currencies,
    languages,
    independent,
    area,
    population,
    flags,
    coatOfArms,
  } = data;

  const {
    png: flagSrc,
    alt: flagAlt,
  } = flags;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs"
      fullWidth
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <img
          src={flagSrc}
          alt={flagAlt}
          style={{width: '32px', marginRight: '16px'}}
        />
        {nativeName.length ? nativeName[0].name : name}
      </DialogTitle>
      <DialogContent>
        <Box>
          <img
            src={coatOfArms.png}
            alt={name}
            style={{width: '46px', marginRight: '16px'}}
          />
        </Box>
        <Box>
          {name && `Name: ${name}`}
        </Box>
        <Box>
          {capital && `Capital: ${capital}`}
        </Box>
        <Box>
          {area && `Area: ${area}`}
        </Box>
        <Box>
          {population && `Population: ${population}`}
        </Box>
        <Box>
          {region && `Region: ${region}`}
        </Box>
        <Box>
          {subregion && `Subregion: ${subregion}`}
        </Box>
        <Box>
          {independent && `Independent: ${independent ? 'Yes' : 'No'}`}
        </Box>
        <Box>
          {languages.length ? `Languages: ${languages.map((language) => (language.item)).join(', ')}` : ''}
        </Box>
        <Box>
          {currencies.length ? `Currencies: ${currencies.map((currency) => (`${currency.name} (${currency.symbol})`)).join(', ')}` : ''}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={classes.btn}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CountryDialog;
