import React from "react";

function Default(props) {
  const { setPromptValue } = props;
  return (
    <div>
      <div className="text-4xl w-full text-center font-bold my-10">ChatGPT</div>
      <div className="itemsrow flex py-4 justify-around my-6 shortcuts">
        <div className="examples flex flex-col justify-center items-center">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <div className="py-4">Examples</div>
          <button
            className="bg-gray-600 hover:bg-gray-700 px-4 py-4 my-2 mx-4 rounded-md w-[16rem] text-sm shortcut-text"
            onClick={() => {
              setPromptValue("Explain quantum computing in simple terms");
            }}
          >
            "Explain quantum computing in simple terms" →
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 px-4 py-4 my-2 mx-4 rounded-md w-[16rem] text-sm shortcut-text"
            onClick={() => {
              setPromptValue(
                "Got any creative ideas for a 10 year old’s birthday?"
              );
            }}
          >
            "Got any creative ideas for a 10 year old’s birthday?" →
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 px-4 py-4 my-2 mx-4 rounded-md w-[16rem] text-sm shortcut-text"
            onClick={() => {
              setPromptValue("How do I make an HTTP request in Javascript?");
            }}
          >
            "How do I make an HTTP request in Javascript?" →
          </button>
        </div>
        <div className="cap flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            ></path>
          </svg>
          <div className="py-4">Capabilities</div>
          <button className="bg-gray-600 px-4 py-4 my-2 cursor-default mx-4 rounded-md w-[16rem] text-sm shortcut-text">
            Remembers what user said earlier in the conversation
          </button>
          <button className="bg-gray-600 px-4 py-4 my-2 cursor-default mx-4 rounded-md w-[16rem] text-sm shortcut-text">
            Allows user to provide follow-up corrections
          </button>
          <button className="bg-gray-600 px-4 py-4 my-2 cursor-default mx-4 rounded-md w-[16rem] text-sm shortcut-text">
            Trained to decline inappropriate requests
          </button>
        </div>
        <div className="lim flex flex-col justify-center items-center">
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div className="py-4">Limitations</div>
          <button className="bg-gray-600 cursor-default px-4 py-4 my-2 mx-4 rounded-md w-[16rem] text-sm shortcut-text">
            May occasionally generate incorrect information
          </button>
          <button className="bg-gray-600 cursor-default px-4 py-4 my-2 mx-4 rounded-md w-[16rem] text-sm shortcut-text">
            May occasionally produce harmful instructions or biased content
          </button>
          <button className="bg-gray-600 cursor-default px-4 py-4 my-2 mx-4 rounded-md w-[16rem] text-sm shortcut-text">
            Limited knowledge of world and events after 2021
          </button>
        </div>
      </div>
    </div>
  );
}

export default Default;
