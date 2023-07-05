import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import Default from "../Components/Default";
import Input from "../Components/Input";
import ChatContext from "../context/ChatContext";
import Chat from "../Components/Chat";
import Sidebar from "../Components/Sidebar";
import Modal from "../Components/Modal";

function Home() {
  const context = useContext(ChatContext);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatLoader, setChatLoader] = useState(false);
  const [renderChat, setRenderChat] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const [promptValue, setPromptValue] = useState("");
  const { generateText } = context;

  const onLogout = () => {
    try {
      setLoading(true);
      auth.signOut();
      navigate("/");
      localStorage.clear();
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Can't logout");
    }
  };

  const onApiKey = () => {
    navigate("/modal");
  };

  if (loading) {
    return <Spinner />;
  }

  if (localStorage.getItem("key") == null) {
    return <Modal />;
  }

  return (
    <>
      <Sidebar onLogout={onLogout} onApiKey={onApiKey} />
      <main className="flex justify-center items-center flex-col">
        <div className="flex text-white bg-chatblack justify-center items-center w-[100%]">
          {renderChat === false ? (
            <div className="right  flex items-center justify-center flex-col h-[100%]">
              <Default setPromptValue={setPromptValue} answer={answer} />
            </div>
          ) : (
            <Chat question={question} answer={answer} chatLoader={chatLoader} />
          )}
        </div>
        <Input
          setPromptValue={setPromptValue}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
          promptValue={promptValue}
          generateText={generateText}
          setRenderChat={setRenderChat}
          setChatLoader={setChatLoader}
        />
      </main>
    </>
  );
}

export default Home;
