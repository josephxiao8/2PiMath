import React, { useCallback, useEffect, useState } from "react";
import Latex from "react-latex";
import axios from "axios";
import Submissions from "./Submissions";
import Scoreboard from "./Scoreboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";

const ProblemBoard = ({ socket }) => {
  const [statement, setStatement] = useState("Loading..");
  const [answer, setAnswer] = useState("NaN");
  const [problemTitle, setProblemTitle] = useState("Loading...");
  const [textBoxValue, setTextBoxValue] = useState("");
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const { username } = useParams();

  const updateProblem = () => {
    axios
      .get("/api/counter")
      .then((res) => res.data.counterGotten.curProblem)
      .then((idx) =>
        axios
          .get("/api/problemBoard")
          .then((res) => res.data.problems)
          .then((res) => {
            setStatement(res[idx].statement);
            setAnswer(res[idx].answer);
            setProblemTitle(res[idx].problemTitle);
          })
      );

    //resets submissions and solved boolean
    axios.patch(`/api/users/reset/`, {
      username: username,
    });

    const element = document.getElementById("submission field");
    element.className = "p-2 rounded bg-gray-200 mr-1";
  };

  useEffect(() => updateProblem(), []);

  //socket.io
  socket.on("new problem", updateProblem);

  const handleForm = (e) => {
    e.preventDefault();
    if (answer === textBoxValue) {
      axios
        .get(`/api/users/${username}`)
        .then((res) => res.data.userFound.solved)
        .then((res) => {
          if (res === false) {
            axios
              .post("/api/chat", {
                userId: "2Pi Bot",
                msg: `${username} solved the problem 🥳`,
                socketId: "1",
              })
              .then(() => socket.emit("message sent"));
            axios
              .patch("/api/counter", {
                action: "solve",
              })
              .then(() =>
                axios
                  .get("/api/counter")
                  .then((res) => res.data.counterGotten)
                  .then(({ usersSolved, usersTotal }) => {
                    if (usersSolved === usersTotal) {
                      axios
                        .patch("/api/counter/problem")
                        .then(() => socket.emit("all users have solved"))
                        .then(() => {
                          axios
                            .post("/api/chat", {
                              userId: "2Pi Bot",
                              msg: `A new problem is available 💡`,
                              socketId: "1",
                            })
                            .then(() => socket.emit("message sent"));
                        });
                    }
                  })
              );
          }
        });
      axios.patch("/api/users", {
        username: username,
        query: textBoxValue,
        verdict: true,
      });
      const element = document.getElementById("submission field");
      element.className = "p-2 rounded bg-green-100 mr-1";
    } else {
      axios.patch("/api/users", {
        username: username,
        query: textBoxValue,
        verdict: false,
      });
      const element = document.getElementById("submission field");
      element.className = "p-2 rounded bg-red-100 mr-1";
    }
    setTextBoxValue("");
  };

  return (
    <>
      <div className="w-3/4 h-full float-left">
        <div className="block">
          <div className="flex w-full bg-gray-100 h-1/6 shadow-md">
            <div className="flex w-full h-full">
              {/* room title */}
              <h1 className="my-auto mx-4 font-bold text-lg font-sans">2pi</h1>
              {/* scoreboard button */}
              <button
                className="rounded-md shadow bg-blue-500 p-2 my-2 mx-4 text-white hover:bg-blue-600"
                onClick={() => setShowScoreboard(true)}
              >
                Scoreboard
              </button>
              {/* past submissions button */}
              <button
                className="rounded-md shadow bg-blue-500 p-2 my-2 mx-4 text-white hover:bg-blue-600"
                onClick={() => setShowSubmissions(true)}
              >
                Past Submissions
              </button>
              <Scoreboard
                show={showScoreboard}
                onHide={() => setShowScoreboard(false)}
              />
              <Submissions
                show={showSubmissions}
                onHide={() => setShowSubmissions(false)}
              />
            </div>
          </div>

          {/* problem title */}
          <div className="flex w-4/5 mx-auto mt-10 bg-blue-600 rounded-md">
            <h1 className="text-white break-word text-2xl pl-10 p-4 font-semibold">
              {problemTitle}
            </h1>
          </div>

          {/* problem statement and submission button */}
          <div className="w-4/5 mx-auto h-4/6 my-1  p-10 rounded-md overflow-x-hidden shadow-md border-2 overflow-y-a">
            <Latex className>{statement}</Latex>
            <form className="mt-10" onSubmit={(e) => handleForm(e)}>
              <input
                id="submission field"
                className="p-2 rounded bg-gray-200 mr-1"
                placeholder="type your answer here"
                value={textBoxValue}
                onChange={(e) => setTextBoxValue(e.target.value)}
              ></input>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProblemBoard;
