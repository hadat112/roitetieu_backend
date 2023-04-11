import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes";
import connect from "./config/db";
import moment from "moment";

require("dotenv").config();
const http = require("http");
const socketio = require("socket.io");
import createError from "http-errors";

const { addUser, removeUser, getUsersInRoom } = require("./controllers/users");
const {
  createGame,
  addPlayer,
  disconnectPlayer,
  updatePlayerReadyStatus,
  updatePlayerAnswer,
  getGameByID,
  gameLoop,
} = require("./controllers/game");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PUPPET_PORT || 4001;

app.use(cors());
app.use(bodyParser.json());
route(app);

// HTTP logger
app.use(morgan("combined"));

connect();

// method

const io = socketio(server, {
  cors: true,
  origins: ["http://localhost:5173"],
});


// Socker Emitters
const updateLeaderboard = (data, room) => {
  io.to(room).emit("updateLeaderboard", {
    leaderboard: data,
  });
};
const updateGameState = (gameState, room) => {
  io.to(room).emit("updateGameState", {
    gameState,
  });
};

io.on("connect", (socket) => {
  console.log(`${socket.id} connected!`);

  // Join room handler
  socket.on("join", async ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback({ error: error });

    socket.join(user.room);
    const { game, error: getGameError } = getGameByID(room);

    if (getGameError) {
      await createGame(room);
      addPlayer({ id: socket.id, name, room });
    } else {
      if (game.status !== "pending") {
        return callback({ error: "Game already started" });
      }
      addPlayer({ id: socket.id, name, room });
    }

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getGameByID(user.room).game.players,
    });

    callback({
      user: user,
    });
  });

  // Set player ready status handler
  socket.on("player-ready", ({ name, room }, callback) => {
    const { game, error } = updatePlayerReadyStatus({
      id: socket.id,
      name,
      room,
    });

    io.to(room).emit("roomData", {
      room,
      users: getGameByID(room).game.players,
    });

    if (game.status === "started") {
      gameLoop({ room }, updateLeaderboard, updateGameState);
    }
    callback({ game, error });
  });

  // Set player's answer
  socket.on(
    "player-answer",
    ({ name, room, questionID, answerID }, callback) => {
      const { game, error } = updatePlayerAnswer({
        id: socket.id,
        name,
        room,
        questionID,
        answerID,
        momentAnswered: moment().format(),
      });
      callback({ game, error });
    }
  );

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected.`);
    const user = removeUser(socket.id);

    if (user) {
      const { error } = disconnectPlayer({ id: socket.id, room: user.room });
      if (error !== "Game not found") {
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getGameByID(user.room).game.players,
        });
      }
    }
  });
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
