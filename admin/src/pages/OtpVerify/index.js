import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../../assets/images/logo.png";
import patern from "../../assets/images/pattern.webp";
import OtpBox from "../../components/OtpBox";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const VerifyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
  }, [context]);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const verify = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const obj = {
      otp,
      email: localStorage.getItem("userEmail"),
    };

    postData(`/api/user/verifyemail`, obj).then((res) => {
      setIsLoading(false);
      if (res?.success) {
        context.setAlertBox({
          open: true,
          error: false,
          msg: res?.message,
        });
        localStorage.removeItem("userEmail");
        history("/login");
      } else {
        context.setAlertBox({
          open: true,
          error: true,
          msg: res?.message,
        });
      }
    });
  };

  return (
    <>
      <img src={patern} alt="Pattern" className="loginPatern" />
      <section className="loginSection">
        <div className="loginBox">
          <Link to="/" className="d-flex align-items-center flex-column logo">
            <img src={Logo} alt="Logo" />
            <span className="ml-2">ECOMMERCE</span>
          </Link>
          <div className="wrapper mt-3 card border text-center">
            <form onSubmit={verify}>
              <img src="/shield.png" alt="Shield" width="80px" />
              <p className="text-center mt-3">
                OTP has been sent to <b>{localStorage.getItem("userEmail")}</b>
              </p>

              <OtpBox length={6} onChange={handleOtpChange} />

              <div className="form-group mt-3 row">
                <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                  {isLoading ? <CircularProgress size={24} /> : "Verify OTP"}
                </Button>
              </div>
            </form>
          </div>

          <div className="wrapper mt-3 card border footer p-3">
            <span className="text-center">
              Didn't receive the OTP?{" "}
              <Link to="/" className="link color ml-2">
                Resend OTP
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyAccount;