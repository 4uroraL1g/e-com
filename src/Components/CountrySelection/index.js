import Button from '@mui/material/Button';
import { FaAngleDown } from 'react-icons/fa6';

const CountrySelection = () => {
    return(
      <>
        <Button className='regionBtn'>
            <div className='region d-flex flex-column'>
                <span className='label'>Your region</span>
                <span className='name'>VietNam</span>
            </div>
            <span className='ms-auto'>
                <FaAngleDown/>
            </span>
        </Button>
    </>  
    )
    
}

export default CountrySelection;