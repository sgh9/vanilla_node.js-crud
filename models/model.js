const { writeFile } = require('../utils');
let users = require('../user.json');


const findAll = ()=> {
    return new Promise((resolve, reject)=> {
        resolve(users);
    })
}

const findUserById = (id) => {
    return new Promise((resolve, reject)=> {
        const user = users.find(user => user.id === +id);
        resolve(user);
    })
}

const save = (user) => {
    return new Promise((resolve, reject)=> {
        const userDetails = {
            id: users.length + 1,
            ...user
        };
        users.push(userDetails);
        writeFile("user.json", users)
        resolve(userDetails);
    })
}
const update = (userData, id) => {
    return new Promise((resolve, reject)=> {
        const index = users.findIndex(user => user.id === +id);
        users[index] = {
            id: +id,
            ...userData
        };
        writeFile("user.json", users);
        resolve(userData);
    })
}

const deleteUserById = (id)=> {
    return new Promise((resolve, reject)=> {
        const newUsers = users.filter(user => user.id !== +id);
        writeFile("user.json", newUsers);
        console.log("user deleted",newUsers);
        resolve(id);
    })
}

module.exports = {
    findAll,
    findUserById,
    save,
    update,
    deleteUserById
}