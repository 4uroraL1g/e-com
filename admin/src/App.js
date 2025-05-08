import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Products from "./pages/Products";
import Category from "./pages/Category/categoryList";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/Products/addProduct";
import EditProduct from "./pages/Products/editProduct";
import CategoryAdd from "./pages/Category/addCategory";
import EditCategory from "./pages/Category/editCategory";
import SubCatAdd from "./pages/Category/addSubCat";
import SubCatList from "./pages/Category/subCategoryList";
import AddProductRAMS from "./pages/Products/addProductRAMS";
import ProductWeight from "./pages/Products/addProductWeight";
import ProductSize from "./pages/Products/addProductSize";
import Orders from "./pages/Orders";
import AddHomeBannerSlide from "./pages/HomeBanner/addHomeBannerSlide";
import HomeBannerSlideList from "./pages/HomeBanner/homeSlideList";
import EditHomeBannerSlide from "./pages/HomeBanner/editSlide";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingBar from "react-top-loading-bar";
import { fetchDataFromApi } from "./utils/api";
import axios from "axios";
import BannersList from "./pages/Banner/addHomeBanner";
import AddBanner from "./pages/Banner/editHomeBanner"; 
import EditBanner from "./pages/Banner/viewBanner"; 
import HomeSideBannersList from "./pages/HomeSideBanners/bannerList"; 
import AddHomeSideBanner from "./pages/HomeSideBanners/addHomeSideBanner";
import EditHomeSideBanner from "./pages/HomeSideBanners/editHomeBanner";
import HomeBottomBannersList from "./pages/HomeBottomBanners/bannerList";
import AddHomeBottomBanner from "./pages/HomeBottomBanners/addHomeBottomBanner";
import EditHomeBottomBanner from "./pages/HomeBottomBanners/editHomeBottomBanner";
import MyAccount from "./pages/myAccount";
import VerifyAccount from "./pages/OtpVerify";

const MyContext = createContext();

const App = () => {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [catData, setCatData] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", userId: "" });
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [baseUrl] = useState("http://localhost:5000");
  const [progress, setProgress] = useState(0);
  const [alertBox, setAlertBox] = useState({ msg: "", error: false, open: false });
  const [selectedLocation, setSelectedLocation] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("");

  // Theme effect
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme !== "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Login effect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } else {
      setIsLogin(false);
    }
  }, [isLogin, localStorage.getItem("user")]);

  // Fetch country list
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      if (res?.data?.data) {
        const arr = res.data.data.map(item => ({
          value: item?.iso2,
          label: item?.country,
        }));
        setCountryList(arr);
      }
    } catch (err) {
      // handle error if needed
    }
  };

  // Fetch categories
  useEffect(() => {
    setProgress(20);
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      setProgress(100);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setAlertBox({ open: false });
  };

  const openNav = () => setIsOpenNav(true);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    theme,
    setTheme,
    alertBox,
    setAlertBox,
    setProgress,
    baseUrl,
    catData,
    fetchCategory,
    setUser,
    user,
    countryList,
    selectedCountry,
    setselectedCountry,
    windowWidth,
    openNav,
    setIsOpenNav,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className="topLoadingBar"
        />
        <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            autoHideDuration={6000}
            severity={alertBox.error ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {isHideSidebarAndHeader !== true && <Header />}
        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <>
              <div
                className={`sidebarOverlay d-none ${isOpenNav ? "show" : ""}`}
                onClick={() => setIsOpenNav(false)}
              ></div>
              <div
                className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""} ${isOpenNav ? "open" : ""}`}
              >
                <Sidebar />
              </div>
            </>
          )}
          <div
            className={`content ${isHideSidebarAndHeader ? "full" : ""} ${isToggleSidebar ? "toggle" : ""}`}
          >
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signUp" exact element={<SignUp />} />
              <Route path="/products" exact element={<Products />} />
              <Route path="/product/details/:id" exact element={<ProductDetails />} />
              <Route path="/product/upload" exact element={<ProductUpload />} />
              <Route path="/product/edit/:id" exact element={<EditProduct />} />
              <Route path="/category" exact element={<Category />} />
              <Route path="/category/add" exact element={<CategoryAdd />} />
              <Route path="/category/edit/:id" exact element={<EditCategory />} />
              <Route path="/subCategory/" exact element={<SubCatList />} />
              <Route path="/subCategory/add" exact element={<SubCatAdd />} />
              <Route path="/productRAMS/add" exact element={<AddProductRAMS />} />
              <Route path="/productWEIGHT/add" exact element={<ProductWeight />} />
              <Route path="/productSIZE/add" exact element={<ProductSize />} />
              <Route path="/orders/" exact element={<Orders />} />
              <Route path="/homeBannerSlide/add" exact element={<AddHomeBannerSlide />} />
              <Route path="/homeBannerSlide/list" exact element={<HomeBannerSlideList />} />
              <Route path="/homeBannerSlide/edit/:id" exact element={<EditHomeBannerSlide />} />
              <Route path="/banners" exact element={<BannersList />} />
              <Route path="/banners/add" exact element={<AddBanner />} />
              <Route path="/banners/edit/:id" exact element={<EditBanner />} />
              <Route path="/homeSideBanners" exact element={<HomeSideBannersList />} />
              <Route path="/homeSideBanners/add" exact element={<AddHomeSideBanner />} />
              <Route path="/homeSideBanners/edit/:id" exact element={<EditHomeSideBanner />} />
              <Route path="/homeBottomBanners" exact element={<HomeBottomBannersList />} />
              <Route path="/homeBottomBanners/add" exact element={<AddHomeBottomBanner />} />
              <Route path="/homeBottomBanners/edit/:id" exact element={<EditHomeBottomBanner />} />
              <Route path="/my-account" exact element={<MyAccount />} />
              <Route path="/verify-account" exact element={<VerifyAccount />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
export { MyContext };