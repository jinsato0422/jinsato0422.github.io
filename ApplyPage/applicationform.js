var id
var availableScholarships
const form = document.querySelector('#application-form');

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

    window.location.href = "../Homepage/Homepage.html?"
}

var scholarshipSelectionPane = document.getElementById("availableScholarships");

function findScholarshipInformation() {
    availableScholarships = new Array();
    database.collection('Scholarship Database').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            addScholarshipInformation(doc);
        })
    })
}

function addScholarshipInformation(scholarship) {
    var scholarshipName = scholarship.data().name;
    addToScreen(scholarshipName, scholarshipSelectionPane);
}

function addToScreen(toAdd, whereToAdd) {
    var opt = document.createElement("option");
    opt.text = toAdd;
    whereToAdd.add(opt);
}
//Saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
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
    })

})