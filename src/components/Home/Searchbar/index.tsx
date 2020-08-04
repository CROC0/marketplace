import React, { useState } from 'react';
import useStyle from './style';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AddProduct from '../../AddProduct';

interface ISearchBarProps {
  handleSearch: (value: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ handleSearch }) => {
  const classes = useStyle();

  const [value, setValue] = useState<string>('');
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSearch(value);
    }
  };

  const clearSearch = () => {
    setValue('');
    handleSearch('');
  };

  const handleModalClose = () => {
    setAddModalOpen(false);
  };

  return (
    <Box className={classes.root} display='flex' justifyContent='space-between' alignItems='center'>
      <Button
        className={classes.addButton}
        color='default'
        variant='contained'
        onClick={() => setAddModalOpen(!addModalOpen)}>
        {addModalOpen ? 'Close' : 'Add Item'}
      </Button>
      <IconButton
        className={classes.mobileAddButton}
        onClick={() => setAddModalOpen(!addModalOpen)}>
        {addModalOpen ? <CloseIcon /> : <AddIcon />}
      </IconButton>
      <Box display='flex' justifyContent='center' alignItems='center' className={classes.control}>
        <FormControl>
          <Input
            autoComplete='off'
            className={classes.input}
            id='search'
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => handleKeyDown(e)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='search for products' onClick={() => handleSearch(value)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {value && (
          <IconButton color='primary' aria-label='Clear search' onClick={clearSearch}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      <AddProduct handleClose={handleModalClose} open={addModalOpen} />
    </Box>
  );
};

export default SearchBar;
