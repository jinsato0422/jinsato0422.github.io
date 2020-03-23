// Configuration for the Firebase
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

// This retrieves the scholarship data from Firebase
db.collection("Scholarship Database").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        render(doc)
        console.log(doc.id.replace(/\s/g, '')) // debug purpose
    });
});

// This is the function for creating the boxes for each scholarships
function render(doc) {
    let mainGrid = document.createElement('div')
    mainGrid.classList.add("col-xl-6");

    let scholarship = document.createElement('div');
    scholarship.classList.add("card");
    scholarship.classList.add("xs-success")
    scholarship.setAttribute('data-id', toString(doc.id));

    // These are creating structure for the shown descriptions of the scholarships
    let nameDiv = document.createElement('div');
    nameDiv.classList.add("card-header")
    let group = document.createElement('div');
    group.classList.add("card-body")
    let name = document.createElement('a');
    name.setAttribute("href", "url")
    let value = document.createElement('div');
    value.classList.add("scholarshipInfo");
    let deadline = document.createElement('div');
    deadline.classList.add("scholarshipInfo");
    let numberAvailable = document.createElement('div');
    numberAvailable.classList.add("scholarshipInfo");

    //Border for dividing the shown descriptions and the hidden descriptions
    let border = document.createElement('hr');
    border.classList.add("my-4");

    // These are creating structure for the hidden descriptions of the scholarships
    let hideAdditionalContent = document.createElement('div');
    let category = document.createElement('div');
    category.classList.add("scholarshipInfo");
    let offered = document.createElement('div');
    offered.classList.add("scholarshipInfo");
    let provider = document.createElement('div');
    provider.classList.add("scholarshipInfo");
    let courseLoad = document.createElement('div');
    courseLoad.classList.add("scholarshipInfo");
    let fieldOfStudy = document.createElement('div');
    fieldOfStudy.classList.add("scholarshipInfo");
    let levelOfStudy = document.createElement('div');
    levelOfStudy.classList.add("scholarshipInfo");
    let description = document.createElement('div');
    description.classList.add("scholarshipInfo");

    // These are retrieving each description of the scholarships 
    var categoryTextContent = "Category: " + doc.data()['category'];
    var nameTextContent = doc.data()['name'];
    var deadlineTextContent = "Deadline: " + doc.data()['deadline'];
    var descriptionTextContent = "Description: " + doc.data()['description'];
    var offeredTextContent = "Offered: " + doc.data()['offered'];
    var providerTextContent = "Provider: " + doc.data()['provider'];
    var valueTextContent = "$" + doc.data()['value'];
    var courseLoadTextContent = "Course Load: " + doc.data()['courseLoad'];
    var fieldOfStudyTextContent = "Field of Study: " + doc.data()['fieldOfStudy'];
    var levelOfStudyTextContent = "Level of Study: " + doc.data()['levelOfStudy'];
    var numberAvailableTextContent = "Number Available: " + doc.data()['numberAvailable'];

    // This is setting each hidden content and Learn More button a unique ID 
    // so that when the Learn More button is pressed it toggles the correct hidden content 
    var docID = nameTextContent.replace(/\s/g, '')

    hideAdditionalContent.setAttribute("id", docID)
    hideAdditionalContent.classList.add("collapse")

    //Creates the Learn More button 
    let learnMoreButton = document.createElement('a');
    learnMoreButton.innerHTML = "Learn More";
    learnMoreButton.style.color = "white";
    learnMoreButton.classList.add("btn");
    learnMoreButton.classList.add("btn-primary");
    learnMoreButton.classList.add("btn-md");
    learnMoreButton.setAttribute("data-toggle", "collapse")
    learnMoreButton.setAttribute("aria-expanded", "false")
    learnMoreButton.setAttribute("aria-controls", docID)
    learnMoreButton.setAttribute("href", "#" + docID);
    learnMoreButton.setAttribute("role", "button");

    // These are assigning each text content to the coressponding descriptions
    category.textContent = categoryTextContent;
    name.textContent = nameTextContent;
    deadline.textContent = deadlineTextContent;
    description.textContent = descriptionTextContent;
    offered.textContent = offeredTextContent;
    provider.textContent = providerTextContent;
    value.textContent = valueTextContent;
    courseLoad.textContent = courseLoadTextContent;
    fieldOfStudy.textContent = fieldOfStudyTextContent;
    levelOfStudy.textContent = levelOfStudyTextContent;
    numberAvailable.textContent = numberAvailableTextContent;

    //These are attaching all the components of the boxes into one 
    mainGrid.appendChild(scholarship)

    nameDiv.appendChild(name)
    scholarship.appendChild(nameDiv);
    group.appendChild(value);
    group.appendChild(deadline);
    group.appendChild(numberAvailable);

    hideAdditionalContent.appendChild(border);
    hideAdditionalContent.appendChild(category);
    hideAdditionalContent.appendChild(offered);
    hideAdditionalContent.appendChild(provider);
    hideAdditionalContent.appendChild(courseLoad);
    hideAdditionalContent.appendChild(fieldOfStudy);
    hideAdditionalContent.appendChild(levelOfStudy);
    hideAdditionalContent.appendChild(description);

    group.appendChild(learnMoreButton);

    group.appendChild(hideAdditionalContent);

    scholarship.appendChild(group);

    scholarshipList.appendChild(mainGrid);
}