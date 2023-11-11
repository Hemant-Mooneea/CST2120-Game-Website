/* 
This function is called when the user presses the signup button.
It initialises the constants by first obtaining it from the the form
It then calls each of the validation functions to check for errors
*/
const special_regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
function signupValidation() 
{
    // Get the input data from the fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;
    const date = document.getElementById("date").value;
    usernameValidation(username);
    if (date === "" || gender === "" || password === "") 
    {
        alert("Please fill in all fields");
        return false; // Do not proceed with form submission
    }

    // Perform other validation or actions if needed
    window.location.href = "../homepage/homepage.html";
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

}