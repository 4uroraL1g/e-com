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
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/Products/addProduct";
import EditProduct from "./pages/Products/editProduct";
import Category from "./pages/Category/categoryList";
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
  }, []);

  // Fetch country list
  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
  }, []);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      if (res?.data?.data) {
        const arr = res.data.data.map((item) => ({
          value: item?.iso2,
          label: item?.country,
        }));
        setCountryList(arr);
      }
    } catch (err) {
      console.error(err);
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
                className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""} ${
                  isOpenNav ? "open" : ""
                }`}
              >
                <Sidebar />
              </div>
            </>
          )}
          <div
            className={`content ${isHideSidebarAndHeader ? "full" : ""} ${
              isToggleSidebar ? "toggle" : ""
            }`}
          >
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />

              {/* Products */}
              <Route path="/products" element={<Products />} />
              <Route path="/product/details/:id" element={<ProductDetails />} />
              <Route path="/product/upload" element={<ProductUpload />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />

              {/* Categories */}
              <Route path="/category" element={<Category />} />
              <Route path="/category/add" element={<CategoryAdd />} />
              <Route path="/category/edit/:id" element={<EditCategory />} />
              <Route path="/subCategory" element={<SubCatList />} />
              <Route path="/subCategory/add" element={<SubCatAdd />} />

              {/* Orders */}
              <Route path="/orders" element={<Orders />} />

              {/* Banners */}
              <Route path="/banners" element={<BannersList />} />
              <Route path="/banners/add" element={<AddBanner />} />
              <Route path="/banners/edit/:id" element={<EditBanner />} />

              {/* Fallback */}
              <Route path="*" element={<div>404 Page Not Found</div>} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
export { MyContext };