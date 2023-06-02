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
  const { generateText, Loading } = context;

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

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Sidebar onLogout={onLogout} />
      <div className="flex  text-white bg-chatblack justify-center items-center">
        <div className="right  flex items-center justify-center flex-col h-[100%]">
          {renderChat === false ? (
            <Default setPromptValue={setPromptValue} answer={answer} />
          ) : (
            <Chat question={question} answer={answer} chatLoader={chatLoader} />
          )}
          <Input
            setPromptValue={setPromptValue}
            setQuestion={setQuestion}
            setAnswer={setAnswer}
            promptValue={promptValue}
            generateText={generateText}
            setRenderChat={setRenderChat}
            setChatLoader={setChatLoader}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
