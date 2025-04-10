import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";
import { LuSofa } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineKitchen } from "react-icons/md";
import { PiShower } from "react-icons/pi";
import { PiDesktopTowerLight } from "react-icons/pi";

const Navigation = () => {
    return(
        <nav>
                    <div className="container">
                        <div className='row'>
                            <div className='col-3 navNo1'>
                                <Button className='showAllCategory align-items-center'>
                                    <span className='iconNavMenu me-2'><IoIosMenu/></span>
                                    <span class="text"> All Categories</span>
                                    <span className='iconNavDrop ms-2'><FaAngleDown/></span>
                                </Button>

                            </div>

                            <div className='col-9 d-flex align-items-center navNo2'>
                                <ul className='list list-inline w100 ms-auto'>
                                    <li className='list-inline-item'><Link to = "/"><AiOutlineHome/>
                                    &nbsp; Home</Link></li>
                                    <li className='list-inline-item'><Link to ="/"><LuSofa/> 
                                    &nbsp; Living Room</Link></li>
                                    <li className='list-inline-item'><Link to ="/"><IoBedOutline/> 
                                    &nbsp; Bedroom</Link></li>
                                    <li className='list-inline-item'><Link to ="/"><MdOutlineKitchen/> 
                                    &nbsp; Kitchen</Link></li>
                                    <li className='list-inline-item'><Link to ="/"><PiShower/>
                                    &nbsp; Bathroom</Link></li>
                                    <li className='list-inline-item'><Link to ="/"><PiDesktopTowerLight/>
                                    &nbsp; Office</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
    )
}

export default Navigation;