/* 
This function is called when the user presses the signup button.
It initialises the constants by first obtaining it from the the form
It then calls each of the validation functions to check for errors
*/
const special_regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
const upper_regex = /[A-Z]/;
const lower_regex = /[a-z]/;
const number_regex = /[0-9]/;
function signupValidation() 
{
    // Get the input data from the fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const date = document.getElementById("date").value;

    let form_validation = true;
    let username_error_msg = usernameValidation(username);
    let password_error_msg = passwordValidation(password);
    let date_error_msg = dateValidation(gender);
    let gender_error_msg = genderValidation(date);
    /*
    if(!(username_error_msg === "") || !(password_error_msg === "") ||!(date_error_msg === "") || !(gender_error_msg === ""))
    {
        document.getElementById("username_error").innerHTML= username_error_msg;
        document.getElementById("password_error").innerHTML= password_error_msg;
        document.getElementById("date_error").innerHTML= date_error_msg;
        document.getElementById("gender_error").innerHTML= gender_error_msg;
        return false;  
    } 
    */

    if (!(username_error_msg === ""))
    {
        document.getElementById("username_error").innerHTML= username_error_msg;
        form_validation = false;
    }
    if (!(password_error_msg === ""))
    {
        document.getElementById("password_error").innerHTML= password_error_msg;
        form_validation = false;   
    }
    if (!(date_error_msg === null))
    {
        document.getElementById("date_Error").innerHTML= date_error_msg;
        form_validation = false;   
    }
    console.log(date_error_msg);

    return form_validation;
    window.location.href = "../homepage/homepage.html";
}

/* 
This Function takes in the username and checks whether the username:
    is blank
    already exists
    contains special characters
*/
function usernameValidation(username)
{   
    //Don't forget to check json files if name already exists
    //Checks if username is empty
    if (username === "")
    {
        return("Username cannot be empty");
    }
    //Checks if username has special characters
    if (special_regex.test(username))
    {
        return("Username cannot contain special characters");
    }
    //Checks if username is longer than 20 characters
    if (username.length > 20)
    {
        return("Username cannot be longer than 20 characters");
    }
    if (username==="ASSAS")
    {
        return("Username already exists");
    }
    return(" ")
}
/* 
This Function takes in the password and checks whether the password :
    is blank
    is at least 8 in length
    contains one uppercase, lowercase, number and special character
*/
function passwordValidation(password)
{
    if (password.length < 8)
    {
        return("Password has to be at least 8 characters");
    }
    if (!upper_regex.test(password))
    {
        return("Password needs to have 1 uppercase");
    }
    if (!lower_regex.test(password))
    {
        return("Password needs to have 1 lowercase");
    }
    if (!number_regex.test(password))
    {
        return("Password needs to have 1 number");
    }
    if (!special_regex.test(password))
    {
        return("Password needs to have 1 special character");
    }
    return(" ")
}

/* 
This Function takes in the Date of Birth and checks whether:
    it is blank
    the user is at least 13 years old
*/
function dateValidation(date)
{   
    if (date === "")
    {
        return("Date cannot be empty");
         
    }   
    
    let age = calculateAge(date);

    if (age < 13)
    {
        return("User should be at least 13");
    }
    return(" ");
}   

// This function calculates age based on a given date
function calculateAge(date) 
{
    // Get the current date
    const today = new Date();
  
    // Convert the input date string into a Date object
    const birthDate = new Date(date);
  
    // Calculate the difference in years between the current date and the birthdate
    let age = today.getFullYear() - birthDate.getFullYear();
    
    // This portion of the code checks whether a person has NOT had their birthday yet this year
    
    // Check if the birth month is in the future or the same as the current month
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    // If the birth month is in the future or the same month but the birth day is in the future,
    // decrement the calculated age to get the accurate age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
    {
      age--;
    }
  
    return age;
}

//This function checks if the radio list has unselected options
function genderValidation(gender) {
    if (gender==="") 
    {
      return("Please select a gender");
    }
    return(" ");
  }