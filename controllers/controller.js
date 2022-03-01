const user = require('../models/model');

async function getUsers(req, res) {
    try {
       const users = await user.findAll();
       res.writeHead(200, { 'Content-Type': 'application/json'});
       res.end(JSON.stringify(users)); 
    } catch (error) {
        console.log(error);
    }
}

async function getuser(req, res, id) {
    console.log("user");
   
    try {
        const userDetail = await user.findUserById(id);
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(userDetail)); 
    } catch (error) {
        console.log(error);
    }
}

async function createUser(req, res, id) {
   
    try {
        let body = '';

        req.on('data', (chunk)=> {
            body += chunk.toString();
        });

        req.on('end', async()=> {
            let userData = JSON.parse(body);
            console.log(userData);
            const userDetail = await user.save(userData, id);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(userDetail)); 
            
        });
    
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(req, res, id) {
   
    try {
        const userDetail = await user.findUserById(id);
        if(!userDetail) {
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ msg : 'User not found' }));   
            return;
        }
        let body = '';

        req.on('data', (chunk)=> {
            body += chunk.toString();
        });
        
        req.on('end', async()=> {
            let userData = JSON.parse(body);
            console.log("update",userData);
            const userDetail = await user.update(userData, id);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(userDetail)); 
            
        });
    
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req, res, id) => {
    try {
        const userId = await user.deleteUserById(id);
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ msg : `user with id ${userId} deleted`})); 
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getUsers,
    getuser,
    createUser,
    updateUser,
    deleteUser
}