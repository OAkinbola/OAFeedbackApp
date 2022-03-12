/**
 * File Name: oadatabase.js
 *
 * Revision History:
 *       Olayimika Akinbola, 2022-02-09 : Created
 */

var db;

function errorHandler(error) {
    console.error("SQL error: " + error.message);
}

var DB = {

    createDatabase: function () {
        var shortName = "OAFeedbackDB";
        var version = "1.0";
        var displayName = "DB for OAFeedback  app";
        var dbSize = 6 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database create successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },

    createTables : function () {
        function txFunction(tx) {
            var options= [];


            var sql = "DROP TABLE IF EXISTS type;";
            //without a transaction u can not do any operation in the db
            tx.executeSql(sql);

            ///////CREATE type
            sql = "CREATE TABLE IF NOT EXISTS type(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sql, options);

            ///////INSERT INTO type
            sql = "INSERT INTO type(name) VALUES ('Others'); ";
            tx.executeSql(sql);
            sql = "INSERT INTO type(name) VALUES ('Canadian'); ";
            tx.executeSql(sql);
            sql = "INSERT INTO type(name) VALUES ('Asian'); ";
            tx.executeSql(sql);
            sql = "INSERT INTO type(name) VALUES ('European'); ";
            tx.executeSql(sql);
            sql = "INSERT INTO type(name) VALUES ('Australian'); ";
            tx.executeSql(sql);

            sql = "CREATE TABLE IF NOT EXISTS review(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL,"+
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30),"+
                "reviewerComments TEXT,"+
                "reviewDate DATE,"+
                "hasRating VARCHAR(1),"+
                "rating1 INTEGER, " +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";
            function successCallback() {
                console.info("Success: review table created successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: All tables created successfully");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    dropTables: function () {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS type;";
            var options = [];
            function successCallbacktype() {
                console.info("Success: drop table: type successful.");
            }
            tx.executeSql(sql, options, successCallbacktype, errorHandler);

            sql = "DROP TABLE IF EXISTS review;";
            options = [];
            function successCallback() {
                console.info("Success: drop table: review successful.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: drop tables transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);

    }
}