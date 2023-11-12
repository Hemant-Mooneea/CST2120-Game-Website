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
    const gender = document.getElementById("gender").value;
    const date = document.getElementById("date").value;
    usernameValidation(username);
    passwordValidation(password)
    dateValidation(date);

    
    //window.location.href = "../homepage/homepage.html";
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
        alert("Username cannot be empty");
        return false;
    }
    //Checks if username has special characters
    if (special_regex.test(username))
    {
        alert("Username cannot contains special characters");
        return false;
    }
    //Checks if username is longer than 20 characters
    if (username.length > 20)
    {
        alert("Username cannot be longer than 20 characters");
        return false;
    }
    
}
/* 
This Function takes in the password and checks whether the password :
    is blank
    is at least 8 in length
    contains one uppercase, lowercase, number and special character
*/
function passwordValidation(password)
{
    if (password === "")
    {
        alert("Password cannot be empty");
        return false;
    }
    if (password.length < 8)
    {
        alert("Password has to contain at least 8 characters");
        return false;
    }
    if (!upper_regex.test(password))
    {
        alert("Password needs to have 1 uppercase");
        return false;
    }
    
    if (!lower_regex.test(password))
    {
        alert("Password needs to have 1 lowercase");
        return false;
    }
    if (!number_regex.test(password))
    {
        alert("Password needs to have 1 number");
        return false;
    }
    if (!special_regex.test(password))
    {
        alert("Password needs to have 1 special character");
        return false;
    }
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
        alert("Date cannot be empty");
        return false;
    }   
    let age = calculateAge(date);
    if (age < 13)
    {
        alert("User is not old enough");
        return false;
    }


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