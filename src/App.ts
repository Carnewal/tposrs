import * as http from 'http'
import * as url from 'url'
import * as express from 'express'
import * as Constants from './util/Constants'
import ConnectionHandler from './ws/ConnectionHandler'
import MainRoute from './routes/Index'
import * as tmi from 'tmi.js'
import { InputHandler } from './input/InputHandler';

const app = express();

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

const server = http.createServer(app);
//const connectionHandler = new ConnectionHandler()
//const wss = new WebSocket.Server({ server });
//wss.on('connection', connectionHandler.newClient);


var client = new tmi.client({
  options: {
      debug: true
  },
  connection: {
      reconnect: true
  },
  channels: [Constants.CHAT_CHANNEL]
});

client.connect()

const inputHandler = new InputHandler(
  Constants.SCREEN_CLIENT_POSITION.right1050,
  Constants.BLOCKED_CLIENT_REGIONS
)

client.on("chat", (channel: string, userstate: any, message: string, self: boolean) => 
  inputHandler.onMessage(channel,userstate, message, self)
)


server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});