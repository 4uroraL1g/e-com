import React, { useContext, useEffect, useRef, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteImages,
  editData,
  fetchDataFromApi,
  uploadImage,
} from "../../utils/api";
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

const EditUpload = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    brand: "",
    price: null,
    oldPrice: null,
    category: "",
    subCat: "",
    countInStock: null,
    rating: 0,
    isFeatured: null,
    discount: 0,
    productRam: [],
    size: [],
    productWeight: [],
    location: [],
  });
  const [categoryVal, setCategoryVal] = useState("");
  const [subCatVal, setSubCatVal] = useState("");
  const [productRams, setProductRams] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { id } = useParams();
  const history = useNavigate();
  const context = useContext(MyContext);
  const formdata = new FormData();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(`/api/products/${id}`).then((res) => {
      setFormFields({
        name: res.name,
        description: res.description,
        brand: res.brand,
        price: res.price,
        oldPrice: res.oldPrice,
        category: res.category,
        subCat: res.subCat,
        countInStock: res.countInStock,
        rating: res.rating,
        isFeatured: res.isFeatured,
        discount: res.discount,
        productRam: res.productRam,
        size: res.size,
        productWeight: res.productWeight,
        location: res.location,
      });
      setCategoryVal(res.category);
      setSubCatVal(res.subCat);
      setProductRams(res.productRam);
      setProductWeight(res.productWeight);
      setProductSize(res.size);
      setPreviews(res.images);
      setSelectedLocation(res.location);
    });

    fetchDataFromApi("/api/productWeight").then(setProductWeight);
    fetchDataFromApi("/api/productRAMS").then(setProductRams);
    fetchDataFromApi("/api/productSIZE").then(setProductSize);
    setCountryList(context.countryList || []);
  }, [id, context.countryList]);

  const handleInputChange = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (e) => {
    try {
      const files = e.target.files;
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        if (
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

      const res = await uploadImage("/api/category/upload", formdata);
      setPreviews((prev) => [...prev, ...res.images]);
      setUploading(false);
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Images Uploaded!",
      });
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleRemoveImage = (index, imgUrl) => {
    deleteImages(`/api/category/deleteImage?img=${imgUrl}`).then(() => {
      setPreviews((prev) => prev.filter((_, i) => i !== index));
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Image Deleted!",
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formFields.name || !formFields.description || !formFields.price) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please fill all required fields.",
      });
      return;
    }

    setIsLoading(true);

    editData(`/api/products/${id}`, { ...formFields, images: previews }).then(
      () => {
        setIsLoading(false);
        context.setAlertBox({
          open: true,
          error: false,
          msg: "Product updated successfully!",
        });
        history("/products");
      }
    );
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4">
        <h5 className="mb-0">Edit Product</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            label="Products"
            href="#"
            deleteIcon={<ExpandMoreIcon />}
          />
          <StyledBreadcrumb
            label="Edit Product"
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="card p-4 mt-0">
          <h5 className="mb-4">Basic Information</h5>
          <div className="form-group">
            <h6>PRODUCT NAME</h6>
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <h6>DESCRIPTION</h6>
            <textarea
              rows={5}
              name="description"
              value={formFields.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <h6>CATEGORY</h6>
                <Select
                  value={categoryVal}
                  onChange={(e) => setCategoryVal(e.target.value)}
                  displayEmpty
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {context.catData?.categoryList?.map((cat, index) => (
                    <MenuItem key={index} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <h6>PRICE</h6>
                <input
                  type="number"
                  name="price"
                  value={formFields.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4 mt-0">
          <h5 className="mb-4">Media And Published</h5>
          <div className="imgUploadBox d-flex align-items-center">
            {previews.map((img, index) => (
              <div className="uploadBox" key={index}>
                <span
                  className="remove"
                  onClick={() => handleRemoveImage(index, img)}
                >
                  <IoCloseSharp />
                </span>
                <div className="box">
                  <LazyLoadImage
                    alt="image"
                    effect="blur"
                    className="w-100"
                    src={img}
                  />
                </div>
              </div>
            ))}
            <div className="uploadBox">
              {uploading ? (
                <div className="progressBar text-center d-flex align-items-center justify-content-center flex-column">
                  <CircularProgress />
                  <span>Uploading...</span>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    name="images"
                  />
                  <div className="info">
                    <FaRegImages />
                    <h5>Image Upload</h5>
                  </div>
                </>
              )}
            </div>
          </div>
          <Button type="submit" className="btn-blue btn-lg btn-big w-100">
            <FaCloudUploadAlt /> &nbsp;
            {isLoading ? (
              <CircularProgress color="inherit" className="loader" />
            ) : (
              "PUBLISH AND VIEW"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUpload;