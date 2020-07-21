var id
var availableScholarships
//References the application form
const form = document.querySelector('#application-form');

//Upload function for transcript and supporting doc
function fileUpload(event) {
    var storageRef = firebase.storage().ref();
    var fileName_TS = form.s_id.value.toString(10).concat('_TS.pdf');
    var transcriptRef = storageRef.child(fileName_TS)
    var upFileTS = document.getElementById("transcript").files[0]
    transcriptRef.put(upFileTS);

    var fileName_SD = form.s_id.value.toString(10).concat('_SD.pdf');
    var supdocRef = storageRef.child(fileName_SD);
    var upFileSD = document.getElementById("otherdocs").files[0]
    supdocRef.put(upFileSD);

}

var scholarshipSelectionPane = document.getElementById("availableScholarships");
var scholarships = new Array();

//Showing scholarships as options after getting them from the database
var scholarshipSelectionPane = document.getElementById("availableScholarships");
var scholarships = new Array();

function renderScholarship(doc) {
    let opt = document.createElement('option');
	var item = {name: doc.data().name,
	id: doc.id}
	scholarships.push(item);
    opt.textContent = doc.data().name;
    scholarshipSelectionPane.add(opt);
}


/*Find potential scholarships to render on the screen */
db.collection('Scholarship Database').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderScholarship(doc)
    })
})
	

/*Submit scholarship application to the database */
var scholarshipsSelected = [];
    //Saving data into database
const waitScholarship = ms => new Promise(resolve => setTimeout(resolve, ms));
waitScholarship(0.5 * 1000).then(() => {
    form.addEventListener('submit', (e) => {
				
        e.preventDefault();
		
		scholarshipsSelected = $('#availableScholarships').val();
		
		if (scholarshipsSelected.length > 4){
			alert("Please select a maximum of 4 scholarships");
		}
		else{
			db.collection('applications').doc(form.s_id.value).set({
				fname: form.fname.value,
				lname: form.lname.value,
				email: form.email.value,
				number: form.number.value,
				s_id: form.s_id.value,
				gpa: form.gpa.value,
				dob: form.dob.value,
				degree: form.degree.value,
				grades_b: form.grades.value,
			});
			updateSubmissionOnScholarship()
		}
				
				
    })
})


/*Update applications on the scholarship side of the database */
function updateSubmissionOnScholarship(){
	var id;
	const lastScholarship = scholarshipsSelected[scholarshipsSelected.length - 1];
	scholarshipsSelected.forEach(selection => {
		id=getScholarshipID(selection);
		
		var data = db.collection('Scholarship Database').doc(id);

		db.runTransaction(function(transaction) {
			transaction.get(data).then(function(doc) {

				transaction.get(data).then(function(doc) {

					//Person has an existing shortlist/offer file in database
					if (doc.exists) {
						var applications = doc.data().applicants;
						var alreadyListed = false;

						applications.forEach(item => {
							//Already recieved offer/shortlist, do nothing
							if (item == form.s_id.value) {
								alreadyListed = true;
							}
						})

						if (!alreadyListed) {
							applications.push(form.s_id.value);

							//Already has an existing file but not for this scholarship, add the scholarship
							return data.update({ applicants: applications }).then(function (){
								if (selection == lastScholarship){	
									sendConfirmation();
								}
							});
						} else {
							return Promise;
						}

					} 
				});
			});
		});
	});

	
}


/* Get the ID for a particular scholarship */
function getScholarshipID(name){
	var id;
	scholarships.forEach(scholarship => {
		if (scholarship.name == name){
			id = scholarship.id
		}
	});
	
	return id;
}


/*Show that the application form has been submitted */
function sendConfirmation(){
	alert("Form successfully submitted, you will now be redirected to the homepage");
	
	var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);

	
	window.location.href = "../index.html?" + queryString;
}


