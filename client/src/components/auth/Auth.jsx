import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/authActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   if(isSignUp){
    dispatch(signUp(formData, navigate))
   }else{
    dispatch(signIn(formData, navigate))
   }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsIgnUp) => !prevIsIgnUp);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign was unsuccessful, try again later! ");
  };

  return (
    <section className="w-[95%] md:w-4/5 py-28 lg:w-2/5 mx-auto  lg:py-24">
      {/* main div */}
      <div className="w-full border border-gray-300 bg-white p-3  rounded-md">
        {/* container div */}
        <div>
          <div className="flex flex-col justify-center items-center gap-2 font-semibold text-lg text-secondary-500">
            <FaUserCircle size={40} />
            {isSignUp ? `Sign Up` : `Sign In`}
          </div>
          <form action="" onSubmit={handleSubmit} className="w-full">
            {isSignUp && (
              <>
                <div className="flex gap-3 mt-3">
                  <div className="w-1/2">
                    <label className="labelStyles" htmlFor="">
                      First Name
                    </label>

                    <input
                      className="inputStyles"
                      type="text"
                      name="firstName"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="labelStyles" htmlFor="">
                      Last Name
                    </label>
                    <input
                      className="inputStyles"
                      type="text"
                      name="lastName"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <label className="mb-1 " htmlFor="">
              Email
            </label>
            <input
              className="inputStyles"
              required
              type="email"
              name="email"
              onChange={handleChange}
            />
            <label className="labelStyles" htmlFor="">
              Password
            </label>
            <input
              className="inputStyles"
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
            {isSignUp && (
              <>
                <label className="labelStyles" htmlFor="">
                  Confirm Password
                </label>
                <input
                  className="inputStyles"
                  type="password"
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                />
              </>
            )}
            <div type="submit" className="mb-2 flex justify-center">
              {isSignUp ? <button>Sign Up</button> : <button>Sign In</button>}
            </div>
            <div className="my-2 flex justify-center">
              <GoogleLogin
                clientId="1058673718907-pmsjjov5jl971iuufelepcehd129tl9e.apps.googleusercontent.com"
                render={(renderProps) => (
                  <div
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="flex items-center gap-2 my-2 font-semibold bg-transparent hover:bg-secondary-500 text-blue-dark  hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded hover:cursor-pointer"
                  >
                    <FcGoogle size={25} />
                    Google Sign in
                  </div>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </div>
          </form>
          <div className="my-3" onClick={switchMode}>
            {isSignUp ? (
              <h3 className="underline text-secondary-500 font-semibold hover:cursor-pointer">
                Already have an account? Sign in
              </h3>
            ) : (
              <h3 className="underline text-secondary-500 font-semibold hover:cursor-pointer">
                Don't have an account? Sign Up
              </h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
