const pool = require('../config/database');


module.exports = {

    getCategory: (callBack) => {
        
        pool.query('SELECT * FROM categories', (err, results) => {

            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, results)
        });
    },

    createCategory: (data, callBack) => {

        pool.query('INSERT INTO categories(title) VALUES(?)', [data.title],(err, results) => {

            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    },

    updateCategory: (data, callBack) => {

        pool.query('UPDATE categories SET title = ? where id = ?', [data.title, data.id], (err, results) => {
            
            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);

        });
    },


    deleteCategory: (data, callBack) => {

        pool.query('DELETE FROM categories WHERE id = ?', [data.id], (err, results) => {
            if(err){
                console.log(err);
                callBack(err);
            }

            return callBack(null, results);
        });
    }

    
}