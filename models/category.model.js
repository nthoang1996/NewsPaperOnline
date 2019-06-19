var db= require('../utils/db');

module.exports = {
    all: ()=> {
        return db.load("select * from categories where is_dir = true and is_del = false");
    },

    allWithDetails: ()=> {
        return db.load(`select c.ID, c.Name, c.parent_id, count(p.ID) as num_of_products from categories c left join products p on c.ID = p.Cat and p.can_views = 'Acepted' group by c.ID, c.Name`);
    },

    subCatWithCatID: id => {
        return db.load(`select *from categories where parent_id = ${id}`);
    },

    single: id => {
        return db.load(`select *from categories where ID = ${id}`);
    },

    add: entity => {
        return db.add('categories', entity);
    },

    addSubCategory: (entity,id) => {
        return db.addSubCategory('categories', entity, id);
    },

    update: entity => {
        return db.update('categories', 'ID', entity);
    },

    delete: id => {
        return db.delete('categories', 'ID', id);
    }
};