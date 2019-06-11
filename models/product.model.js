var db= require('../utils/db');

module.exports = {
    all: ()=> {
        return db.load("select * from products where is_dir = true and is_del = false");
    },

    allByCat: catId => {
        return db.load(`select * from products where Cat = ${catId}`);
    },

    pageByCat: (catId, limit, offset) => {
        return db.load(`select * from products where Cat = ${catId} limit ${limit} offset ${offset}`);
    },

    countByCat: catId => {
        return db.load(`select count(*) as total from products where Cat = ${catId}`);
    },

    single: id => {
        return db.load(`select * from products where Cat = ${id}`);
    },

    add: entity => {
        return db.add('products', entity);
    },

    update: entity => {
        return db.update('products', 'ID', entity);
    },

    delete: id => {
        return db.delete('products', 'ID', id);
    }
};