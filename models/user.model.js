var db= require('../utils/db');

module.exports = {
    all: ()=> {
        return db.load("select * from users where  f_isDel = false");
    },

    single: id => {
        return db.load(`select * from users where f_ID = ${id} and f_isDel = false`);
    },

    singleByUserName: userName => {
        console.log(userName);
        return db.load(`select * from users where f_Username = '${userName}' and f_isDel = false`);
    },

    add: entity => {
        return db.add('users', entity);
    },

    update: (entity, id) => {
        delete entity.f_ID;
        return db.updateWithID('users', 'f_ID', entity, id);
    },

    delete: id => {
        return db.delete('users', 'f_ID', id);
    }
};