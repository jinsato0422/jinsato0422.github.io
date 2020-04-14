const scholarshipList = document.querySelector('#scholarship-list'); //connection to HTML code  
var currentUser = findUser();
var table = document.querySelector("table"); //connection to HTML empty table
var offeredScholarships = []; //offered scholarships in the order they are seen in the database
var durationOfOfferedScholarships = []; //scholarship IDs paired with their durations they are offered
var shortlistedScholarships = []; //shortlisted scholarships
var totalScholarshipData = []; //information pertaining to each scholarship for the table
var finalOfferedScholarships = []; //offered scholarships in the order they are seen in the table
var semesterCounter = 0; //number of accepted scholarships that last a semester
var yearlyCounter = 0; //number of accepted scholarships that last a year
var acceptedList = [];

//This retrieves the offered scholarships from Firebase and creates the head row for the table
db.collection("offers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        getOfferedScholarships(doc)
    });
    generateTableHead(table)
});

// This retrieves the shortlisted scholarships from Firebase
db.collection("shortlist").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        checkShortlist(doc)
    });
});

// This retrieves the scholarship data from Firebase
db.collection("Scholarship Database").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        retrieveScholarship(offeredScholarships, doc)
    });
});

//This creates the body rows for the table with all the appropriate information and is what returns to a saved state
//if the user has already accepted a scholarship offer
var candidateData = db.collection('offers').doc(currentUser);
candidateData.get().then(doc => {
    if (doc.exists) {
        for (x in doc.data()['acceptedScholarships']) {
            acceptedTracker(doc.data()['acceptedScholarships'][x]); //updates the number of semester and yearly scholarships already accepted
        }
        const wait = ms => new Promise(resolve => setTimeout(resolve, ms)); //prevents generateTable() from being called before the information has been stored
        wait(0.5 * 1000).then(() => {
            generateTable(table, doc)
        })
    }
});

//This creates the head row for the table so users know what each cell of data in the table is 
function generateTableHead(table) {
    var headerNames = ["Award", "Duration", "Amount", "Status", "Accept/Decline Date", "Choose Scholarship"]
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (x in headerNames) {
        let th = document.createElement("th");
        let text = document.createTextNode(headerNames[x]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

//This retrieves the current user's scholarships they can select from
function getOfferedScholarships(doc) {
    if (doc.id == currentUser) {
        offeredScholarships = doc.data()['scholarshipID'];
    }
}

//This stores all of the information for the scholarships the user has been offered
//and indicates to the system which cell buttons are required
function retrieveScholarship(listOfScholarships, doc) {
    for (x in listOfScholarships) { //runs through all of the offered scholarships
        if (doc.id == listOfScholarships[x]) { //executes code only if the Scholarship Database entry matches those that were offered
            finalOfferedScholarships.push(doc.id); //stores the IDs of the offered scholarships
            scholarshipData = [];
            scholarshipData.push(doc.data()['name']);
            scholarshipData.push(doc.data()['offered']);
            scholarshipData.push('$' + doc.data()['value']);
            for (y in shortlistedScholarships) //assigns scholarships as either offered or short-listed depending on if they're in the database
            {
                if (doc.id == shortlistedScholarships[0][y]) {
                    scholarshipData.push("Short-listed");
                } else {
                    scholarshipData.push("Offered");
                }
            }
            scholarshipData.push(doc.data()['deadline']);
            for (y in shortlistedScholarships) //creates tag for where buttons should be to accept scholarship offers
            {
                if (doc.id == shortlistedScholarships[0][y]) {
                    scholarshipData.push("Not yet offered");
                } else {
                    scholarshipData.push("button");
                }
            }
            saveDuration(doc.id, doc.data()['offered']);
            totalScholarshipData.push(scholarshipData); //stores all of the information for each cell by scholarship
        }
    }
}

//This creates the table based on all of the stored scholarship data
function generateTable(table, doc) {
    for (x in offeredScholarships) {
        let row = table.insertRow();
        for (y in totalScholarshipData[x]) { //each scholarship is stored as a row
            let cell = row.insertCell();
            if (totalScholarshipData[x][y] == "button") { //swap the tag for a button to accept an offered scholarship
                addDecisionButton(cell, x, doc);
            } else {
                let text = document.createTextNode(totalScholarshipData[x][y]); //otherwise just use the scholarship data to fill the cell
                cell.appendChild(text);
            }
        }
    }
}

//This saves which scholarships the user has been shortlisted for
function checkShortlist(doc) {
    if (doc.id == currentUser) {
        shortlistedScholarships.push(doc.data()['scholarshipID']);
    }
}

//This creates buttons for the user to accept their scholarship offers in the table and is what 
//reverts buttons to their last state if the user has already accepted a scholarship
function addDecisionButton(currentCell, cellID, doc) {
    let button = document.createElement("input");
    button.type = "button";
    button.name = "acceptButton";
    button.id = finalOfferedScholarships[cellID];
    button.value = "Accept";
    button.className = "btn btn-danger btn-xs";
    currentCell.appendChild(button);
    if (doc.data()['acceptedScholarships'] != null) { //check if there is existing data for accepted offers
        for (y in doc.data()['acceptedScholarships']) {
            if (yearlyCounter == 1 | semesterCounter == 2) //if the maximum number of scholarships have already been accepted 
            {
                if (button.id == doc.data()['acceptedScholarships'][y]) { //if the current button is for a scholarship that has been accepted
                    let textToReplace = document.createTextNode("Accepted");
                    let buttonToRemove = document.getElementById(button.id);
                    buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove); //replaces button with text to say it's accepted
                } else { //otherwise the scholarship cannot be chosen because another has been accepted already

                    let textToReplace = document.createTextNode("Maximum scholarships reached");
                    let buttonToRemove = document.getElementById(button.id);
                    buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove);

                }
            }
            if (semesterCounter == 1) { //if a single semester-long scholarship has been chosen you can still apply for another 
                if (button.id == doc.data()['acceptedScholarships'][y]) {
                    let textToReplace = document.createTextNode("Accepted");
                    let buttonToRemove = document.getElementById(button.id);
                    buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove); //replaces button with text to say it's accepted
                } else {
                    for (x in durationOfOfferedScholarships) {
                        if (button.id == durationOfOfferedScholarships[y][0]) {
                            if (durationOfOfferedScholarships[y][1] == "Yearly") { //if a semester-long scholarship has been chosen, a yearly one cannot be
                                let textToReplace = document.createTextNode("Maximum scholarships reached");
                                let buttonToRemove = document.getElementById(button.id);
                                buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove);
                            }
                        }
                    }
                }
            }
        }
    }
    button.onclick = function() { Popup(button, doc); }
}

//This creates the popup alert for the user to confirm if they wish to select the scholarship
function Popup(button, doc) {
    if (confirm("Are you sure you want to select this scholarship?")) {
        let textToReplace = document.createTextNode("Accepted");
        let buttonToRemove = document.getElementById(button.id);
        addAcceptedToDatabase(button.id, doc);
        buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove); //replaces button with text to say it's accepted
        acceptedTracker(button.id); //updates how many scholarships have been accepted
        if (yearlyCounter == 1 | semesterCounter == 2) { //check if the maximum number of scholarships has been chosen
            for (x in offeredScholarships) {
                if (button.id != offeredScholarships[x]) { //remove all other buttons if the maximum has been reached

                    if (document.body.contains(document.getElementById(offeredScholarships[x]))) {
                        let textToReplace = document.createTextNode("Maximum scholarships reached");
                        let buttonToRemove = document.getElementById(offeredScholarships[x]);
                        buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove);
                    }
                }
            }
        }
    } else {
        console.log('no scholarship selected'); //just for debugging
    }
}

//This saves the duration the scholarships are applicable for
function saveDuration(docID, duration) {
    let scholarship = [];
    scholarship.push(docID);
    scholarship.push(duration);
    durationOfOfferedScholarships.push(scholarship); //save the scholarship ID with its associated duration
}

//This keeps track of which type of scholarships have been accepted
function acceptedTracker(buttonID) {
    for (x in durationOfOfferedScholarships) { //goes through each scholarship that has been offered
        if (buttonID == durationOfOfferedScholarships[x][0]) { //determine which button is associated with what type of scholarship
            if (durationOfOfferedScholarships[x][1] == "Semester") {
                semesterCounter++;
                let paragraph = document.getElementById("Semester");
                let text = document.createTextNode(semesterCounter);
                paragraph.appendChild(text); //update the number of semester-long scholarships that have been accepted
            }
            if (durationOfOfferedScholarships[x][1] == "Yearly") {
                yearlyCounter++;
                let paragraph = document.getElementById("Yearly");
                let text = document.createTextNode(yearlyCounter);
                paragraph.appendChild(text); //update the number of year-long scholarships that have been accepted
            }
        }
    }
}

//This updates the database with the user's choices for accepted scholarships
function addAcceptedToDatabase(acceptedScholarship, doc) {
    var acceptances;
    console.log("success");
    acceptances = doc.data().acceptedScholarships;
    acceptances.push(acceptedScholarship);
    return candidateData.update({
        acceptedScholarships: acceptances
    });
}

//This determines the current user's ID
function findUser() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    return queryString;
}