/**
 * File Name: oaDAL.js
 *
 * Revision History:
 *       Olayimika Akinbola, 2022-02-09 : Created
 */

var review = {
    insert: function(options, callback){
        function txFunction(tx) {
        var sql  = "INSERT INTO  review(businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3) VALUES(?,?,?,?,?,?,?,?,?);";

        tx.executeSql(sql, options, callback, errorHandler );
    }
        function successTransaction() {
            console.info("Inserting...");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE review SET businessName=?, typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3=? WHERE id=?;";

            tx.executeSql(sql,options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Updating...");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    delete: function(options, callback){
        function txFunction(tx) {
            var sql  = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Delete transaction successfully");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){
        function txFunction(tx) {
            var sql  = "SELECT * from review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: Select transaction successfully");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function txFunction(tx) {
            var sql  = "SELECT * FROM review ;";
            tx.executeSql(sql, options, callback, errorHandler );
        }
        function successTransaction() {
            console.info("Success: SelectAll transaction successfully");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    typeSelectAll :function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM type;"
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler);
    }
};

