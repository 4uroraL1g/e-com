import React, { useContext, useEffect, useState } from "react";
import {
  fetchDataFromApi,
  editData,
} from "../../utils/api";
import {
  Breadcrumbs,
  Chip,
  Dialog,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { MdClose, MdOutlineEmail, MdOutlineCurrencyRupee, MdOutlineDateRange } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { emphasize, styled } from "@mui/material/styles";
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
  { id: "orderId", label: "Order Id", minWidth: 150 },
  { id: "paymentId", label: "Payment Id", minWidth: 100 },
  { id: "products", label: "Products", minWidth: 150 },
  { id: "name", label: "Name", minWidth: 130 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 150 },
  { id: "address", label: "Address", minWidth: 200 },
  { id: "pincode", label: "Pincode", minWidth: 120 },
  { id: "totalAmount", label: "Total Amount", minWidth: 120 },
  { id: "email", label: "Email", minWidth: 120 },
  { id: "userId", label: "User Id", minWidth: 120 },
  { id: "orderStatus", label: "Order Status", minWidth: 120 },
  { id: "dateCreated", label: "Date Created", minWidth: 150 },
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [statusVal, setStatusVal] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi("/api/orders").then((res) => {
      setOrders(res);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const showProducts = (id) => {
    fetchDataFromApi(`/api/orders/${id}`).then((res) => {
      setIsOpenModal(true);
      setProducts(res.products);
    });
  };

  const handleChangeStatus = (e, orderId) => {
    setStatusVal(e.target.value);
    setIsLoading(true);
    context.setProgress(40);

    fetchDataFromApi(`/api/orders/${orderId}`).then((res) => {
      const updatedOrder = {
        ...res,
        status: e.target.value,
      };

      editData(`/api/orders/${orderId}`, updatedOrder).then(() => {
        fetchDataFromApi("/api/orders").then((res) => {
          setOrders(res);
          context.setProgress(100);
          setIsLoading(false);
        });
      });
    });
  };

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Orders List</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<MdOutlineDateRange fontSize="small" />}
            />
            <StyledBreadcrumb label="Orders" />
          </Breadcrumbs>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.reverse()
                    ?.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{order?._id}</TableCell>
                        <TableCell>{order?.paymentId}</TableCell>
                        <TableCell
                          className="cursor"
                          onClick={() => showProducts(order?._id)}
                        >
                          View Products
                        </TableCell>
                        <TableCell>{order?.name}</TableCell>
                        <TableCell>
                          <FaPhoneAlt /> {order?.phoneNumber}
                        </TableCell>
                        <TableCell>{order?.address}</TableCell>
                        <TableCell>{order?.pincode}</TableCell>
                        <TableCell>
                          <MdOutlineCurrencyRupee /> {order?.amount}
                        </TableCell>
                        <TableCell>
                          <MdOutlineEmail /> {order?.email}
                        </TableCell>
                        <TableCell>{order?.userId}</TableCell>
                        <TableCell>
                          <Select
                            value={order?.status || statusVal}
                            onChange={(e) => handleChangeStatus(e, order?._id)}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            size="small"
                            className="w-100"
                            disabled={isLoading}
                          >
                            <MenuItem value={null}>
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="confirm">Confirm</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>{order?.date?.split("T")[0]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={orders?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>

      <Dialog open={isOpenModal} className="productModal">
        <Button className="close_" onClick={() => setIsOpenModal(false)}>
          <MdClose />
        </Button>
        <h4 className="mb-1 font-weight-bold pr-5 mb-4">Products</h4>
        <div className="table-responsive orderTable">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Product Id</th>
                <th>Product Title</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.productId}</td>
                  <td>{item?.productTitle?.substr(0, 30) + "..."}</td>
                  <td>
                    <div className="img">
                      <img src={item?.image} alt="Product" />
                    </div>
                  </td>
                  <td>{item?.quantity}</td>
                  <td>{item?.price}</td>
                  <td>{item?.subTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </>
  );
};

export default Orders;
