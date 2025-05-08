import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IoMdCloudUpload } from "react-icons/io";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  uploadImage,
} from "../../utils/api";
import { MyContext } from "../../App";
import NoUserImg from "../../assets/images/no-user.jpg";
import CircularProgress from "@mui/material/CircularProgress";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MyAccount = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [userData, setUserData] = useState([]);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    images: [],
  });
  const [fields, setFields] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const context = useContext(MyContext);
  const history = useNavigate();
  const formdata = new FormData();

  useEffect(() => {
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      history("/signIn");
    }

    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/user/${user?.userId}`).then((res) => {
      setUserData(res);
      setPreviews(res.images || []);
      setFormFields({
        name: res.name,
        email: res.email,
        phone: res.phone,
      });
    });
  }, [history]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeInput = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeInput2 = (e) => {
    setFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            files[i].type
          )
        ) {
          formdata.append("images", files[i]);
        } else {
          context.setAlertBox({
            open: true,
            error: true,
            msg: "Please select a valid JPG or PNG image file.",
          });
          setUploading(false);
          return;
        }
      }

      uploadImage(apiEndPoint, formdata).then((res) => {
        setPreviews((prev) => [...prev, ...res.images]);
        setUploading(false);
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Images Uploaded!",
        });
      });
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const editUser = (e) => {
    e.preventDefault();

    if (
      formFields.name &&
      formFields.email &&
      formFields.phone &&
      previews.length > 0
    ) {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      editData(`/api/user/${user?.userId}`, {
        ...formFields,
        images: previews,
      }).then(() => {
        setIsLoading(false);
        context.setAlertBox({
          open: true,
          error: false,
          msg: "User updated successfully!",
        });
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details.",
      });
    }
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (
      fields.oldPassword &&
      fields.password &&
      fields.confirmPassword &&
      fields.password === fields.confirmPassword
    ) {
      const user = JSON.parse(localStorage.getItem("user"));

      editData(`/api/user/changePassword/${user.userId}`, {
        ...formFields,
        password: fields.oldPassword,
        newPass: fields.password,
      }).then(() => {
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Password changed successfully!",
        });
      });
    } else {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all the details or ensure passwords match.",
      });
    }
  };

  return (
    <section className="section myAccountPage right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">My Account</h5>
      </div>

      <Box sx={{ width: "100%" }} className="myAccBox card border-0 pl-3 pr-3">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Edit Profile" {...a11yProps(0)} />
            <Tab label="Change Password" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <form onSubmit={editUser}>
            <div className="row">
              <div className="col-md-4">
                <div className="userImage d-flex align-items-center justify-content-center">
                  {uploading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {previews.length > 0 ? (
                        previews.map((img, index) => (
                          <img src={img} key={index} alt="User" />
                        ))
                      ) : (
                        <img src={NoUserImg} alt="No User" />
                      )}
                      <div className="overlay d-flex align-items-center justify-content-center">
                        <IoMdCloudUpload />
                        <input
                          type="file"
                          onChange={(e) => onChangeFile(e, "/api/user/upload")}
                          name="images"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        label="Name"
                        variant="outlined"
                        className="w-100"
                        name="name"
                        onChange={changeInput}
                        value={formFields.name}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        label="Email"
                        disabled
                        variant="outlined"
                        className="w-100"
                        name="email"
                        onChange={changeInput}
                        value={formFields.email}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <TextField
                        label="Phone"
                        variant="outlined"
                        className="w-100"
                        name="phone"
                        onChange={changeInput}
                        value={formFields.phone}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <Button type="submit" className="btn-blue btn-lg btn-big">
                    {isLoading ? <CircularProgress /> : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <form onSubmit={changePassword}>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <TextField
                        label="Old Password"
                        variant="outlined"
                        className="w-100"
                        name="oldPassword"
                        onChange={changeInput2}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <TextField
                        label="New Password"
                        variant="outlined"
                        className="w-100"
                        name="password"
                        onChange={changeInput2}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <TextField
                        label="Confirm Password"
                        variant="outlined"
                        className="w-100"
                        name="confirmPassword"
                        onChange={changeInput2}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <Button type="submit" className="btn-blue bg-red btn-lg btn-big">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CustomTabPanel>
      </Box>
    </section>
  );
};

export default MyAccount;
