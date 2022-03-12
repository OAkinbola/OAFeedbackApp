/**
 * File Name: oaglobal.js
 *
 * Revision History:
 *       Olayimika Akinbola, 2022-02-09 : Created
 */

function rating_click() {
    rating();
}

function txtRatingsCalculate_change() {
    $("#quality").on("change", getOverallRatings);
    $("#service").on("change", getOverallRatings);
    $("#value").on("change", getOverallRatings);
}

function modifyRating_click(){
    modifyRating();
}

function txtModifyRating_change(){
    $("#modifyQuality").on("change", getModifyRatings);
    $("#modifyService").on("change", getModifyRatings);
    $("#modifyValue").on("change", getModifyRatings);
}

function btnSave_click(){
    addFeedback();
}

function btnUpdate_click(){
    updateFeedback();
}

function btnDefault_click(){
  saveToLocalStorage();
}

function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating Tables ...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exists");
        }
    }catch(e){
        console.error("Error (Fatal): Error in initDB. Can not proceed");
    }
}



function oaAddFeedbackPage_show() {
    showEmail();
    updateTypesDropdownAdd();
}


function oaViewFeedbackPage_show() {
    getReviews();
}

function BtnDelete_click() {
    deleteFeedback();
}

function oaModifyFeedbackPage_show() {
    showCurrentReview();
}

function btnClear_click() {
    clearDatabase();
}

function init(){

    rating_click();
    txtRatingsCalculate_change();

    modifyRating_click();
    txtModifyRating_change();

    $("#btnSave").on("click", btnSave_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#BtnDelete").on("click", BtnDelete_click);




    $("#btnClear").on("click",btnClear_click);


    $("#oaAddFeedbackPage").on("pageshow", oaAddFeedbackPage_show);
    $("#oaViewFeedbackPage").on("pageshow", oaViewFeedbackPage_show);
    $("#oaModifyFeedbackPage").on("pageshow", oaModifyFeedbackPage_show);
    $("#btnDefaults").on("click", btnDefault_click);
}

$(document).ready(function () {
    init();
    initDB();
});

