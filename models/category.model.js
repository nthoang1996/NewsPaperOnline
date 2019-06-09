var db= require('../utils/db');

module.exports = {
    all: ()=> {
        return db.load("select * from categories where is_dir = true and is_del = false");
    },

    allWithDetails: ()=> {
        return db.load(`select c.ID, c.Name, count(p.ID) as num_of_products from categories c left join products p on c.ID = p.Cat group by c.ID, c.Name`);
    },

    single: id => {
        return db.load(`select *from categories where ID = ${id}`);
    },

    add: entity => {
        return db.add('categories', entity);
    },

    update: entity => {
        return db.update('categories', 'ID', entity);
    },

    delete: id => {
        return db.delete('categories', 'ID', id);
    }
};