import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdCategory } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DashboardBox from "../Dashboard/components/dashboardBox";
import SearchBox from "../../components/SearchBox";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

// Breadcrumb styling
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "brand", label: "BRAND", minWidth: 130 },
  { id: "price", label: "PRICE", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 80 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [categoryVal, setCategoryVal] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalSubCategory, setTotalSubCategory] = useState(0);
  const [isLoadingBar, setIsLoadingBar] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDashboardData();
    fetchProducts(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchDashboardData = () => {
    fetchDataFromApi("/api/products/get/count").then((res) =>
      setTotalProducts(res.productsCount)
    );
    fetchDataFromApi("/api/category/get/count").then((res) =>
      setTotalCategory(res.categoryCount)
    );
    fetchDataFromApi("/api/category/subCat/get/count").then((res) =>
      setTotalSubCategory(res.categoryCount)
    );
  };

  const fetchProducts = (page, rowsPerPage) => {
    fetchDataFromApi(`/api/products/getAll?page=${page + 1}&perPage=${rowsPerPage}`).then(
      (res) => setProductList(res)
    );
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
      fetchProducts(page, rowsPerPage);
    } else {
      fetchDataFromApi(`/api/products/catId?catId=${value}`).then((res) =>
        setProductList(res)
      );
    }
  };

  const deleteProduct = (id) => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo?.email === "rinkuv37@gmail.com") {
      setIsLoadingBar(true);
      deleteData(`/api/products/${id}`).then(() => {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Product Deleted!",
        });
        fetchProducts(page, rowsPerPage);
        setIsLoadingBar(false);
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
      fetchProducts(page, rowsPerPage);
    }
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">Product List</h5>
        <div className="ml-auto d-flex align-items-center">
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Products" deleteIcon={<ExpandMoreIcon />} />
          </Breadcrumbs>
          <Link to="/product/upload">
            <Button className="btn-blue ml-3 pl-3 pr-3">Add Product</Button>
          </Link>
        </div>
      </div>

      <div className="row dashboardBoxWrapperRow dashboardBoxWrapperRowV2 pt-0">
        <div className="col-md-12">
          <div className="dashboardBoxWrapper d-flex">
            <DashboardBox
              color={["#1da256", "#48d483"]}
              icon={<IoMdCart />}
              title="Total Products"
              count={totalProducts}
              grow={true}
            />
            <DashboardBox
              color={["#c012e2", "#eb64fe"]}
              icon={<MdCategory />}
              title="Total Categories"
              count={totalCategory}
            />
            <DashboardBox
              color={["#2c78e5", "#60aff5"]}
              icon={<IoShieldCheckmarkSharp />}
              title="Total Sub Category"
              count={totalSubCategory}
            />
          </div>
        </div>
      </div>

      <div className="card shadow border-0 p-3 mt-4">
        <h3 className="hd">Best Selling Products</h3>
        <div className="row cardFilters mt-2 mb-3">
          <div className="col-md-3">
            <h4>CATEGORY BY</h4>
            <Select
              value={categoryVal}
              onChange={handleChangeCategory}
              displayEmpty
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
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {productList?.products?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="d-flex align-items-center productBox">
                        <div className="imgWrapper">
                          <LazyLoadImage
                            alt="image"
                            effect="blur"
                            className="w-100"
                            src={item.images[0]}
                          />
                        </div>
                        <div className="info pl-3">
                          <Link to={`/product/details/${item.id}`}>
                            <h6>{item?.name}</h6>
                          </Link>
                          <p>{item?.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item?.catName}</TableCell>
                    <TableCell>{item?.subCatName}</TableCell>
                    <TableCell>
                      <span className="badge badge-secondary">{item?.brand}</span>
                    </TableCell>
                    <TableCell>
                      <div style={{ width: "70px" }}>
                        <del className="old">Rs {item?.oldPrice}</del>
                        <span className="new text-danger d-block w-100">
                          Rs {item?.price}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Rating
                        name="read-only"
                        defaultValue={item?.rating}
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
                          onClick={() => deleteProduct(item?.id)}
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
    </div>
  );
};

export default Products;