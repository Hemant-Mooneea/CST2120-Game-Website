function signupValidation() 
{
    // Get the input data from the fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (name === "" || email === "" || username === "" || password === "") {
        alert("Please fill in all fields");
        return false; // Do not proceed with form submission
    }

    window.location.href = "../homepage/homepage.html";
}
function nameValidation()
{

}