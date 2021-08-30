import React, { useEffect, useReducer } from "react";
import Message from "./message";
import EditText from "./EditText";
import axios from "axios";
import { useParams } from "react-router";

const reducer = (state, action) => {
  if (action.type === "updateAll") {
    return { roomId: 1, messages: action.payload };
  } else {
    return state;
  }
};

function App({ socket }) {
  const [state, dispatch] = useReducer(reducer, {
    roomId: 1,
    messages: [],
  });

  const getMessages = () => {
    axios
      .get("/api/chat")
      .then((res) => {
        const newMessages = res.data.messages.map(
          ({ _id, userId, msg, socketId }) => {
            return { key: _id, userId: userId, msg: msg, socketId: socketId };
          }
        );
        return newMessages;
      })
      .then((res) => {
        dispatch({ type: "updateAll", payload: res });
      })
      .then(() => {
        // scrolls to the bottom of the chat
        const chatWindow = document.getElementById("chatWindow");
        chatWindow.scrollTo(0, chatWindow.scrollHeight);
      })
      .catch((err) => console.log(err));
  };

  const { username } = useParams();
  useEffect(() => {
    getMessages();
    axios.post("/api/users", {
      username: username,
      socketId: socket.id,
      submissons: [],
      solved: false,
    });
  }, []);

  // handler to send message
  const handleForm = (textBoxValue) => {
    axios
      .post("/api/chat", {
        userId: username,
        msg: textBoxValue,
        socketId: socket.id,
      })
      .then(() => socket.emit("message sent"));
  };

  //socket.io
  socket.on("update messages", getMessages);

  return (
    <div className="h-full w-1/4 float-left shadow-md">
      {/* stream of messages */}
      <div
        id="chatWindow"
        className="h-5/6 bg-white overflow-x-hidden overflow-y-auto border-b-2 border-gray-100"
      >
        {state.messages.map(({ key, userId, msg, socketId }) => {
          return (
            <Message
              key={key}
              msgId={key}
              userId={userId}
              msg={msg}
              socketId={socketId}
            ></Message>
          );
        })}
      </div>

      {/* message box */}
      <EditText msg={""} onSubmitFn={handleForm} reset={true}></EditText>
    </div>
  );
}

export default App;
