var minGPA = 3.7;
var twoWeeksInMilliseconds = 1209600000;

var mainForm;
var scholarshipSelectionPane;
var candidateSeletionPane;
var candidateInformationPane;

var availableScholarships;

var currentScholarship;
var currentCandidate;

var queryString;


initiateProgram();


/* Sets up all variables by getting inputs from the html page and then initiates the
   program by calling findAvailableScholarships() */
function initiateProgram() {

    //The full form for the whole page
    mainForm = document.getElementById("mainform");

    //The pane that displays available scholarships and potential applicants
    scholarshipSelectionPane = document.getElementById("availableScholarships");
    candidateSelectionPane = {
        applicants: document.getElementById("applicants"),
        pane: document.getElementById("applicantsPane"),
        header: document.getElementById("applicantsHeader")
    }

    //The pane that displays candidate information once the administrator has selected a candidate
    candidateInformationPane = {
        pane: document.getElementById("candidateInformationForm"),
        name: document.getElementById("name"),
        id: document.getElementById("id"),
        gpa: document.getElementById("gpa"),
        degree: document.getElementById("degree")
    }
	
	//Used for reloading pages
	queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);

    //Hide the candidate information until a candidate is selected
    candidateInformationPane.pane.style.display = "none";

    //Begin program by finding available scholarships
    findAvailableScholarships();
}



/* Parses the scholarship database for scholarships that have not been fully taken
   ie. the offered scholarships is still less than the scholarships available. Adds
   these scholarships to an array by calling addScholarshipInformation */
function findAvailableScholarships() {
    availableScholarships = new Array();

    database.collection('Scholarship Database').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            const numScholarshipAvail = doc.data().numberAvailable;
            const numScholarshipTaken = doc.data().numberTaken;

            /* An undefined numScholarshipTaken is the same as zero because the var has
               not been added to the database */
            if ((numScholarshipTaken == undefined) ||
                (numScholarshipTaken < numScholarshipAvail)) {
                addScholarshipInformation(doc);
            }

        })
    })

}



/* Adds a given scholarship to an array of scholarships and then calls the add to
   screen command to display the scholarship. Determines if a given scholarship
   is shortlisted for this call */
function addScholarshipInformation(scholarship) {
    var scholarshipName = scholarship.data().name;
    var isShortlisted = scholarship.data().isShortlisted;

    /* If a scholarship isShortlisted variable is undefined it has not been assigned 
       by this script yet meaning the scholarship is not shortlisted */
    if (isShortlisted == undefined) {
        isShortlisted = false;
    }

    // Info we want to keep about each scholarship 
    var info = {
        name: scholarshipName,
        data: scholarship,
    }

    // Add info to the array and put the scholarship on the screen
    availableScholarships.push(info);
    addToScreen(scholarshipName, scholarshipSelectionPane, isShortlisted);
}



/* Adds an element (toAdd) to a select element (whereToAdd) by first creating
   the element and then adding it to the select. Colors the element red if it
   is e shortlisted element to distinguish these elements */
function addToScreen(toAdd, whereToAdd, shortlist) {

    var opt = document.createElement("option");
    opt.text = toAdd;
    if (shortlist) {
        opt.style.color = "red";
    }

    whereToAdd.add(opt);
}



/* Displays all of the candidates who have applied for a given selected scholarship by 
   finding these candidates in the database and then adding them to the candidate selection
   select element before making the candidate selection element visible. */
function displayCandidates() {

    //Gets rid of current candidate info
    clearCandidates();

    //Finds which scholarship is currently selected and gets info about this scholarship
    const scholarshipToFind = scholarshipSelectionPane.value;
    currentScholarship = findScholarship(scholarshipToFind);

    //Determines the candidates who have applied for the selected scholarship
    const candidates = currentScholarship.data().applicants;


    //No candidates have applied
    if (candidates.length === 0) {
        candidateSelectionPane.header.innerText = "It seems that no one has applied for the " +
            scholarshipToFind + " at this time. \n\n Please select another scholarship " +
            "to view applicants.";

        //Set up display
        candidateSelectionPane.pane.style.display = "inline";
        candidateSelectionPane.applicants.style.display = "none";

        //Candidates have applied
    } else {
        //Set up display
        candidateSelectionPane.pane.style.display = "none";
        candidateSelectionPane.applicants.style.display = "inline";
        candidateSelectionPane.header.innerText = "Select a Candidate to Review Application:";

        findCandidateInformation(candidates);
    }

}



/* Removes all candidates from ths candidate selection pane ensure that only 
   potential candidates are shown. Leaves behind the last element - namely the
   select a candidate element */
function clearCandidates() {
    var lastCandidate = candidateSelectionPane.applicants.lastElementChild;
    const selectionPlaceholder = candidateSelectionPane.applicants.firstElementChild;

    //Remove all from pane
    while (lastCandidate != selectionPlaceholder) {
        lastCandidate.remove();
        lastCandidate = candidateSelectionPane.applicants.lastElementChild;
    }
}



/* Finds the current scholarship information, including the id of the scholarship
   from the list of all scholarships */
function findScholarship(toFind) {

    for (var i = 0; i < availableScholarships.length; i++) {
        if (availableScholarships[i].name == toFind) {
            return availableScholarships[i].data;
        }
    }

    //This area should never be reached, if reached error sent through reset page
    resetPage();
}



/* Finds all of the information about every candidate for a scholarship by parsing through
   an array of the potential scholarships and finding that candidates info. Also determines
   if a selected candidate is shortlisted for a scholarship by parsing the shortlist database*/
function findCandidateInformation(candidates) {
    const lastCanadidate = candidates[candidates.length - 1];

    var scholarshipShortlist = currentScholarship.data().isShortlisted;
    var currentCandidate = undefined;
    var candidateShortlisted = false;

    //If the shortlist variable is undefined the scholarship is shortlisted because it has not been updated
    if (scholarshipShortlist == undefined) {
        scholarshipShortlist = false;
    }


    // Parse through all candidates to find information and add it to an array
    candidates.forEach(candidate => {
        var candidateData = database.collection('applications').doc(candidate);

        candidateData.get().then(doc => {
            if (!doc.exists) {
                resetPage();

                //If candidate does not have the required GPA or has a B do not display
            } else if ((doc.data().gpa >= minGPA) && (doc.data().grades_b == "false")) {

                const name = doc.data().fname + " " + doc.data().lname

                if (scholarshipShortlist) {

                    database.collection('shortlist').doc(doc.id).get().then(shortlisting => {

                        //Determine if candidate is shortlisted for the selected scholarship
                        if (shortlisting.data() != undefined) {
                            const availableShortlists = shortlisting.data().scholarshipID;
                            availableShortlists.forEach(listing => {
                                if (listing == currentScholarship.id) { candidateShortlisted = true } else { candidateShortlisted = false; }
                            });
                        } else { candidateShortlisted = false; }

                        //Put candidate on screen
                        addToScreen(name, candidateSelectionPane.applicants, candidateShortlisted);
                    });
                } else {
                    //Scholarship does not have a shortlist so candidate will not be shortlisted
                    candidateShortlisted = false;
                    addToScreen(name, candidateSelectionPane.applicants, candidateShortlisted);
                }
            }
            if (candidate == lastCanadidate) {
                //Show the available candidates
                candidateSelectionPane.pane.style.display = "inline";

            }
        }).catch(err => {
            resetPage();
        });
    });

}



/* Shows all the information about a selected candidate for a particular scholarship and 
   displays this information onto screen. Get's the candidate's info from the database */
function displayApplicantInfo() {

    const candidateName = candidateSelectionPane.applicants.value

    //Find candidate's info. Uses a promise to ensure function executes first
    const candidateData = new Promise(function(resolve, reject) {
        database.collection('applications').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (doc.data().fname + " " + doc.data().lname == candidateName) {
                    resolve(doc.data());
                }
            })
        })
    });

    //Display everything
    candidateData.then(candidateInfo => {
        mainForm.style.display = "none";
        candidateInformationPane.pane.style.display = "block";


        //Set all the information appropriately
        candidateInformationPane.name.innerHTML = candidateName;
        candidateInformationPane.id.innerHTML = candidateInfo.s_id;
        candidateInformationPane.gpa.innerHTML = candidateInfo.gpa;
        candidateInformationPane.degree.innerHTML = candidateInfo.degree;

        //Set required variable for other calls
        currentCandidate = {
            name: candidateName,
            id: candidateInfo.s_id,
            email: candidateInfo.email
        }
    });


}


/* Goes back to the application selection page by reloading the page */
function returnToApplicants() {

    window.location.href = "pickRecipient.html?" + queryString;
}


/* Selects an applicant for the selected scholarship by first confirming that the coordinator
   wants to make the selection and then processes the application */
function selectApplicant() {
    let continueSelection = confirm("Are you the sure you want to select " + currentCandidate.name +
        " for the " + currentScholarship.data().name + "?");


    if (continueSelection) {
        processApplicantListing("offers");
    }
}


/* Shortlists an applicant for the selected scholarship by first confirming that the coordinator
   wants to make the selection and then processes the application */
function shortlistApplicant() {
    let continueSelection = confirm("Are you the sure you want to shortlist " + currentCandidate.name +
        " for the " + currentScholarship.data().name + "?");


    if (continueSelection) {
        processApplicantListing("shortlist");
    }
}


/* Either processes an application shortlisting or selection for the selected scholarship based on
   the listingType parameter. Writes the listing to the database as a new scholarship submission 
   or shortlisting */
function processApplicantListing(listingType) {

    var data = database.collection(listingType).doc(currentCandidate.id);

    database.runTransaction(function(transaction) {
        transaction.get(data).then(function(doc) {

            //Person has an existing shortlist/offer file in database
            if (doc.exists) {
                var shortlistedScholarships = doc.data().scholarshipID;
                var alreadyListed = false;

                shortlistedScholarships.forEach(item => {
                    //Already recieved offer/shortlist, do nothing
                    if (item == currentScholarship.id) {
                        alreadyListed = true;
                    }
                })

                if (!alreadyListed) {
                    shortlistedScholarships.push(currentScholarship.id);
					var shortlistedAcceptDates = doc.data().acceptDate;
					shortlistedAcceptDates.push(Date.now() + twoWeeksInMilliseconds);

                    //Already has an existing file but not for this scholarship, add the scholarship
                    return data.update({ scholarshipID: shortlistedScholarships, acceptDate: shortlistedAcceptDates });
                } else {
                    return Promise;
                }

            } else {
                // No file, create a new file with the scholarship
                return database.collection(listingType).doc(currentCandidate.id).set({
					acceptedScholarships: [],
					acceptDate: [twoWeeksInMilliseconds + Date.now()],
                    id: currentCandidate.id,
                    name: currentCandidate.name,
                    scholarshipID: [currentScholarship.id]
                })
            }
        }).then(function() {
            //Functionality for updating the shortlisting elements.
            if (listingType == "shortlist") {
                database.collection('Scholarship Database').doc(currentScholarship.id).update({
                    isShortlisted: true
                }).then(function() {
                    alert("You have successfully shortlisted " + currentCandidate.name + " for the " +
                        currentScholarship.data().name + ". You will now be redirected to the scholarship selection page.");

                    window.location.href = "../PickRecipientPage/pickRecipient.html?" + queryString;
                });
            } else {
                //Update how many scholarships have been taken!
				var numTaken = currentScholarship.data().numberTaken;
				if (numTaken == undefined){
					numTaken = 1
				}
				database.collection('Scholarship Database').doc(currentScholarship.id).update({
					numberTaken: numTaken
				}).then(sendConfirmationEmail());
            }
        });
    })


}

/* Sends an email using elastic email, letting the individual know about their scholarship offer */
function sendConfirmationEmail() {

    const emailText = setEmailText();

    Email.send({
        SecureToken: "ea494848-e3e2-4607-a7bc-17103bbc8aa1",
        To: currentCandidate.email,
        From: "scholarships@jjreyconsulting.xyz",
        Subject: "U of S Scholarship Offer",
        Body: emailText
    }).then(function() {
        alert("An email has been sent to " + currentCandidate.name + " confirming their scholarship offer." +
            " You will now be redirected to continue selecting scholarship recipients");
        window.location.href = "../PickRecipientPage/pickRecipient.html?" + queryString;
    });

}


/*Sets the text for an email to be sent based off the name of the scholarship and who it is being offered to */
function setEmailText() {
    const emailText = "Congratulations " + currentCandidate.name + ", <br> You have been selected to recieve the " +
        currentScholarship.data().name + ". Please log onto your U of S Scholarships account within the next two weeks to " +
        " accept your scholarship offer! <br> Sincerely, <br> University of Saskatchewan, <br> Office of the Registrar";

    return emailText;
}


/* Opens the current candidate's saved transcript in a new tab */
function viewTranscript() {
    var fileName_TS = currentCandidate.id + "_TS.pdf";
    var storageRef = firebase.storage().ref()
    var transcriptStorageRef = storageRef.child(fileName_TS)
    transcriptStorageRef.getDownloadURL().then(function(url) {
        window.open(url);
}


/* Opens the current candidate's saved supporting documentation in a new tab */
function viewSupportingDoc() {
    var fileName_SD = currentCandidate.id + "_SD.pdf";
    var storageRef = firebase.storage().ref()
    var supdocStorageRef = storageRef.child(fileName_SD)
    supdocStorageRef.getDownloadURL().then(function(url) {
        window.open(url);
    })
}


/* Resets the page, by sending error message and reloads if there is an error */
function resetPage() {
    alert("It seems that your selection has produced an error, please try again");
    window.location.href = "../PickRecipientPage/pickRecipient.html?" + queryString;
}
