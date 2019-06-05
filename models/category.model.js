var db= require('../utils/db');

module.exports = {
    all: ()=> {
        return db.load("select * from categories where is_dir = true and is_del = false");
    },

    single: id => {
        return db.load(`select *from categories where ID = ${id}`);
    },

    add: entity => {
        return db.add('categories', entity);
    }
};