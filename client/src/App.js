import React, { useState } from "react";
import Chat from "./chat/chat";
import ProblemBoard from "./problemBoard/ProblemBoard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import coverpageimg from "./pictures/coverpageimg.svg";

import { io } from "socket.io-client";
const socket = io("/");

function App() {
  const [username, setUsername] = useState("");
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="h-screen w-screen min-w-md bg-gradient-to-r from-blue-900 to-blue-500 md:block">
            <h1 className="text-white font-sans pt-8 pl-8 h-auto">2Pi</h1>
            <h6 className="text-white font-sans font-light pl-8 h-auto text-sm">
              An online community for math problem solvers
            </h6>
            <div className=" w-2/3">
              <img
                src={coverpageimg}
                alt="brower window example"
                className="rounded-lg transform scale-75 shadow-2xl"
              ></img>
            </div>
            <div className="absolute left-2/3 top-1/3 bg-gray-50 h-60 rounded-md shadow-lg transition duration-300 ease-in-out">
              <h4 className="w-36 mt-3 mx-auto font-extralight">
                Join the party!
              </h4>
              <input
                type="text"
                className="bg-gray-200 border-2 border-gray-300 m-8 rounded-md p-2 block"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={"username"}
              ></input>
              <Link to={`/room/${username}`} style={{ textDecoration: "none" }}>
                <button
                  className="block input-group-btn p-2 bg-purple-500 hover:bg-purple-700 text-white rounded w-2/5 mx-auto"
                  type="button"
                >
                  Enter Room
                </button>
              </Link>
            </div>
          </div>
        </Route>
        <Route path="/room/:username">
          <div className="h-screen w-screen">
            <ProblemBoard socket={socket} />
            <Chat socket={socket} />
          </div>
        </Route>
        <Route path="*">
          <h1 className="h-full w-full text-2xl text-center">Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
