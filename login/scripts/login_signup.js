function signupValidation() 
{
    // Get the input data from the fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;
    const date = document.getElementById("date").value;

    if (username === "" || date === "" || gender === "" || password === "") 
    {
        alert("Please fill in all fields");
        return false; // Do not proceed with form submission
    }

    // Perform other validation or actions if needed
    window.location.href = "../homepage/homepage.html";
}

function nameValidation()
{

}