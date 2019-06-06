var db= require('../utils/db');

module.exports = {
    all: ()=> {
        return db.load("select * from products where is_dir = true and is_del = false");
    },

    allByCat: catId => {
        return db.load(`select *from products where ProID = ${catId}`);
    },

    single: id => {
        return db.load(`select *from products where ProID = ${id}`);
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