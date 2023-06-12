import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TableCell,
  useTheme,
} from '@mui/material';

import { dataService } from '../../services';
import CountryDialog from '../CountryDialog';
import {
  setData,
  selectData,
  setLanguages,
  setRegions,
  setTimezones,
  setCurrencies,
  setSubregions,
  selectTimezone,
  selectLanguage,
  selectCurrency,
  selectRegion,
  selectSubregion,
  selectIndependent, selectKeyword,
} from '../../features';

const columns = [
  { id: 'flag', label: 'Flag'},
  { id: 'country_name', label: 'Country' },
  { id: 'capital', label: 'Capital' },
  { id: 'region', label: 'Region' },
  { id: 'subregion', label: 'Sub Region' },
  { id: 'language', label: 'Language' },
  { id: 'currency', label: 'Currency' },
  { id: 'independent', label: 'Independent' },
  { id: 'area', label: 'Area' },
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function HomePage() {
  const styles = (theme) => ({
    paper: {
      padding: theme.spacing(3),
      margin: '0 auto',
      marginTop: theme.spacing(10),
    },
    tHeadItem: {
      fontWeight: '1000',
      fontSize: theme.spacing(2.5),
      paddingLeft: theme.spacing(0.5),
    },
    tContainer: {
      maxHeight: 'calc(100vh - 200px)',
    },
    cell: {
      padding: theme.spacing(0.5),
    }
  });

  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('country_name');
  const [dialogOpened, setDialogOpened] = React.useState(false);
  const [country, setCountry] = React.useState(null);
  const isInitialMount = useRef(true);
  const theme = useTheme();
  const classes = styles(theme);
  const getData = () => {
    dataService.getData()
      .then((_data) => {
        const
          uniqueLanguages = [],
          uniqueRegions = [],
          uniqueSubregions = {},
          uniqueTimezones = [],
          uniqueCurrencies = [];
        const data = _data.map((country) => {
          const {
            name,
            currencies: _currencies = {},
            languages: _languages = {},
          } = country;

          const nativeName = Object.keys(name.nativeName || {}).map((id) => {
            const item = name.nativeName[id];

            return {
              id,
              name: item.common || '',
            };
          });

          const currencies = Object.keys(_currencies).map((id) => {
            const item = _currencies[id];
            if(uniqueCurrencies.map((item) => item.id).indexOf(id) === -1) {
              uniqueCurrencies.push({
                id,
                ...item,
              });
            }
            return {
              id,
              ...item,
            };
          });
          const currency = currencies.length ? `${currencies[0].name} (${currencies[0].symbol})` : '';

          const languages = Object.keys(_languages).map((id) => {
            const item = _languages[id];

            if(uniqueLanguages.indexOf(item) === -1) {
              uniqueLanguages.push(item);
            }

            return {
              id,
              item,
            };
          });

          const language = languages.length ? languages[0].item : '';

          if(uniqueRegions.indexOf(country.region) === -1) {
            uniqueRegions.push(country.region);
            uniqueSubregions[country.region] = [];
          }

          if (country.subregion && uniqueSubregions[country.region].indexOf(country.subregion) === -1) {
            uniqueSubregions[country.region].push(country.subregion);
          }

          country.timezones.forEach((e) => {
            if(uniqueTimezones.indexOf(e) === -1) {
              uniqueTimezones.push(e);
            }
          });

          return {
            ...country,
            country_name: name.common,
            native_name: nativeName,
            currencies,
            currency,
            languages,
            language,
          };
        });


        dispatch(setData({data}));
        dispatch(setLanguages({data: uniqueLanguages}));
        dispatch(setRegions({data: uniqueRegions}));
        dispatch(setSubregions({data: uniqueSubregions}));
        dispatch(setTimezones({data: uniqueTimezones}));
        dispatch(setCurrencies({data: uniqueCurrencies}));
      })
      .catch((e) => {
        console.log(e.message);
      })
  };

  const data = useSelector(selectData);
  const keyword = useSelector(selectKeyword);
  const isIndependent = useSelector(selectIndependent);
  const selectedTimezone = useSelector(selectTimezone);
  const selectedLanguage = useSelector(selectLanguage);
  const selectedCurrency = useSelector(selectCurrency);
  const selectedRegion = useSelector(selectRegion);
  const selectedSubregion = useSelector(selectSubregion);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getData();
    }
  });
  const handleOpenDialog = (country) => {
    setDialogOpened(true);
    setCountry(country)
  };

  const handleCloseDialog = () => {
    setDialogOpened(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const handleRequestSort = (property) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const filteredData = data.filter((item) => (
    (!keyword
      || (item.country_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
      || (item.native_name && item.native_name.some((name) => name.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1))
      || (item.capital && item.capital.some((cap) => cap.toLowerCase().indexOf(keyword.toLowerCase()) !== -1))
    )
    && (!isIndependent || item.independent === isIndependent)
    && (!selectedTimezone || item.timezones.indexOf(selectedTimezone) !== -1)
    && (!selectedLanguage || item.languages.map(item => item.item).indexOf(selectedLanguage) !== -1)
    && (!selectedCurrency || item.currencies.map(item => item.name).indexOf(selectedCurrency) !== -1)
    && (!selectedRegion || item.region.indexOf(selectedRegion) !== -1)
    && (!selectedSubregion || item.subregion === selectedSubregion)
  ));

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredData, getComparator(order, orderBy))
        .slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredData],
  );

  return (
    <Paper sx={classes.paper}>
      <TableContainer sx={classes.tContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={classes.tHeadItem}
                  sortDirection={orderBy === column.id ? order : false}
                  key={column.id}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows
              .map((country) => {
                const {language, currency, country_name: countryName, capital, region, subregion, independent, area, flags} = country;
                return (
                  <TableRow
                    hover role="checkbox"
                    tabIndex={-1}
                    key={countryName}
                    onClick={() => handleOpenDialog(country)}>
                    <TableCell
                      sx={classes.cell}
                    >
                      <img
                        src={flags.png}
                        alt={flags.alt}
                        width="26px"
                      />
                    </TableCell>
                    <TableCell sx={classes.cell}>{countryName}</TableCell>
                    <TableCell sx={classes.cell}>{capital}</TableCell>
                    <TableCell sx={classes.cell}>{region}</TableCell>
                    <TableCell sx={classes.cell}>{subregion}</TableCell>
                    <TableCell sx={classes.cell}>{language}</TableCell>
                    <TableCell sx={classes.cell}>{currency}</TableCell>
                    <TableCell sx={classes.cell}>{independent ? 'Yes' : 'No'}</TableCell>
                    <TableCell sx={classes.cell}>{area}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {country && (
        <CountryDialog
          open={dialogOpened}
          data={country}
          onClose={handleCloseDialog}
        />
      )}
    </Paper>
  );
}

export default HomePage;
