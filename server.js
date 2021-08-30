const express = require("express");
const app = express();
const cors = require("cors");
const routerChat = require("./routes/chat");
const routerProblemBoard = require("./routes/problemBoard");
const routerUser = require("./routes/user");
const routerCounter = require("./routes/counter");
const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");
const path = require("path");

const port = process.env.PORT || 5000;

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

//socket.io
io.on("connection", (socket) => {
  console.log("user connected");
  axios.patch(`http://localhost:${port}/api/counter`, {
    action: "connect",
  });
  socket.on("message sent", () => io.emit("update messages"));
  socket.on("all users have solved", () => io.emit("new problem"));
  socket.on("disconnect", () => {
    console.log("user disconnected");
    axios
      .delete(`http://localhost:${port}/api/users`, {
        data: { socketId: socket.id },
      })
      .then((res) => {
        if (res.data.userDeleted.solved === true) {
          axios
            .patch(`http://localhost:${port}/api/counter`, {
              action: "disconnect solved",
            })
            .then(() =>
              axios
                .get(`http://localhost:${port}/api/counter`)
                .then((res) => res.data.counterGotten)
                .then(({ usersSolved, usersTotal }) => {
                  if (usersSolved === usersTotal) {
                    axios
                      .patch(`http://localhost:${port}/api/counter/problem`)
                      .then(() => io.emit("new problem"))
                      .then(() => {
                        axios.post(`http://localhost:${port}/api/chat`, {
                          userId: "2Pi Bot",
                          msg: `A new problem is available 💡`,
                          socketId: "1",
                        });
                      })
                      .then(() => io.emit("update messages"));
                    if (usersSolved === 0 && usersTotal === 0) {
                      axios.delete(`http://localhost:${port}/api/chat/reset`);
                    }
                  }
                })
            );
        } else {
          axios
            .patch(`http://localhost:${port}/api/counter`, {
              action: "disconnect",
            })
            .then(() =>
              axios
                .get(`http://localhost:${port}/api/counter`)
                .then((res) => res.data.counterGotten)
                .then(({ usersSolved, usersTotal }) => {
                  if (usersSolved === usersTotal) {
                    axios
                      .patch(`http://localhost:${port}/api/counter/problem`)
                      .then(() => io.emit("new problem"))
                      .then(() => {
                        axios.post(`http://localhost:${port}/api/chat`, {
                          userId: "2Pi Bot",
                          msg: `A new problem is available 💡`,
                          socketId: "1",
                        });
                      })
                      .then(() => io.emit("update messages"));
                    if (usersSolved === 0 && usersTotal === 0) {
                      axios.delete(`http://localhost:${port}/api/chat/reset`);
                    }
                  }
                })
            );
        }
      })
      .catch((err) => {
        axios
          .patch(`http://localhost:${port}/api/counter`, {
            action: "disconnect",
          })
          .then(() =>
            axios
              .get(`http://localhost:${port}/api/counter`)
              .then((res) => res.data.counterGotten)
              .then(({ usersSolved, usersTotal }) => {
                if (usersSolved === usersTotal) {
                  axios
                    .patch(`http://localhost:${port}/api/counter/problem`)
                    .then(() => io.emit("new problem"))
                    .then(() => {
                      axios.post(`http://localhost:${port}/api/chat`, {
                        userId: "2Pi Bot",
                        msg: `A new problem is available 💡`,
                        socketId: "1",
                      });
                    })
                    .then(() => io.emit("update messages"));
                  if (usersSolved === 0 && usersTotal === 0) {
                    axios.delete(`http://localhost:${port}/api/chat/reset`);
                  }
                }
              })
          );
      });
  });
});

//routes
app.use("/api/chat", routerChat);
app.use("/api/problemBoard", routerProblemBoard);
app.use("/api/users", routerUser);
app.use("/api/counter", routerCounter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//connecting to DB
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("conected to DB");
    server.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
