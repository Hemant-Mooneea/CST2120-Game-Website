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
    passwordValidation(password);

    
    //window.location.href = "../homepage/homepage.html";
}

/* 
This Function takes in the username and checks whether:
    the username already exists
    the username contains special characters
    the user did not input a username
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
        alert("Password needs to have 1 sepcial character");
        return false;
    }
    
    
}

