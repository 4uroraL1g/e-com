import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../app";

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

const EditSubCat = () => {
  const [categoryVal, setCategoryVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    category: "",
    subCat: "",
  });

  const { id } = useParams();
  const history = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi(`/api/subCat/${id}`).then((res) => {
      setCategoryVal(res.category.id);
      setFormFields({
        category: res.category.id,
        subCat: res.subCat,
      });
    });
  }, [id]);

  const handleInputChange = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    const selectedCategoryId = event.target.value;
    setCategoryVal(selectedCategoryId);
    setFormFields((prev) => ({
      ...prev,
      category: selectedCategoryId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formFields.category) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please select a category",
      });
      return;
    }

    if (!formFields.subCat) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Please enter a sub-category",
      });
      return;
    }

    setIsLoading(true);
    editData(`/api/subCat/${id}`, formFields).then(() => {
      setIsLoading(false);
      context.fetchCategory();
      context.fetchSubCategory();
      history("/subCategory");
    });
  };

  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 mt-2">
        <h5 className="mb-0">Edit Sub Category</h5>
        <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Dashboard"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb
            component="a"
            label="Edit Sub Category"
            href="#"
            deleteIcon={<ExpandMoreIcon />}
          />
          <StyledBreadcrumb
            label="Edit Category"
            deleteIcon={<ExpandMoreIcon />}
          />
        </Breadcrumbs>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4 mt-0">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>CATEGORY</h6>
                    <Select
                      value={categoryVal}
                      onChange={handleChangeCategory}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className="w-100"
                      name="category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {context.catData?.categoryList?.map((cat, index) => (
                        <MenuItem
                          className="text-capitalize"
                          value={cat.id}
                          key={index}
                        >
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>SUB CATEGORY</h6>
                    <input
                      type="text"
                      name="subCat"
                      value={formFields.subCat}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="btn-blue btn-lg btn-big w-100"
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
      </form>
    </div>
  );
};

export default EditSubCat;