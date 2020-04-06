const minGPA = 3.7;
const twoWeeksInMilliseconds = 1209600000;

var mainForm;
var scholarshipSelectionPane;
var candidateSeletionPane;
var candidateInformationPane;

var availableScholarships;

var currentScholarship;
var currentCandidate;

initiateProgram();

function initiateProgram(){
	mainForm = document.getElementById("mainform");
	scholarshipSelectionPane = document.getElementById("availableScholarships");	
	candidateSelectionPane = {
		applicants: document.getElementById("applicants"),
		pane: document.getElementById("applicantsPane"),
		header: document.getElementById("applicantsHeader")
	}
	candidateInformationPane = {
		pane: document.getElementById("candidateInformationForm"),
		name: document.getElementById("name"),
		id: document.getElementById("id"),
		gpa:document.getElementById("gpa"),
		degree: document.getElementById("degree")
	}
	
	candidateInformationPane.pane.style.display = "none";
	
	findAvailableScholarships();
}


function findAvailableScholarships(){
	availableScholarships = new Array ();
	
	database.collection('Scholarship Database').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
			const numScholarshipAvail = doc.data().numberAvailable;
			const numScholarshipTaken = doc.data().numberTaken;
			
			console.log(doc.id + " " + numScholarshipTaken);
			
			if ( (numScholarshipTaken == undefined) || 
				(numScholarshipTaken < numScholarshipAvail)){
					addScholarshipInformation(doc);
			}
			
        })
    })

}


function addScholarshipInformation(scholarship) {
	var scholarshipName = scholarship.data().name;
	
    var info = {
        name: scholarshipName,
        data: scholarship
    }

    availableScholarships.push(info);
	addToScreen(scholarshipName, scholarshipSelectionPane);
}

function addToScreen(toAdd, whereToAdd){
	var opt = document.createElement("option");
	opt.text = toAdd;
	whereToAdd.add(opt);
}

function displayCandidates(){
	clearCandidates();
	
	const scholarshipToFind = scholarshipSelectionPane.value;
	const selectedScholarship = findScholarship(scholarshipSelectionPane.value);
	
	const candidates = selectedScholarship.data().applicants;
	
	if (candidates.length === 0){
		candidateSelectionPane.header.innerText = "It seems that no one has applied for the " +
				scholarshipToFind + " at this time. \n\n Please select another scholarship " +
				"to view applicants.";
				
		candidateSelectionPane.pane.style.display = "inline";
		candidateSelectionPane.applicants.style.display = "none";
		
	} else {
		candidateSelectionPane.pane.style.display = "none";
		candidateSelectionPane.applicants.style.display = "inline";
		candidateSelectionPane.header.innerText = "Select a Candidate to Review Application:";
		
		findCandidateInformation(candidates);
	}
	
	currentScholarship = selectedScholarship;

	
}


function clearCandidates(){
	var  lastCandidate = candidateSelectionPane.applicants.lastElementChild;
	const selectionPlaceholder = candidateSelectionPane.applicants.firstElementChild;
	
	while(lastCandidate != selectionPlaceholder){
		lastCandidate.remove();
		lastCandidate = candidateSelectionPane.applicants.lastElementChild;
	}
		
	
}

function findScholarship(toFind){
	
	for (var i = 0; i < availableScholarships.length; i++){
		if (availableScholarships[i].name == toFind){
			return availableScholarships[i].data;
		}
	}

	resetPage();
}


function findCandidateInformation(candidates){
	const lastCanadidate = candidates[candidates.length - 1];
	
	var currentCandidate;
	
	candidates.forEach(candidate =>{
		var candidateData = database.collection('applications').doc(candidate);
		
		candidateData.get().then(doc => {
			if (!doc.exists) {
				resetPage();
			} else if ((doc.data().gpa >= minGPA) && (doc.data().grades_b == "false")) {
				const name = doc.data().fname + " " + doc.data().lname
				addToScreen(name, candidateSelectionPane.applicants);
			}
			if(candidate == lastCanadidate){	
					candidateSelectionPane.pane.style.display = "inline";
			}
		}).catch(err => {
			resetPage();
		});
	});

}

function displayApplicantInfo(){
	
	const candidateName = candidateSelectionPane.applicants.value
	
	const candidateData = new Promise (function(resolve, reject){
		
		database.collection('applications').get().then((snapshot) => {
			snapshot.docs.forEach(doc => {
				if (doc.data().fname + " " + doc.data().lname == candidateName) {
					resolve(doc.data());
				}
			})
		})
	});
	
	candidateData.then(candidateInfo => {
		mainForm.style.display = "none";
		candidateInformationPane.pane.style.display = "block";
		
		candidateInformationPane.name.innerHTML = candidateName;
		candidateInformationPane.id.innerHTML = candidateInfo.s_id;
		candidateInformationPane.gpa.innerHTML = candidateInfo.gpa;
		candidateInformationPane.degree.innerHTML = candidateInfo.degree;
		
		currentCandidate = {
			name: candidateName,
			id: candidateInfo.s_id,
			email: candidateInfo.email
		}
	});

}

function returnToApplicants(){
	mainForm.style.display = "block";
	candidateInformationPane.pane.style.display = "none";
}

function selectApplicant(){
	let continueSelection = confirm("Are you the sure you want to select " + currentCandidate.name + 
			" for the " + currentScholarship.data().name +"?");
			
			
	if(continueSelection){
		processApplicantSelection();
	}
}


function processApplicantSelection(){
	
	
	database.collection('offers').add({
		id: currentCandidate.id,
		name: currentCandidate.name,
		scholarshipID: currentScholarship.id,
		acceptDate: Date.now() + twoWeeksInMilliseconds
	}).then(function(){
		var numScholarshipTaken = currentScholarship.data().numberTaken;
		if(numScholarshipTaken == undefined){
			numScholarshipTaken = 1;
		} else {
			numScholarshipTaken++;
		}
		
		database.collection('Scholarship Database').doc(currentScholarship.id).update({
			numberTaken: numScholarshipTaken
		}).then(function(){
			sendConfirmationEmail();
		});
	});
}


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
		window.location.href = "../PickRecipientPage/pickRecipient.html";
    });

}

function setEmailText(){
	const emailText = "Congratulations " + currentCandidate.name + ", <br> You have been selected to recieve the " +
	currentScholarship.data().name + ". Please log onto your U of S Scholarships account within the next two weeks to " +
	" accept your scholarship offer! <br> Sincerely, <br> University of Saskatchewan, <br> Office of the Registrar";
	
	return emailText;
}
	

function resetPage(){	
	alert("It seems that your selection has produced an error, please try again");
	window.location.href = "../PickRecipientPage/pickRecipient.html"
}