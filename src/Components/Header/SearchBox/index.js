import { IoSearch } from 'react-icons/io5';
import Button from '@mui/material/Button';

const SearchBox = () => {
    return (
        <div className='headerSearch me-3 ms-3'>
        <input type='text' placeholder='Type to search...'/>
        <Button><IoSearch/></Button>
    </div>
    )
}

export default SearchBox;