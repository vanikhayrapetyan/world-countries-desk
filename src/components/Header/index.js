import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Select,
  InputLabel,
  FormControl,
  Menu,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Restore as RestoreIcon,
} from '@mui/icons-material';
import {
  selectTimezones,
  selectTimezone,
  selectRegions,
  selectLanguages,
  selectLanguage,
  selectCurrencies,
  selectCurrency,
  selectSubregions,
  selectRegion,
  setRegion,
  setTimezone,
  setLanguage,
  setCurrency,
  setSubregion, selectSubregion, setIndependent, selectIndependent, selectKeyword, setKeyword,
} from '../../features';

function Header() {
  const styles = (theme) => ({
    appBar: {
      backgroundColor: '#f7f7f7',
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(1),
      position: 'fixed',
      zIndex: 1000,
      top: '0',
    },
    filterWraper: {
      '@media (max-width: 1408px)' : {
        display: 'none',
      },
    },
    formControl: {
      marginLeft: theme.spacing(1),
    },
    filterBox: {
      width: 180,
      display: 'inline-block',
      '@media (max-width: 1800px)' : {
        width: 160,
      },
    },
    filterBtn: {
      mr: 2,
      display: 'none',
      '@media (max-width: 1408px)' : {
          display: 'block',
      },
    },
    radiosBox: {
      '@media (max-width: 1408px)' : {
        display: 'none',
      },
    },
  });

  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = styles(theme);

  const handleIndependentChange = (event) => {
    dispatch(setIndependent({data: event.target.checked}));
  }
  const handleTimezoneSelect = (event) => {
    dispatch(setTimezone({data: event.target.value}))
  }
  const handleLanguageSelect = (event) => {
    dispatch(setLanguage({data: event.target.value}))
  }
  const handleCurrencySelect = (event) => {
    dispatch(setCurrency({data: event.target.value}))
  }
  const handleRegionSelect = (event) => {
    dispatch(setRegion({data: event.target.value}));
    dispatch(setSubregion({data: null}));
  }
  const handleSubRegionSelect = (event) => {
    dispatch(setSubregion({data: event.target.value}))
  }

  const handleSearch = (event) => {
    dispatch(setKeyword({data: event.target.value}));
  }

  const handleFilterOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    dispatch(setKeyword({data: ''}));
    dispatch(setIndependent({data: false}));
    dispatch(setTimezone({data: null}));
    dispatch(setLanguage({data: null}));
    dispatch(setCurrency({data: null}));
    dispatch(setRegion({data: null}));
    dispatch(setSubregion({data: null}));
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const keyword = useSelector(selectKeyword);
  const isIndependent = useSelector(selectIndependent);
  const languages = useSelector(selectLanguages);
  const selectedLanguage = useSelector(selectLanguage);
  const regions = useSelector(selectRegions);
  const selectedRegion = useSelector(selectRegion);
  const subregions = useSelector(selectSubregions);
  const subregionsList = subregions[selectedRegion] || [];
  const selectedSubregion = useSelector(selectSubregion);
  const timezones = useSelector(selectTimezones);
  const selectedTimezone = useSelector(selectTimezone);
  const currencies = useSelector(selectCurrencies);
  const selectedCurrency = useSelector(selectCurrency);

  const filterOpen = !!anchorEl;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={classes.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={classes.filterBtn}
            onClick={handleFilterOpen}
          >
            <FilterListIcon fontSize='large'/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              '@media (max-width: 1720px)' : {
                display: 'none',
              },
            }}
          >
            World Countries Desk
          </Typography>
          <Box sx={classes.filterWraper}>
            <FormControlLabel
              control={
                <Switch checked={isIndependent} onChange={handleIndependentChange} color="success" />
              }
              label="Is independent"
            />
            <FormControl sx={classes.formControl}>
              <InputLabel id="time-zone-select-label">By time-zone</InputLabel>
              <Select
                labelId="time-zone-select-label"
                id="time-zone-select"
                value={selectedTimezone || ''}
                label="By time-zone"
                onChange={handleTimezoneSelect}
                sx={classes.filterBox}
                size="small"
              >
                {timezones.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                  // <MenuItem value={10}>Ten</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={classes.formControl}>
              <InputLabel id="language-select-label">By language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={selectedLanguage || ''}
                label="By language"
                onChange={handleLanguageSelect}
                sx={classes.filterBox}
                size="small"
              >
                {languages.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={classes.formControl}>
              <InputLabel id="currency-select-label">By currency</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                value={selectedCurrency || ''}
                label="By currency"
                onChange={handleCurrencySelect}
                sx={classes.filterBox}
                size="small"
              >
                {currencies.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={classes.formControl}>
              <InputLabel id="regin-select-label">By region</InputLabel>
              <Select
                labelId="regin-select-label"
                id="region-select"
                value={selectedRegion || ''}
                label="By region"
                onChange={handleRegionSelect}
                sx={classes.filterBox}
                size="small"
              >
                {regions.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedRegion && (
              <FormControl sx={classes.formControl}>
                <InputLabel id="sub-region-select-label">By sub-region</InputLabel>
                <Select
                  labelId="sub-region-select-label"
                  id="sub-region-select"
                  value={selectedSubregion || ''}
                  label="By sub-region"
                  onChange={handleSubRegionSelect}
                  sx={classes.filterBox}
                  size="small"
                >
                  {subregionsList.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: { xs: '200px', xl: '320px' } },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" onChange={handleSearch} value={keyword} label="Search" variant="outlined" size="small"/>
          </Box>
          <IconButton
            onClick={handleRefresh}
          >
            <RestoreIcon fontSize='large' />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={filterOpen}
        onClose={handleFilterClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Switch checked={isIndependent} onChange={handleIndependentChange} color="success" />
            }
            label="Is independent"
          />
        </MenuItem>
        <MenuItem>
          <FormControl sx={classes.formControl}>
            <InputLabel id="time-zone-select-label">By time-zone</InputLabel>
            <Select
              labelId="time-zone-select-label"
              id="time-zone-select"
              value={selectedTimezone || ''}
              label="By time-zone"
              onChange={handleTimezoneSelect}
              sx={classes.filterBox}
              size="small"
            >
              {timezones.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
                // <MenuItem value={10}>Ten</MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl sx={classes.formControl}>
            <InputLabel id="language-select-label">By language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={selectedLanguage || ''}
              label="By language"
              onChange={handleLanguageSelect}
              sx={classes.filterBox}
              size="small"
            >
              {languages.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl sx={classes.formControl}>
            <InputLabel id="currency-select-label">By currency</InputLabel>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              value={selectedCurrency || ''}
              label="By currency"
              onChange={handleCurrencySelect}
              sx={classes.filterBox}
              size="small"
            >
              {currencies.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          <FormControl sx={classes.formControl}>
            <InputLabel id="regin-select-label">By region</InputLabel>
            <Select
              labelId="regin-select-label"
              id="region-select"
              value={selectedRegion || ''}
              label="By region"
              onChange={handleRegionSelect}
              sx={classes.filterBox}
              size="small"
            >
              {regions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem>
          {selectedRegion && (
            <FormControl sx={classes.formControl}>
              <InputLabel id="sub-region-select-label">By sub-region</InputLabel>
              <Select
                labelId="sub-region-select-label"
                id="sub-region-select"
                value={selectedSubregion || ''}
                label="By sub-region"
                onChange={handleSubRegionSelect}
                sx={classes.filterBox}
                size="small"
              >
                {subregionsList.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
}
export default Header;
