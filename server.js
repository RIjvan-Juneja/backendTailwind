const express = require("express");
const useRouter = require('./routes/index.router.js');
const path = require('path');
const cors = require("cors");
// const socketIo = require("socket.io");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(useRouter); 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/socket', express.static(path.join(__dirname, "node_modules/socket.io/client-dist")));
app.set('view engine', 'ejs');

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log("connection error");
    } else {
        console.log(`Server is : http://${HOST}:${PORT}/login`);
    }
})

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log("Soket server is running")
    socket.on('logout_attempt_req', (result) => {
        io.sockets.emit('logout_attempt_res', {});
    });
});


