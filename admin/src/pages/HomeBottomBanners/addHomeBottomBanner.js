import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { deleteData, deleteImages, postData, uploadImage, fetchDataFromApi } from "../../utils/api";
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

const AddBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formFields, setFormFields] = useState({
    images: [],
    catName: null,
    catId: null,
    subCat: null,
    subCatId: null,
    subCatName: null,
  });
  const [previews, setPreviews] = useState([]);
  const [categoryVal, setCategoryVal] = useState(null);
  const [subCatVal, setSubCatVal] = useState(null);
  const [subCatData, setSubCatData] = useState([]);

  const formdata = new FormData();
  const history = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/imageUpload").then((res) => {
      res?.forEach((item) => {
        item?.images?.forEach((img) => {
          deleteImages(`/api/homeBottomBanners/deleteImage?img=${img}`).then(() => {
            deleteData("/api/imageUpload/deleteAllImages");
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    const subCatArr = [];
    context.catData?.categoryList?.forEach((cat) => {
      cat?.children?.forEach((subCat) => {
        subCatArr.push(subCat);
      });
    });
    setSubCatData(subCatArr);
  }, [context.catData]);

  const handleFileUpload = async (e, apiEndPoint) => {
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

      const res = await uploadImage(apiEndPoint, formdata);
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

  const removeImage = (index, imgUrl) => {
    deleteImages(`/api/homeBottomBanners/deleteImage?img=${imgUrl}`).then(() => {
      setPreviews((prev) => prev.filter((_, i) => i !== index));
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Image Deleted!",
      });
    });
  };

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
    setFormFields((prev) => ({
      ...prev,
      catId: event.target.value,
    }));
  };

  const handleChangeSubCategory = (event) => {
    setSubCatVal(event.target.value);
    setFormFields((prev) => ({
      ...prev,
      subCatId: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (previews.length === 0) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please upload at least one image.",
      });
      return;
    }

    setIsLoading(true);
    const payload = { ...formFields, images: previews };

    postData("/api/homeBottomBanners/create", payload).then(() => {
      setIsLoading(false);
      context.fetchCategory();
      deleteData("/api/imageUpload/deleteAllImages");
      history("/homeBottomBanners");
    });
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 mt-2">
        <h5 className="mb-0">Add Home Bottom Banner</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            label="Home Banners"
            href="#"
            deleteIcon={<ExpandMoreIcon />}
          />
          <StyledBreadcrumb
            label="Add Home Banner"
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4 mt-0">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <h6>CATEGORY</h6>
                    <Select
                      value={categoryVal}
                      onChange={handleChangeCategory}
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

                <div className="col-md-6">
                  <div className="form-group">
                    <h6>SUB CATEGORY</h6>
                    <Select
                      value={subCatVal}
                      onChange={handleChangeSubCategory}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {subCatData?.map((subCat, index) => (
                        <MenuItem key={index} value={subCat._id}>
                          {subCat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="imagesUploadSec">
                <h5 className="mb-4">Media And Published</h5>
                <div className="imgUploadBox d-flex align-items-center">
                  {previews.map((img, index) => (
                    <div className="uploadBox" key={index}>
                      <span
                        className="remove"
                        onClick={() => removeImage(index, img)}
                      >
                        <IoCloseSharp />
                      </span>
                      <div className="box">
                        <LazyLoadImage
                          alt="Uploaded Image"
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
                          onChange={(e) =>
                            handleFileUpload(e, "/api/homeBottomBanners/upload")
                          }
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

                <Button
                  type="submit"
                  className="btn-blue btn-lg btn-big w-100 mt-4"
                >
                  <FaCloudUploadAlt /> &nbsp;
                  {isLoading ? (
                    <CircularProgress color="inherit" className="loader" />
                  ) : (
                    "PUBLISH AND VIEW"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;