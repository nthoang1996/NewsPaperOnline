var db= require('../utils/db');

module.exports = {
    all: ()=> {
        return db.load("select * from products where is_del = false");
    },
   
    pageByParentCat:  (catId, limit, offset)  => {
        return db.load(`select p.ID, p.Title, p.Avatar, p.Summary, p.Content, p.Date_Create from products p left join categories c on c.ID = p.Cat  where c.parent_id = ${catId} and can_views = 'Acepted' order by Date_Create DESC limit ${limit} offset ${offset}`);
    },

    countByParentCat: catId => {
        return db.load(`select count(*) as total from products p left join categories c on c.ID = p.Cat  where c.parent_id = ${catId} and can_views = 'Acepted'`);
    },

    allByCat: catId => {
        return db.load(`select * from products where Cat = ${catId}`);
    },

    pageByCat: (catId, limit, offset) => {
        return db.load(`select * from products where Cat = ${catId} and can_views = 'Acepted' order by Date_Create DESC limit ${limit} offset ${offset}`);
    },

    countByCat: catId => {
        return db.load(`select count(*) as total from products where Cat = ${catId} and can_views = 'Acepted'`);
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