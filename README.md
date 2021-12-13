# Skipli Coding Challenge 2021

This is a browser-based phone verification form that is built for the Coding Challenge proposed by Skipli in December 2021.

This verification form will:

- Receive a phone number from the user
- Save the entered phone number to the database and send a random 6-digit access code to the number
- Receive the access code from the user and verify if the provided code matches with one in the database
- Display success/error message accordingly

## About

- Author: Son Tran Thien Mac
- Technologies: Twilio, React, Node, Express, Firebase, HTML, CSS, JavaScript, Bootstrap, Reactstrap, Postman, Git, Netlify
- Date: 12/11/2021

## Structure
- The app is seperated into 2 parts like the picture below:
  
![Structure](/images/structure.png)

- The back-end was created with Express and Node which handles POST requests from the front-end and stores data in Firebase database.
- The front-end was written in React displaying a form to retrieve data directly from the user.

## Deployment
- The back-end API was deployed with 2 routes /create and /validate: https://us-central1-skipli-1a233.cloudfunctions.net/api/
- The front-end was deployed on Netlify at https://smskipli.netlify.app/

## Installation

### Requirements and Recommendations

- Must have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed

### Procedure

1.  Clone this Github repository

        git clone https://github.com/sonmac1203/Skipli_Phone_Verification.git

2.  Redirect to the root directory of this repository
  
        cd Skipli_Phone_Verification

3. Install firebase

        npm install -g firebase-tools

4.  Install dependencies in both back-end and front-end
   
    Front-end:

        cd front-end
        npm install

    Back-end:

        cd ../back-end/functions
        npm install
      
5. Set configuration variables for the back-end (retrieve values from submission email)

        cd ..
        firebase functions:config:set twilio.accountsid="XXXXXX"
        firebase functions:config:set twilio.authtoken="XXXXXX"
        firebase functions:config:set twilio.phonenumber="XXXXXX"

6. Download json key file in the submission email and place it under 'functions' folder inside back-end

7.  Copy the key file's path

![Copy path](/images/copy_path.png)

8. Set the key file as environment variable

        export GOOGLE_APPLICATION_CREDENTIALS="[copied path]"

9. Navigate to front-end folder and run the program

        cd ../front-end
        npm start


## Interface

Display the first input field receiving user's phone number:
![First field](/images/first_field.png)

Display the second input field receiving the access code:
![Second field](/images/second_field.png)



