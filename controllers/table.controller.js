const { tablesCount } = require('../services/table.service');

module.exports = {
    tableCounts: (req, res) => {

        tablesCount((err, results) => {
            
            if(err){
                console.log(err);
                return;
            }

            console.log("result is ==>", results);

            return res.json({
                status: "success",
                data: results
            })
        });
    }
}