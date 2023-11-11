function signupValidation() 
{
    // Get the input data from the fields
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const gender = document.getElementById("gender").value;
    const date = document.getElementById("date").value;


    if (name === "" || date === "" || gender === "" || password === "") {
        alert("Please fill in all fields");
        return false; // Do not proceed with form submission
    }

    window.location.href = "../homepage/homepage.html";
}
function nameValidation()
{

}