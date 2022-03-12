/**
 * File Name: oafacade.js
 *
 * Revision History:
 *      Olayimika Akinbola, 2022-02-09 : Created
 */

function rating() {
    $("#ratings").click(function () {
        if ($(this).is(":checked"))
        {
            $("#customerFeedback").show();
        } else{
            $("#customerFeedback").hide();
        }
    })
}

function getOverallRatings() {
    let quality = Number($("#quality").val());
    let service =Number($("#service").val());
    let value = Number($("#value").val());
    let result = ((quality + service + value) * 100 / 15);
    $("#overallRatings").val(result.toFixed() + "%");
}

function modifyRating(){
    $("#modifyRatings").click(function () {
        if ($(this).is(":checked"))
        {
            $("#modifyFeedback").show();
        } else{
            $("#modifyFeedback").hide();
        }
    })
}

function getModifyRatings() {
    let quality = Number($("#modifyQuality").val());
    let service = Number($("#modifyService").val());
    let value = Number($("#modifyValue").val());
    let result = ((quality + service + value) * 100 / 15);
    $("#modifyOverallRatings").val(result.toFixed() + "%");
}

function overallRating(foodQly, service, value) {
    return  ((foodQly + service + value) * 100) / 15;
}

function addFeedback(){
    if(doValidate_oaFrmAdd()){

        console.log(" Add Form is valid");

        var businessName = $("#businessName").val();
        var typeId = $("#cmbType").val();
        var reviewerEmail = $("#reviewerEmail").val();
        var reviewerComments = $("#reviewerComments").val();
        var reviewDate = $("#reviewDate").val();
        var hasRating = $("#ratings").prop("checked");
        var rating1 = $("#quality").val();
        var rating2 = $("#service").val();
        var rating3 = $("#value").val();

        var options = [businessName, typeId, reviewerEmail, reviewerComments,
            reviewDate, hasRating, rating1, rating2, rating3];

        function callback() {
            console.info("Success: Record Inserted successfully");
            alert("New Feedback Added");
            resetForm();
            oaAddFeedbackPage_show();
        }
       review.insert(options, callback);

        console.info( `${businessName} ${typeId} ${reviewerEmail} ${reviewerComments}
            ${reviewDate} ${hasRating}  ${rating1}  ${rating2}  ${rating3}`);

    }
    else{
        console.log(" Add Form is invalid");
    }
}


function updateFeedback(){
    if(doValidate_oaFrmModify()){
        console.log(" Modify Form is valid");

        var id = localStorage.getItem("id");

        var businessName = $("#modifyName").val();
        var typeId = $("#modifyType").val();
        var reviewerEmail = $("#modifyEmail").val();
        var reviewerComments = $("#modifyComments").val();
        var reviewDate = $("#modifyDate").val();
        var hasRating = $("#modifyRatings").prop("checked");
        var rating1 = $("#modifyQuality").val();
        var rating2 = $("#modifyService").val();
        var rating3 = $("#modifyValue").val();

        console.info( `${businessName} ${typeId} ${reviewerEmail} ${reviewerComments}
                    ${reviewDate}  ${hasRating} ${rating1} ${rating2} ${rating3}`);

        var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate,
            hasRating, rating1, rating2, rating3, id];

        function callback() {
            console.info("Success: Update successful");
            alert("Feedback Updated successfully");

            $(location).prop('href', "#oaViewFeedbackPage");
        }
        review.update(options, callback);
    }
    else{
        console.log("Modify Form is invalid");
    }
}


function saveToLocalStorage() {
    let input = document.getElementById("defaultEmail");
    localStorage.setItem("DefaultEmail", input.value);

    if (localStorage.getItem('DefaultEmail') !== null) {
        alert("Default reviewer email Saved")
    }

}




function showSelectOptionsModify(typeId) {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if(row['id'] === typeId)
                htmlCode += `<option value=${row['id']} selected>${row['name']}</option>`;
            else
                htmlCode += `<option value=${row['id']}>${row['name']}</option>`;
        }
        var lv = $("#modifyType").html(htmlCode);
        lv.selectmenu("refresh");
    }
   review.typeSelectAll(options, callback);
}

function resetForm() {
    $("#businessName").val("");
    $("#cmbType").val("");
    showEmail();
    $("#reviewerComments").val('');
    $("#reviewDate").val('');
    $("#quality").val(0);
    $("#service").val(0);
    $("#value").val(0);
    $("#overallRatings").val("");
    $("#ratings").prop("checked", false).checkboxradio("refresh");
    $("#customerFeedback").hide();
}








function updateTypesDropdownAdd() {
    var options = [];

    function callback(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if(row['name'] === 'Others')
                htmlCode = `<option value=${row['id']} selected>${row['name']}</option>`;
            else
                htmlCode += `<option value=${row['id']}>${row['name']}</option>`;
           // console.info("selecting types");
        }
        var lv = $("#cmbType").html(htmlCode);
        lv.selectmenu("refresh");

    }

    review.typeSelectAll(options, callback);
}


function showEmail(){
    var email = localStorage.getItem("DefaultEmail");
    $("#reviewerEmail").val(email);
}

function getReviews() {
    var options = [];

    function callback(tx, results) {
        console.info("Selecting All");

        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            var businessName = row['businessName'];
            var reviewerEmail = row['reviewerEmail'];
            var reviewerComments = row['reviewerComments'];
            var rating1 = Number(row['rating1']);
            var rating2 =Number(row['rating2']);
            var rating3 = Number(row['rating3']);

            htmlCode += `
            <li>
                <a data-role="button" data-row-id = ${row['id']} href="#" >
                <h1>Business Name: ${businessName}</h1>
                <p>Reviewer Email: ${reviewerEmail}</p>
                <p>Comments: ${reviewerComments}</p>
                <p>Overall Rating: ${overallRating(rating1,rating2,rating3).toFixed() + "%"}</p>
                </a>
            </li>
            `;
        }
        if (results.rows.length === 0) {
            $("#record").show();
            htmlCode = "";
        } else {
            $("#record").hide();
        }

        var lv = $("#1stViewFeedback");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#oaModifyFeedbackPage');
        }
        $("#1stViewFeedback a").on("click", clickHandler);
    }
    review.selectAll(options, callback);
}


function deleteFeedback() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback() {
        console.info("Deleting..");
        alert("Feedback deleted successfully");
        $(location).prop('href', "#oaViewFeedbackPage");
    }
    review.delete(options, callback);
}


var currentreview = null;

function showCurrentReview() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        console.info("Selecting One");
        currentreview = results.rows[0];
        var row = results.rows[0];
        var businessName = row['businessName'];
        var reviewerEmail = row['reviewerEmail'];
        var reviewerComments = row['reviewerComments'];
        var typeId = row['typeId'];
        var reviewDate = row['reviewDate'];
        var hasRating = row['hasRating'];
        var rating1 = row['rating1'];
        var rating2 = row['rating2'];
        var rating3 = row['rating3'];

        $("#modifyName").val(businessName);
        showSelectOptionsModify(typeId);
        $("#modifyEmail").val(reviewerEmail);
        $("#modifyComments").val(reviewerComments);
        $("#modifyDate").val(reviewDate);
        if (hasRating === 'true') {
            $("#modifyRatings").prop("checked", true).checkboxradio("refresh");
            $("#modifyFeedback").show();
            $("#modifyQuality").val(rating1);
            $("#modifyService").val(rating2);
            $("#modifyValue").val(rating3);
            $("#modifyOverallRatings").val(overallRating(rating1,rating2,rating3).toFixed() + "%");
        } else {
            $("#modifyRatings").prop("checked", false).checkboxradio("refresh");
            $("#modifyFeedback").hide();
            $("#modifyQuality").val(0);
            $("#modifyService").val(0);
            $("#modifyValue").val(0);
            $("#modifyOverallRatings").val("");
        }
    }
    review.select(options, callback);
}

function clearDatabase() {
    var result = confirm("Really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared: All tables dropped");
        } catch (e) {
            alert(e);
        }
    }
}