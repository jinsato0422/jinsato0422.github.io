JJRey Scholarship System: April 14, 2020 
Users: 
Student Account
Username:00000000 
Password:Jjrey1
Professor Account
Username:00001234
Password:Jjrey1
Scholarship Coordinator
Username:99999997
Password:Jjrey1

Accessible html Files: 
1. login.html; createAccount.html; forgotPassword.html 
Available Actions: 
	a. Click 'Create a New Account' to create a new account on the page. Follow the prompts to create a valid account. Once created, you should be able to access the system with your account. The ID 99999998 should be available. If trying to create a scholarship coordinator account, the admin password is 'Jjrey123'
	b. Click 'Forgot Password' to view the forgot password page. This page will allow you to reset your password by entering an email linked to an account. The page will then send a password request to that email. The domain name for the email automatically grey lists these emails so it will be a few hours at minimum before you recieve the email but it will come through. Once you recieve the email, it will give you a link to follow to enter a new password. 
	c. Enter the ID and password for the account you created to access the homepage. Alternatively, you can enter the IDs provided for the student, professor or the scholarship coordinator above. 
2. Homepage.html
	This page is the Scholarship System homepage. This page holds the navigation bar to different tabs depending on what type account you hold. 
Available actions:
	a. The 'Learn More' button redirects you to the featured scholarships page. 
	b. The 'Log out' button logs you out. You will be required to log back in before using other functionalities. 
	c. If you are a student, the nav bar should include a 'Stats' button - to redirect you to the statistics page, a 'Featured Scholarships' button - to redirect you to the awards overview page, and an 'Apply' button - to redirect you to the application form. 
	d. If you are a professor, the nav bar should include a 'Stats' button - to redirect you to the statistics page, a 'Featured Scholarships' button - to redirect you to the awards overview page, and an 'Nominate' button - to redirect you to the nomination form.
	e. If you are a scholarship coordinator, the nav bar should include a 'Stats' button - to redirect you to the statistics page, a 'Featured Scholarships' button - to redirect you to the awards overview page, an 'Add New Scholarship' button - to redirect you to the new scholarship form, and an 'Offer Scholarships' button - to redirect you to the pick recipient page.
3. applicationform.html; nomination.html
Available Actions: 
	a. Fill in the form
	b. Click 'Upload your Transcript' or 'Upload Supporting Documents' 	to choose a file to upload. 
	c. Press submit to the submit the application. 
4. NewScholarship.html 
Available actions: 
	a. Fill in the form.
	b. Press submit to add a new scholarship to the database.
5. ScholarshipPage.html 
	This page is for viewing all the available scholarships for all students. This page includes the filter box and all the scholarships. With the filter box, we can filter the scholarships corresponding to the categories the user checks the checkboxes. Each scholarships are structured in a box shape, which includes a short description.Also, this page is linked to the Firebase database, which will automatically make the boxes for each scholarships in the database
Available actions:
	a. Press 'Learn More' to view more information about the scholarships
	b. Checkmark any of the categories in filter to view only the scholarships that match the criteria
6. Statistics.html
	This page is for viewing the acceptance rate for each scholarships.
7. AcceptancePage.html
This page is to view the status of your applications. 
Available Actions:
	a. If you have been offered an award, you can view the deadline for the award, and accept it.
	b. If you have been shortlisted for an award, you are updated by this page.
8. PickRecipient.html
This page is for the scholarship coordinator to view and choose applicants for scholarships. 
Available actions: 
	a. You can pick the scholarship you want to choose for. 
	b. You can view the eligible applicants (eligibility is predetermined by the software based on their GPA and transcript information) for each scholarship.
	c. You select an applicant and press 'Shortlist Applicant' to shortlist an applicant.
	d. You select an applicant and press 'View Transcript' to view the student's transcript.
	e. You select an applicant and press 'View Supporting Document' to view the student's supporting document
	f. You select an applicant and press 'Offer Scholarship' to offer a scholarship to the selected student. 