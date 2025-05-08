import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Rating from "@mui/material/Rating";
import { emphasize, styled } from "@mui/material/styles";
import { MdBrandingWatermark, MdFilterVintage, MdRateReview } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
import UserAvatarImgComponent from "../../components/UserAvatarImg";
import ProductZoom from "../../components/ProductZoom";
import { fetchDataFromApi } from "../../utils/api";

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

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [reviewsData, setReviewsData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFromApi(`/api/products/${id}`).then((res) => setProductData(res));
    fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) =>
      setReviewsData(res)
    );
  }, [id]);

  return (
    <>
      <div className="right-content w-100 productDetails">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product View</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Products" component="a" href="#" />
            <StyledBreadcrumb label="Product View" />
          </Breadcrumbs>
        </div>

        <div className="card productDetailsSection">
          <div className="row">
            <div className="col-md-5">
              <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Product Gallery</h6>
                <ProductZoom
                  images={productData?.images}
                  discount={productData?.discount}
                />
              </div>
            </div>

            <div className="col-md-7">
              <div className="pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-4">Product Details</h6>
                <h4>{productData?.name}</h4>

                <div className="productInfo mt-4">
                  <ProductInfoRow
                    icon={<MdBrandingWatermark />}
                    label="Brand"
                    value={productData?.brand}
                  />
                  <ProductInfoRow
                    icon={<BiSolidCategoryAlt />}
                    label="Category"
                    value={productData?.catName}
                  />
                  {productData?.productRam?.length > 0 && (
                    <ProductInfoRow
                      icon={<MdFilterVintage />}
                      label="RAM"
                      value={productData?.productRam}
                      isList
                    />
                  )}
                  {productData?.size?.length > 0 && (
                    <ProductInfoRow
                      icon={<MdFilterVintage />}
                      label="Size"
                      value={productData?.size}
                      isList
                    />
                  )}
                  {productData?.productWeight?.length > 0 && (
                    <ProductInfoRow
                      icon={<MdFilterVintage />}
                      label="Weight"
                      value={productData?.productWeight}
                      isList
                    />
                  )}
                  <ProductInfoRow
                    icon={<MdRateReview />}
                    label="Review"
                    value={`(${reviewsData?.length}) Review`}
                  />
                  <ProductInfoRow
                    icon={<BsPatchCheckFill />}
                    label="Published"
                    value={productData?.dateCreated}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h6 className="mt-4 mb-3">Product Description</h6>
            <p>{productData?.description}</p>

            {reviewsData?.length > 0 && (
              <>
                <h6 className="mt-4 mb-4">Customer Reviews</h6>
                <div className="reviewsSection">
                  {reviewsData.map((review, index) => (
                    <ReviewRow key={index} review={review} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ProductInfoRow = ({ icon, label, value, isList }) => (
  <div className="row mb-2">
    <div className="col-sm-3 d-flex align-items-center">
      <span className="icon">{icon}</span>
      <span className="name">{label}</span>
    </div>
    <div className="col-sm-9">
      :{" "}
      {isList ? (
        <ul className="list list-inline tags sml">
          {value.map((item, index) => (
            <li className="list-inline-item" key={index}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span>{value}</span>
      )}
    </div>
  </div>
);

const ReviewRow = ({ review }) => (
  <div className="reviewsRow">
    <div className="row">
      <div className="col-sm-7 d-flex">
        <div className="d-flex flex-column">
          <div className="userInfo d-flex align-items-center mb-3">
            <UserAvatarImgComponent
              img="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
              lg={true}
            />
            <div className="info pl-3">
              <h6>{review?.customerName}</h6>
              <span>{review?.dateCreated}</span>
            </div>
          </div>
          <Rating name="read-only" value={review?.customerRating} readOnly />
        </div>
      </div>
      <p className="mt-3">{review?.review}</p>
    </div>
  </div>
);

export default ProductDetails;