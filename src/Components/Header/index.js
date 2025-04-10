import { Link } from 'react-router-dom';
import logo from '../../asset/images/logo.png';
import Button from '@mui/material/Button';
import { FiUser } from 'react-icons/fi';
import { FaCartShopping } from 'react-icons/fa6';
import SearchBox from './SearchBox';
import CountrySelection from '../CountrySelection';
import Navigation from './Navigation';

const Header= ()=>{
    return(
        <>
            <div className="headerWrapper">
                <div className="top-strip bg-purple">
                    <div className="container">
                        <p className="mb-0 mt-0 text-center">Welcome to <b>IKEA</b>, let us help you make 
                            your decoration choice easier</p>
                    </div>
                </div>

                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="logoWrapper d-flex align-items-center col-2">
                                <Link to={'/'}><img src={logo} alt="logo" /></Link>
                            </div>

                            <div className="no2 col-10 d-flex align-items-center">

                               <CountrySelection/>
                               <SearchBox/>

                                <div className='no3 d-flex align-items-center ms-auto'>
                                    <Button className='user me-4'><FiUser/></Button>
                                    <div className='cartTab ms-auto d-flex align-items-center'>
                                        <span className='wallet me-4'>$0.00</span>
                                        <div className='position-relative ms-2'>
                                            <Button className='user'><FaCartShopping/></Button>
                                            <span className='cartCount d-flex align-item-center justify-content-center'>0</span> 
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </header>

                <Navigation/>
            </div>
        </>
    )
}

export default Header;