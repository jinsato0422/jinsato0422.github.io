const firebaseConfig = {
    apiKey: "AIzaSyDg47nllVUMwivPM9UcXWzdBpQVYayD-MY",
    authDomain: "scholarshipdatabase-a4ba6.firebaseapp.com",
    databaseURL: "https://scholarshipdatabase-a4ba6.firebaseio.com",
    projectId: "scholarshipdatabase-a4ba6",
    storageBucket: "scholarshipdatabase-a4ba6.appspot.com",
    messagingSenderId: "664316210117",
    appId: "1:664316210117:web:664d9e3b601d0f6d31b9ac",
    measurementId: "G-T4BS1QM4Y5"
};

firebase.initializeApp(firebaseConfig);

//Get the database
var db = firebase.firestore();
const scholarshipList = document.querySelector('#scholarship-list');
var currentUser = findUser();
var table = document.querySelector("table");
var offeredScholarships = [];
var durationOfOfferedScholarships = [];
var shortlistedScholarships = [];
var totalScholarshipData = [];
var finalOfferedScholarships = []; //in the order as seen in the table
var semesterCounter = 0;
var yearlyCounter = 0;

// This retrieves the scholarship data from Firebase
db.collection("offers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        getOfferedScholarships(doc)
    });
    generateTableHead(table)
});

// This retrieves the scholarship data from Firebase
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


// This retrieves the scholarship data from Firebase
db.collection("offers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {        
    });
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    wait(0.5 * 1000).then(() => {
        generateTable(table)
    })
});





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


function getOfferedScholarships(doc) {
    if (doc.id == currentUser)
    {
        offeredScholarships = doc.data()['scholarshipID'];  //have to put in userID somehow
    }
  }

function retrieveScholarship(listOfScholarships, doc){
        for (x in listOfScholarships) {
            if (doc.id == listOfScholarships[x]) {
                finalOfferedScholarships.push(doc.id);
                scholarshipData = [];
                scholarshipData.push(doc.data()['name']);
                scholarshipData.push(doc.data()['offered']);
                scholarshipData.push('$' + doc.data()['value']);
                for (y in shortlistedScholarships)
                {

                    if (doc.id == shortlistedScholarships[0][y]) {
                        scholarshipData.push("Short-listed");
                    }
                    else {
                        scholarshipData.push("Offered");
                    }
                }
                scholarshipData.push(doc.data()['deadline']);
                for (y in shortlistedScholarships)
                {
                    if (doc.id == shortlistedScholarships[0][y]) {
                        scholarshipData.push("Not yet offered");
                    }
                    else {
                        scholarshipData.push("button");
                    }
                }
                saveDuration(doc.id, doc.data()['offered']);
                totalScholarshipData.push(scholarshipData);

            }
        }

}

function generateTable(table) {
    for (x in offeredScholarships) {
        let row = table.insertRow();
        for (y in totalScholarshipData[x]) {

            let cell = row.insertCell();
            if (totalScholarshipData[x][y] == "button") {
                addDecisionButton(cell, x);
            }
            else {
                let text = document.createTextNode(totalScholarshipData[x][y]);
                cell.appendChild(text);
            }
        }
    }
}

function checkShortlist(doc) {
    if (doc.id == currentUser) {   //replace with current user var
        shortlistedScholarships.push(doc.data()['scholarshipID']);
    }
}

function addDecisionButton(currentCell, cellID) {
    let button = document.createElement("input");
    button.type = "button";
    button.name = "acceptButton";
    button.id = finalOfferedScholarships[cellID];
    button.value = "Accept";
    button.className = "btn btn-danger btn-xs";
    currentCell.appendChild(button);
    button.onclick = function() {Popup(button);}
}


function Popup(button) {
    console.log(yearlyCounter + " " + semesterCounter);
    if (confirm("Are you sure you want to select this scholarship?")) {
        let textToReplace = document.createTextNode("Accepted");
        let buttonToRemove = document.getElementById(button.id);
        buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove);
        acceptedTracker(button.id);
        if (yearlyCounter == 1 | semesterCounter == 2) {
            for (x in offeredScholarships) {
                if (button.id != offeredScholarships[x])
                {
                    let textToReplace = document.createTextNode("Maximum scholarships reached");
                    let buttonToRemove = document.getElementById(offeredScholarships[x]);
                    buttonToRemove.parentNode.replaceChild(textToReplace, buttonToRemove);
                }
            }
        }
    }
    else {
        console.log('no scholarship selected');
    }
}

function saveDuration(docID, duration) {
    let scholarship = [];
    scholarship.push(docID);
    scholarship.push(duration);
    durationOfOfferedScholarships.push(scholarship);
}

function acceptedTracker(buttonID) {
        for (y in durationOfOfferedScholarships) {
            if (buttonID == durationOfOfferedScholarships[y][0]) {
                if (durationOfOfferedScholarships[y][1] == "Semester") {
                    semesterCounter++;
                    let paragraph = document.getElementById("Semester");
                    let text = document.createTextNode(semesterCounter);
                    paragraph.appendChild(text);
                }
                if (durationOfOfferedScholarships[y][1] == "Yearly") {
                    yearlyCounter++;
                    console.log(yearlyCounter);
                    let paragraph = document.getElementById("Yearly");
                    let text = document.createTextNode(yearlyCounter);
                    paragraph.appendChild(text);

                }
            }   

        }
    
}   

function findUser(){
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    return queryString;
}

