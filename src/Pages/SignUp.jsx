import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Home from "./Home";
import Modal from "../Components/Modal";

const SignUp = () => {
  const { loggedin, checkingStatus } = useAuthStatus();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const [setpassword, showPassword] = useState(false);

  const handleClick = () => {
    if (setpassword === false) {
      showPassword(true);
    } else {
      showPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password.length < 8) {
        return toast.error("Password length should be more than 8");
      }
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userCredential.user;
      delete formData.password;
      formData.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formData);
      navigate("/modal");
      setLoading(false);
      toast.success("Successfully Signed Up");
    } catch (error) {
      setLoading(false);
      toast.error("Could Not Sign Up!!");
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
    <main className="bg-white text-black w-[100%] h-[100vh] flex justify-center items-center flex-col">
      <header className="flex justify-center items-center mb-16">
        <img
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ0J_WUW3a11ND1TGZzbRPS36dxxKl-R9LOyA7zfacg-6Hi9040"
          className="w-[4.5rem] mt-4"
        />
      </header>
      <div className="flex justify-center items-center flex-col sm:w-[30%] md:w-[50%] lg:w-[25%] w-[70%]">
        <h1 className="text-4xl font-bold text-textColor text-center">
          Create Your Account
        </h1>
        <div className="w-[100%]">
          <form onSubmit={handleSubmit}>
            <input
              id="name"
              value={name}
              onChange={onChange}
              type="text"
              required
              placeholder="Enter your name"
              className="bg-bgColor mt-5 w-full px-2 py-3  rounded-sm  outline-none inp"
            />
            <input
              id="email"
              value={email}
              onChange={onChange}
              type="email"
              required
              placeholder="Email Address"
              className="bg-bgColor mt-5 w-full px-2 py-3  rounded-sm  outline-none inp"
            />
            <div className="relative">
              <input
                type={setpassword ? "text" : "password"}
                className="bg-bgColor mt-5 w-full px-2 py-3  rounded-sm  outline-none inp"
                placeholder="Password"
                id="password"
                min={8}
                value={password}
                onChange={onChange}
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
            <button
              type="submit"
              className="mt-4 bg-btnColor hover:bg-hoverbtnColor text-white font-semibold py-2 px-4 rounded w-full"
            >
              Sign up
            </button>
          </form>
        </div>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-btnColor">
            Login
          </Link>{" "}
        </p>
        <div className="my-4 flex items-center before:border-t  before:flex-1  before:border-gray-800 after:border-t  after:flex-1  after:border-gray-800">
          <p className="text-center text-sm">OR</p>
        </div>
        <OAuth />
      </div>
    </main>
  );
};

export default SignUp;
