function getLoginData() 
{
    // Get the input data from the fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!(checkUserCrendentials(username, password)))
    {
        return false;
    }

    document.getElementById("username_error").innerHTML = " ";

   //window.location.href = "../homepage/homepage.html";
}

function checkUserCrendentials(username, password)
{
    const stored_user_data = localStorage.getItem('user_data');

    // Check if any user data is stored
    if (stored_user_data) 
    {
        // Parse the JSON string to get the user data as an object
        const parsed_user_data = JSON.parse(stored_user_data);

        // Check if the provided username matches any existing usernames
        if (username !== parsed_user_data.username) {
            document.getElementById("username_error").innerHTML = "Username does not exist";
            return false;
        }
        // Username exists, now check the password
        if (password !== parsed_user_data.password) {
            document.getElementById("password_error").innerHTML = "Incorrect password";
            return false;
        }
        
        // Username and password match
        return true;
    }
}   

