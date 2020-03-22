var id
const form = document.querySelector('#application-form');

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