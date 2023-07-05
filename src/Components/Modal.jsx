import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ChatContext from "../context/ChatContext";
import { getAuth } from "firebase/auth";
import Spinner from "./Spinner";

function Modal() {
  const context = useContext(ChatContext);
  const [loading, setLoading] = useState(false);
  const { setKey } = context;
  const [Apikey, setApiKey] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Apikey.length >= 51) {
      localStorage.setItem("key", Apikey);
      setKey(localStorage.getItem("key"));
      toast.success("API Key set successfully");
      navigate("/home");
      return;
    }
    return toast.error("API key length should be at least 51");
  };

  const auth = getAuth();
  const logout = () => {
    try {
      setLoading(true);
      auth.signOut();
      navigate("/");
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Can't logout");
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="flex justify-center items-center flex-col">
      <div className="container sm:w-[30%] md:w-[50%] lg:w-[30%] w-[70%] my-52">
        <h1 className="text-center text-white font-semibold text-4xl mb-2">
          Enter your OpenAI API Key
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="my-5 bg-transparent border border-gray-200 w-full rounded-md  py-1.5 outline-none text-white px-2"
            value={Apikey}
            onChange={onChange}
          />
          <button
            type="submit"
            className="mt-4 bg-btnColor hover:bg-hoverbtnColor mx-2 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Set API Key
          </button>
        </form>
        <button
          type="submit"
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-800 mx-2 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}

export default Modal;
