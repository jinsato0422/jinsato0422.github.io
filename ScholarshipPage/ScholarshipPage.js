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
var scholarshipLists = document.querySelector('#scholarship-list');


// This retrieves the scholarship data from Firebase
function getDatabase() {
    db.collection("Scholarship Database").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            render(doc)
            console.log(doc.id.replace(/\s/g, ''))
                // debug purpose
        });
    });
}




// This is the function for creating the boxes for each scholarships
function render(doc) {
    let mainGrid = document.createElement('div')
    mainGrid.classList.add("col-xl-6");

    let scholarship = document.createElement('div');
    scholarship.classList.add("card");
    scholarship.classList.add("xs-success")
    scholarship.setAttribute('dataId', toString(doc.id));
    scholarship.setAttribute('Category', doc.data()['category']);
    scholarship.setAttribute('levelOfStudy', doc.data()['levelOfStudy']);
    scholarship.classList.add('scholarship');

    // These are creating structure for the shown descriptions of the scholarships
    let nameDiv = document.createElement('div');
    nameDiv.classList.add("card-header")
    let group = document.createElement('div');
    group.classList.add("card-body")
    let name = document.createElement('a');
    // name.setAttribute("href", "url")
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

    scholarshipLists.appendChild(mainGrid);

}

function toggleScholarship() {
    //Checkboxes 
    var checkboxDepSpec = document.getElementById('checkbox1');
    var checkboxDepWide = document.getElementById('checkbox2');
    var checkboxFacSpec = document.getElementById('checkbox3');
    var checkboxFacWide = document.getElementById('checkbox4');
    var checkboxUnder = document.getElementById('checkbox5');
    var checkboxMaster = document.getElementById('checkbox6');
    var checkboxPhd = document.getElementById('checkbox7');
    var checkboxPostRes = document.getElementById('checkbox8');

    setEventListenerToCheckbox(checkboxDepSpec);
    setEventListenerToCheckbox(checkboxDepWide);
    setEventListenerToCheckbox(checkboxFacSpec);
    setEventListenerToCheckbox(checkboxFacWide);
    setEventListenerToCheckbox(checkboxUnder);
    setEventListenerToCheckbox(checkboxMaster);
    setEventListenerToCheckbox(checkboxPhd);
    setEventListenerToCheckbox(checkboxPostRes);

}

function setEventListenerToCheckbox(checkbox) {
    //checkbox listener 
    checkbox.addEventListener('change', function(e) {
        console.log("CHECKBOX CHECKED--------------------------------------------------------------------------------------------------------------------------------");
        if (checkbox.checked) {
            console.log(checkbox);
            console.log('Checked!');
            console.log("Below is the boxes that are still checked");
            console.log(checkedboxes);
            //When the checkbox is checked we need to make scholarships that correspond to the checkbox be filtered 
            //But we have to leave the ones that are still checked 
            if (checkedboxes.length != 0) {
                for (var k = 0; k < scholarshipList.length; k++) {
                    for (var j = 0; j < checkedboxes.length; j++) {
                        console.log('ITERATION ' + k + '.' + j);
                        if (!scholarshipList[k].getAttribute('category').includes(checkedboxes[j].value) && scholarshipList[k].getAttribute('levelOfStudy').includes(checkedboxes[j].value)) {
                            console.log('Below is the scholarship that is not checked in category but is in levelofStudy');
                            console.log(scholarshipList[k]);
                            scholarshipList[k].style.display = 'block';
                            break
                        } else if (!scholarshipList[k].getAttribute('levelOfStudy').includes(checkedboxes[j].value) && scholarshipList[k].getAttribute('category').includes(checkedboxes[j].value)) {
                            console.log('Below is the scholarship that is not checked in levelofStudy but is in category');
                            console.log(scholarshipList[k]);
                            scholarshipList[k].style.display = 'block';
                            break

                        } else {
                            if (checkbox.value.includes('Department') || checkbox.value.includes('Faculty')) {
                                //debug purpose
                                console.log('Below is the scholarship where none is checked ')
                                console.log(scholarshipList[k]);
                                if (scholarshipList[k].getAttribute('category') == "Any" || scholarshipList[k].getAttribute('category').includes(checkbox.value)) {
                                    console.log('Below is the scholarships visible1.2');
                                    console.log(scholarshipList[k]);
                                    scholarshipList[k].style.display = 'block';
                                } else {
                                    console.log('Below is the scholarships invisible1.2');
                                    console.log(scholarshipList[k]);
                                    scholarshipList[k].style.display = 'none';
                                }
                            } else {
                                if (scholarshipList[k].getAttribute('levelOfStudy') == "Any" || scholarshipList[k].getAttribute('levelOfStudy').includes(checkbox.value)) {
                                    console.log('Below is the scholarships visible2.2');
                                    console.log(scholarshipList[k]);
                                    scholarshipList[k].style.display = 'block';
                                } else {
                                    console.log('Below is the scholarships invisible2.2');
                                    console.log(scholarshipList[k]);
                                    scholarshipList[k].style.display = 'none';
                                }
                            }
                        }
                    }
                }
            }
            //if there is no checked boxes we don't care  
            else {
                console.log('There was no other checkboxes checked');
                for (var k = 0; k < scholarshipList.length; k++) {
                    // console.log(scholarshipList[k]);
                    // console.log('Checked!');

                    if (checkbox.value.includes('Department') || checkbox.value.includes('Faculty')) {
                        // console.log(checkboxList[j]);
                        // console.log(scholarshipList[k]);
                        if (scholarshipList[k].getAttribute('category') == "Any" || scholarshipList[k].getAttribute('category').includes(checkbox.value)) {
                            scholarshipList[k].style.display = 'block';
                        } else {
                            scholarshipList[k].style.display = 'none';
                        }
                    } else {
                        if (scholarshipList[k].getAttribute('levelOfStudy') == "Any" || scholarshipList[k].getAttribute('levelOfStudy').includes(checkbox.value)) {
                            scholarshipList[k].style.display = 'block';
                        } else {
                            scholarshipList[k].style.display = 'none';
                        }
                    }
                }
            }

            checkedboxes.push(checkbox);
            console.log('Checkbox added');
            console.log(checkedboxes);
            console.log('OPERATION ENDED----------------------------------------------------------------------------------------------------------------------------------')
        } else {
            console.log("CHECKBOX UNCHECKED--------------------------------------------------------------------------------------------------------------------------------")
            console.log(checkbox);
            console.log('unchecked!');
            //Discard unchecked boxes  
            var x = checkedboxes.indexOf(checkbox);
            checkedboxes.splice(x, 1);
            console.log("Below is the boxes that are still checked");
            console.log(checkedboxes);
            if (checkedboxes.length != 0) {
                for (var k = 0; k < scholarshipList.length; k++) {
                    for (var j = 0; j < checkedboxes.length; j++) {
                        console.log('ITERATION ' + k + '.' + j);
                        if (!scholarshipList[k].getAttribute('category').includes(checkedboxes[j].value) && scholarshipList[k].getAttribute('levelOfStudy').includes(checkedboxes[j].value)) {
                            console.log('Below is the scholarship that is not checked in category but is in levelofStudy');
                            console.log(scholarshipList[k]);
                            scholarshipList[k].style.display = 'block';
                            break
                        } else if (!scholarshipList[k].getAttribute('levelOfStudy').includes(checkedboxes[j].value) && scholarshipList[k].getAttribute('category').includes(checkedboxes[j].value)) {
                            console.log('Below is the scholarship that is not checked in levelofStudy but is in category');
                            console.log(scholarshipList[k]);
                            scholarshipList[k].style.display = 'block';
                            break

                        } else {
                            if (checkbox.value.includes('Department') || checkbox.value.includes('Faculty')) {
                                //debug purpose
                                console.log('Below is the scholarship where none is checked ')
                                console.log(scholarshipList[k]);
                                if (scholarshipList[k].getAttribute('category') == "Any" || scholarshipList[k].getAttribute('category').includes(checkbox.value)) {
                                    console.log('Below is the scholarships invisible1');
                                    console.log(scholarshipList[k]);
                                    scholarshipList[k].style.display = 'none';
                                }
                            } else {
                                if (scholarshipList[k].getAttribute('levelOfStudy') == "Any" || scholarshipList[k].getAttribute('levelOfStudy').includes(checkbox.value)) {
                                    console.log('Below is the scholarships invisible2');
                                    console.log(scholarshipList[k]);
                                    scholarshipList[k].style.display = 'none';
                                }
                            }
                        }
                    }
                }
            } else {
                console.log('There was no other checkboxes checked');
                for (var k = 0; k < scholarshipList.length; k++) {
                    // console.log(scholarshipList[k]);
                    // console.log('Checked!');
                    scholarshipList[k].style.display = 'block';

                }
            }
            console.log("OPERATION ENDED--------------------------------------------------------------------------------------------------------------------------------")

        }





    })
}

var checkedboxes = [];
const scholarshipList = document.getElementsByClassName('scholarship');

function main() {
    getDatabase();
    console.log('waiting 1 second for retrieving database to be finished')
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    var scholarship = wait(1 * 1000).then(() => {
        console.log("Complete");
        toggleScholarship();
    })
}

main();