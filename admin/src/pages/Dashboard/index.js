import React, { useContext, useEffect, useState } from "react";
import DashboardBox from "./components/dashboardBox";
import { FaUserCircle, FaEye, FaPencilAlt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag, MdDelete } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchDataFromApi, deleteData } from "../../utils/api";
import { MyContext } from "../../App";
import SearchBox from "../../components/SearchBox";

const Dashboard = () => {
  const [productList, setProductList] = useState([]);
  const [categoryVal, setCategoryVal] = useState("all");
  const [salesData, setSalesData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHideSidebarAndHeader(false);
    window.scrollTo(0, 0);
    context.setProgress(40);

    fetchDataFromApi("/api/user/get/count").then((res) =>
      setTotalUsers(res.userCount)
    );

    fetchDataFromApi("/api/orders/get/count").then((res) =>
      setTotalOrders(res.orderCount)
    );

    fetchDataFromApi("/api/products/get/count").then((res) =>
      setTotalProducts(res.productsCount)
    );

    fetchDataFromApi("/api/productReviews/get/count").then((res) =>
      setTotalReviews(res.productsReviews)
    );

    fetchDataFromApi("/api/orders/").then((res) => {
      const total = res.reduce((acc, order) => acc + parseInt(order.amount), 0);
      setTotalSales(total);
    });

    fetchSalesData(year);
    getProducts(page, rowsPerPage);
  }, [year, page, rowsPerPage]);

  const fetchSalesData = (selectedYear) => {
    fetchDataFromApi(`/api/orders/sales?year=${selectedYear}`).then((res) => {
      const sales = res.monthlySales.map((item) => ({
        name: item.month,
        sales: parseInt(item.sale),
      }));
      setSalesData(sales);
    });
  };

  const getProducts = (page, rowsPerPage) => {
    fetchDataFromApi(`/api/products/getAll?page=${page + 1}&perPage=${rowsPerPage}`).then(
      (res) => setProductList(res)
    );
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
    fetchSalesData(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeCategory = (event) => {
    const value = event.target.value;
    setCategoryVal(value);

    if (value === "all") {
      getProducts(page, rowsPerPage);
    } else {
      fetchDataFromApi(`/api/products/catId?catId=${value}`).then((res) =>
        setProductList(res)
      );
    }
  };

  const deleteProduct = (id) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo?.email === "rinkuv37@gmail.com") {
      deleteData(`/api/products/${id}`).then(() => {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Product Deleted!",
        });
        getProducts(page, rowsPerPage);
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Only Admin can delete Product",
      });
    }
  };

  const searchProducts = (keyword) => {
    if (keyword) {
      fetchDataFromApi(`/api/search?q=${keyword}&page=1&perPage=10000`).then(
        (res) => setProductList(res)
      );
    } else {
      getProducts(page, rowsPerPage);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="row dashboardBoxWrapperRow dashboardBoxWrapperRowV2">
        <div className="col-md-12">
          <div className="dashboardBoxWrapper d-flex">
            <DashboardBox
              color={["#1da256", "#48d483"]}
              icon={<FaUserCircle />}
              grow={true}
              title="Total Users"
              count={totalUsers}
            />
            <DashboardBox
              color={["#c012e2", "#eb64fe"]}
              icon={<IoMdCart />}
              title="Total Orders"
              count={totalOrders}
            />
            <DashboardBox
              color={["#2c78e5", "#60aff5"]}
              icon={<MdShoppingBag />}
              title="Total Products"
              count={totalProducts}
            />
            <DashboardBox
              color={["#e1950e", "#f3cd29"]}
              icon={<GiStarsStack />}
              title="Total Reviews"
              count={totalReviews}
            />
          </div>
        </div>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="hd">Best Selling Products</h3>
        <div className="row cardFilters mt-2 mb-3">
          <div className="col-md-3">
            <h4>CATEGORY BY</h4>
            <FormControl size="small" className="w-100">
              <Select
                value={categoryVal}
                onChange={handleChangeCategory}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="w-100"
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                {context.catData?.categoryList?.map((cat, index) => (
                  <MenuItem key={index} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-9 d-flex justify-content-end">
            <SearchBox searchProducts={searchProducts} />
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>PRODUCT</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell>SUB CATEGORY</TableCell>
                  <TableCell>BRAND</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>RATING</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList?.products?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="d-flex align-items-center productBox">
                        <div className="imgWrapper">
                          <LazyLoadImage
                            alt="Product Image"
                            effect="blur"
                            className="w-100"
                            src={item.images[0]}
                          />
                        </div>
                        <div className="info pl-3">
                          <Link to={`/product/details/${item.id}`}>
                            <h6>{item.name}</h6>
                          </Link>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.catName}</TableCell>
                    <TableCell>{item.subCatName}</TableCell>
                    <TableCell>
                      <span className="badge badge-secondary">{item.brand}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <del className="old">Rs {item.oldPrice}</del>
                        <span className="new text-danger">Rs {item.price}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Rating
                        name="read-only"
                        value={item.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </TableCell>
                    <TableCell>
                      <div className="actions d-flex align-items-center">
                        <Link to={`/product/details/${item.id}`}>
                          <Button className="secondary" color="secondary">
                            <FaEye />
                          </Button>
                        </Link>
                        <Link to={`/product/edit/${item.id}`}>
                          <Button className="success" color="success">
                            <FaPencilAlt />
                          </Button>
                        </Link>
                        <Button
                          className="error"
                          color="error"
                          onClick={() => deleteProduct(item.id)}
                        >
                          <MdDelete />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 150, 200]}
            component="div"
            count={productList?.totalPages * rowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <div className="card p-3">
        <div className="d-flex align-items-center">
          <h3 className="hd">Total Sales</h3>
          <div className="ml-auto" style={{ width: "100px" }}>
            <Select
              size="small"
              className="w-100"
              value={year}
              onChange={handleChangeYear}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {[2020, 2021, 2022, 2023, 2024, 2025].map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="chartWrapper mt-4">
          {salesData.length > 0 && (
            <BarChart
              width={900}
              height={400}
              data={salesData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
                tick={{ fontSize: 12 }}
                style={{ fill: context.theme === "dark" ? "white" : "#000" }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                style={{ fill: context.theme === "dark" ? "white" : "#000" }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#071739", color: "white" }}
                labelStyle={{ color: "yellow" }}
                itemStyle={{ color: "cyan" }}
                cursor={{ fill: "white" }}
              />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="sales" fill="#0858f7" />
            </BarChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;