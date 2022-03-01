const http = require('http');
const { getUsers, getuser, createUser, deleteUser, updateUser } = require('./controllers/controller');

const PORT = process.env.PORT || 8000;

 const server = http.createServer((req, res) => {
     console.log("method", req.method)
     if(req.url === '/api/users' && req.method === "GET") {
        getUsers(req, res);

     } else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3];
        getuser(req, res, id);

     } else if(req.url.match(/\/api\/users/) && req.method === "POST") {
        createUser(req, res);

     }  else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "PUT") {
        const id = req.url.split('/')[3];
        updateUser(req, res, id);

     } else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "DELETE") {
        const id = req.url.split('/')[3];
        deleteUser(req, res, id);

     } else {
         res.end("404")
     }
 }) 


 server.listen(PORT, ()=> {
    console.log("listening on port", PORT);
 });