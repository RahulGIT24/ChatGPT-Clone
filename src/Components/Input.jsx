import React from "react";
import SendIcon from "@mui/icons-material/Send";

function Input(props) {
  const {
    promptValue,
    setPromptValue,
    generateText,
    setRenderChat,
    setQuestion,
    setAnswer,
    setChatLoader,
  } = props;

  const onChange = (e) => {
    setPromptValue(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setChatLoader(true);
    setRenderChat(true);
    setQuestion(promptValue);
    let a = await generateText(promptValue);
    setAnswer(a);
    setChatLoader(false);
  };

  return (
    <>
      <div className="input text-center flex justify-center items-center flex-col">
        <form
          className="flex justify-center items-center flex-col"
          onSubmit={onSubmit}
        >
          <div className="relative ml[-42px]">
            <input
              value={promptValue}
              onChange={onChange}
              className="dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] shadow-[0_0_10px_rgba(0,0,0,0.10)] p-2 bg-transparent overflow-y-hidden rounded-md outline-none w-[28rem]"
              placeholder="Send a message"
              required
            />
            <button
            className="absolute right-[1rem] top-[0.25rem]"
            type="submit"
            disabled={promptValue.length === 0}
          >
            <SendIcon />
          </button>
          </div>
        </form>
        <div className="text-sm text-center mt-7">
          <p className="opacity-70">
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts.
            <a
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
              target="_blank"
              className="underline"
            >
              {" "}
              ChatGPT May 24 Version
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Input;
