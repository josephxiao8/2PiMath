import pfp from "../pictures/2Pipfp.png";
import React, { useEffect, useState } from "react";
import Latex from "react-latex";
import "bootstrap-icons/font/bootstrap-icons.css";
const CryptoJS = require("crypto-js");

const Message = ({ msgId, userId, msg, socketId }) => {
  const [source, setSource] = useState("");
  const hash = CryptoJS.MD5(socketId);
  useEffect(() => {
    if (socketId === "1") {
      setSource(pfp);
    } else {
      setSource(`https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`);
    }
  });
  return (
    // user pfp
    <React.Fragment>
      <div id={msgId} className="flex my-6">
        <img
          src={source}
          alt="user pfp"
          className="w-10 h-10 rounded-md mx-3"
        ></img>

        {/* username and message*/}
        <div className="w-8/12 mx-1  break-words">
          <h3 className="text-base font-bold break-words mb-1">{userId}</h3>
          <Latex className="my-1 mx-auto w-4/5 break-words">{msg}</Latex>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Message;
