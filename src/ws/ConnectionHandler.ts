import * as url from 'url'


class ConnectionHandler {
    
    newClient(ws, req) {

        // You might use location.query.access_token to authenticate or share sessions
        // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
        const location = url.parse(req.url, true)

        ws.on('message', this.handleMessage)

        ws.send('Connected')

    }

    handleMessage(message) {
        console.log(message)
    }
}


export default ConnectionHandler