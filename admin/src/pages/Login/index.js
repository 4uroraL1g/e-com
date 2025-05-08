import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { MyContext } from "../../App";
import { postData, editData } from "../../utils/api";
import { firebaseApp } from "../../firebase";
import Logo from "../../assets/images/logo.png";
import patern from "../../assets/images/pattern.webp";
import googleIcon from "../../assets/images/googleIcon.png";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenVerifyEmailBox, setIsOpenVerifyEmailBox] = useState(false);
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    isAdmin: true,
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [context, navigate]);

  const handleInputChange = (e) => {
    setFormFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!formFields.email) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Email cannot be blank!",
      });
      return;
    }

    if (!isOpenVerifyEmailBox && !formFields.password) {
      context.setAlertBox({
        open: true,
        error: true,
        msg: "Password cannot be blank!",
      });
      return;
    }

    setIsLoading(true);

    if (!isOpenVerifyEmailBox) {
      postData("/api/user/signin", formFields).then((res) => {
        if (!res.error) {
          localStorage.setItem("token", res.token);

          if (res.user?.isAdmin) {
            const user = {
              name: res.user?.name,
              email: res.user?.email,
              userId: res.user?.id,
              isAdmin: res.user?.isAdmin,
            };

            localStorage.setItem("user", JSON.stringify(user));
            context.setAlertBox({
              open: true,
              error: false,
              msg: "User Login Successfully!",
            });

            setTimeout(() => {
              context.setIsLogin(true);
              navigate("/dashboard");
              setIsLoading(false);
            }, 2000);
          } else {
            context.setAlertBox({
              open: true,
              error: true,
              msg: "You are not an admin.",
            });
            setIsLoading(false);
          }
        } else {
          if (!res.isVerify) {
            setIsOpenVerifyEmailBox(true);
          }
          context.setAlertBox({
            open: true,
            error: true,
            msg: res.msg,
          });
          setIsLoading(false);
        }
      });
    } else {
      localStorage.setItem("userEmail", formFields.email);
      postData("/api/user/verifyAccount/resendOtp", { email: formFields.email }).then((res) => {
        if (res?.otp) {
          editData(`/api/user/verifyAccount/emailVerify/${res.existingUserId}`, {
            email: formFields.email,
            otp: res.otp,
          }).then(() => {
            setTimeout(() => {
              setIsLoading(true);
              navigate("/verify-account");
            }, 2000);
          });
        }
      });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const fields = {
          name: user.providerData[0].displayName,
          email: user.providerData[0].email,
          password: null,
          images: user.providerData[0].photoURL,
          phone: user.providerData[0].phoneNumber,
          isAdmin: true,
        };

        postData("/api/user/authWithGoogle", fields).then((res) => {
          if (!res.error) {
            localStorage.setItem("token", res.token);

            const user = {
              name: res.user?.name,
              email: res.user?.email,
              userId: res.user?.id,
            };

            localStorage.setItem("user", JSON.stringify(user));
            context.setAlertBox({
              open: true,
              error: false,
              msg: res.msg,
            });

            setTimeout(() => {
              context.setIsLogin(true);
              navigate("/dashboard");
            }, 2000);
          } else {
            context.setAlertBox({
              open: true,
              error: true,
              msg: res.msg,
            });
            setIsLoading(false);
          }
        });
      })
      .catch((error) => {
        context.setAlertBox({
          open: true,
          error: true,
          msg: error.message,
        });
      });
  };

  return (
    <>
      <img src={patern} className="loginPatern" alt="Pattern" />
      <section className="loginSection">
        <div className="loginBox">
          <Link to="/" className="d-flex align-items-center flex-column logo">
            <img src={Logo} alt="Logo" />
            <span className="ml-2">ECOMMERCE</span>
          </Link>
          <div className="wrapper mt-3 card border">
            {isOpenVerifyEmailBox && <h2 className="mb-4">Verify Email</h2>}

            <form onSubmit={handleSignIn}>
              <div
                className={`form-group position-relative ${
                  inputIndex === 0 && "focus"
                }`}
              >
                <span className="icon">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email"
                  onFocus={() => setInputIndex(0)}
                  onBlur={() => setInputIndex(null)}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>

              {!isOpenVerifyEmailBox ? (
                <>
                  <div
                    className={`form-group position-relative ${
                      inputIndex === 1 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <RiLockPasswordFill />
                    </span>
                    <input
                      type={isShowPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      onFocus={() => setInputIndex(1)}
                      onBlur={() => setInputIndex(null)}
                      name="password"
                      onChange={handleInputChange}
                    />
                    <span
                      className="toggleShowPassword"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                  </div>

                  <div className="form-group">
                    <Button
                      type="submit"
                      className="btn-blue btn-lg w-100 btn-big"
                    >
                      {isLoading ? <CircularProgress /> : "Sign In"}
                    </Button>
                  </div>

                  <div className="form-group text-center mb-0">
                    <Link to="/forgot-password" className="link">
                      FORGOT PASSWORD
                    </Link>
                    <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                      <span className="line"></span>
                      <span className="txt">or</span>
                      <span className="line"></span>
                    </div>

                    <Button
                      variant="outlined"
                      className="w-100 btn-lg btn-big loginWithGoogle"
                      onClick={handleGoogleSignIn}
                    >
                      <img src={googleIcon} width="25px" alt="Google Icon" /> &nbsp; Sign In with
                      Google
                    </Button>
                  </div>
                </>
              ) : (
                <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                  {isLoading ? <CircularProgress /> : "Verify Email"}
                </Button>
              )}
            </form>
          </div>

          {!isOpenVerifyEmailBox && (
            <div className="wrapper mt-3 card border footer p-3">
              <span className="text-center">
                Don't have an account?
                <Link to="/signUp" className="link color ml-2">
                  Register
                </Link>
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Login;