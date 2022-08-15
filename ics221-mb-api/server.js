import app from './express.js'; 
import https from "https";
import fs from "fs";

const port = process.env.PORT || 3004; 
 

const httpsOptions = {
  key: fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
}

const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log('server running at ' + port)
})

//app.listen(port, (err) => { 
//  if (err) console.log(err); 
//  console.info(`Server started on port ${port}.`); 
//});