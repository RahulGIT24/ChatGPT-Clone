import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Home from "../Pages/Home";
import Modal from "../Components/Modal";

function Login() {
  const { loggedin, checkingStatus } = useAuthStatus();
  const [setpassword, showPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = () => {
    if (setpassword === false) {
      showPassword(true);
    } else {
      showPassword(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Performing user authentication
      const auth = getAuth();

      // Signing with credentials
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If credentials are correct
      if (userCredentials.user) {
        toast.success("Welcome Back!");
        setLoading(false);
        navigate("/modal");
      } else {
        setLoading(false);
        toast.error("Invalid user credentials");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Invalid user credemtials");
    }
  };

  if (loading || checkingStatus) {
    return <Spinner />;
  }

  if (
    loggedin === true &&
    checkingStatus === false &&
    localStorage.getItem("key") != null
  ) {
    return <Home />;
  } else if (
    loggedin === true &&
    checkingStatus === false &&
    localStorage.getItem("key") == null
  ) {
    return <Modal />;
  }

  return (
    <main className="bg-white text-black w-full h-[100vh] flex justify-center items-center flex-col">
      <header className="flex justify-center items-center mb-16">
        <img
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ0J_WUW3a11ND1TGZzbRPS36dxxKl-R9LOyA7zfacg-6Hi9040"
          className="w-[4.5rem] mt-4"
        />
      </header>
      <div className="flex justify-center items-center flex-col sm:w-[30%] md:w-[50%] lg:w-[25%] w-[70%] ">
        <h1 className="text-4xl font-bold text-textColor text-center">
          Welcome Back
        </h1>
        <div className="w-[100%]">
          <form onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={onChange}
              id="email"
              type="email"
              required
              placeholder="Email Address"
              className="bg-bgColor mt-5  px-2 py-3  rounded-sm  outline-none inp w-full"
            />

            <div className="relative">
              <input
                value={password}
                onChange={onChange}
                type={setpassword ? "text" : "password"}
                className="bg-bgColor mt-5  w-full px-2 py-3  rounded-sm  outline-none inp"
                placeholder="Password"
                id="password"
                min={8}
                required
              />
              {setpassword ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="absolute right-2 top-9 cursor-pointer text-xl "
                  onClick={handleClick}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className=" absolute right-2 top-9 cursor-pointer text-xl"
                  onClick={handleClick}
                />
              )}
            </div>
            <div className="mt-2">
              <p className="text-btnColor text-center">
                <Link to={"/forgot-password"}>Forgot Password?</Link>
              </p>
            </div>
            <button
              type="submit"
              className="mt-4 bg-btnColor hover:bg-hoverbtnColor mx-2 text-white font-semibold py-2 px-4 rounded w-full"
            >
              Sign in
            </button>
          </form>
        </div>
        <p className="text-center text-sm mt-2">
          Create an account?{" "}
          <Link to="/signup" className="text-btnColor">
            Sign Up
          </Link>{" "}
        </p>
        <div className="my-4 flex  items-center before:border-t  before:flex-1  before:border-gray-800 after:border-t  after:flex-1  after:border-gray-800">
          <p className="text-center text-sm mx-4">OR</p>
        </div>
        <OAuth />
      </div>
    </main>
  );
}

export default Login;
