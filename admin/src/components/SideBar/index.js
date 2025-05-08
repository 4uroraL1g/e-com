import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaAngleRight, FaBell, FaCartArrowDown, FaClipboardCheck } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { MyContext } from "../../App";
import { BiSolidCategory } from "react-icons/bi";
import { TbSlideshow } from "react-icons/tb";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    if (activeTab === index) {
      setIsToggleSubmenu(!isToggleSubmenu);
    } else {
      setIsToggleSubmenu(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    localStorage.clear();
    context.setAlertBox({
      open: true,
      error: false,
      msg: "Logout successful",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <NavLink exact="true" activeClassName="is-active" to="/">
              <Button
                className={`w-100 ${activeTab === 0 ? "active" : ""}`}
                onClick={() => {
                  isOpenSubmenu(0);
                  context.setIsOpenNav(false);
                }}
              >
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
              </Button>
            </NavLink>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 1 && isToggleSubmenu ? "active" : ""}`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <TbSlideshow />
              </span>
              Home Banner Slides
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenu ? "colapse" : "colapsed"}`}>
              <ul className="submenu">
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/homeBannerSlide/add"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Add Home Banner Slide
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/homeBannerSlide/list"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Home Slides List
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 2 && isToggleSubmenu ? "active" : ""}`}
              onClick={() => isOpenSubmenu(2)}
            >
              <span className="icon">
                <BiSolidCategory />
              </span>
              Category
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenu ? "colapse" : "colapsed"}`}>
              <ul className="submenu">
                <li>
                  <Link to="/category" onClick={() => context.setIsOpenNav(false)}>
                    Category List
                  </Link>
                </li>
                <li>
                  <Link to="/category/add" onClick={() => context.setIsOpenNav(false)}>
                    Add a category
                  </Link>
                </li>
                <li>
                  <Link to="/subCategory" onClick={() => context.setIsOpenNav(false)}>
                    Sub Category List
                  </Link>
                </li>
                <li>
                  <Link to="/subCategory/add" onClick={() => context.setIsOpenNav(false)}>
                    Add a sub category
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 3 && isToggleSubmenu ? "active" : ""}`}
              onClick={() => isOpenSubmenu(3)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`submenuWrapper ${activeTab === 3 && isToggleSubmenu ? "colapse" : "colapsed"}`}>
              <ul className="submenu">
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/products"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Product List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/product/upload"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Product Upload
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/productRAMS/add"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Add Product RAMS
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/productWEIGHT/add"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Add Product WEIGHT
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/productSIZE/add"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Add Product SIZE
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <NavLink exact="true" activeClassName="is-active" to="/orders">
              <Button
                className={`w-100 ${activeTab === 4 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => {
                  isOpenSubmenu(4);
                  context.setIsOpenNav(false);
                }}
              >
                <span className="icon">
                  <FaClipboardCheck fontSize="small" />
                </span>
                Orders
              </Button>
            </NavLink>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 5 && isToggleSubmenu ? "active" : ""}`}
              onClick={() => isOpenSubmenu(5)}
            >
              <span className="icon">
                <TbSlideshow />
              </span>
              Home Banners
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`submenuWrapper ${activeTab === 5 && isToggleSubmenu ? "colapse" : "colapsed"}`}>
              <ul className="submenu">
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/banners"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Banners List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/banners/add"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Banner Upload
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 6 && isToggleSubmenu ? "active" : ""}`}
              onClick={() => isOpenSubmenu(6)}
            >
              <span className="icon">
                <TbSlideshow />
              </span>
              Home Side Banners
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`submenuWrapper ${activeTab === 6 && isToggleSubmenu ? "colapse" : "colapsed"}`}>
              <ul className="submenu">
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/homeSideBanners"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Banners List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/homeSideBanners/add"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Banner Upload
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Button
              className={`w-100 ${activeTab === 7 && isToggleSubmenu ? "active" : ""}`}
              onClick={() => isOpenSubmenu(7)}
            >
              <span className="icon">
                <TbSlideshow />
              </span>
              Home Bottom Banners
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div className={`submenuWrapper ${activeTab === 7 && isToggleSubmenu ? "colapse" : "colapsed"}`}>
              <ul className="submenu">
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/homeBottomBanners"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Banners List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact="true"
                    activeClassName="is-active"
                    to="/homeBottomBanners/add"
                    onClick={() => context.setIsOpenNav(false)}
                  >
                    Banner Upload
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button
              variant="contained"
              onClick={() => {
                logout();
                context.setIsOpenNav(false);
              }}
            >
              <IoMdLogOut /> Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;