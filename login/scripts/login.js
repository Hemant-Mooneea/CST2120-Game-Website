function getLoginData() {
    // Get the input data from the fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    document.getElementById("username_error").innerHTML = " ";
    document.getElementById("password_error").innerHTML = " ";

    if (!(checkUserCredentials(username, password))) {
        return false;
    }
    window.location.href = "../homepage/homepage.html";
}

function checkUserCredentials(username, password) {
    const storedUserData = localStorage.getItem('user_data');

    // Check if any user data is stored
    if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);

        // Find the user with the provided username
        const foundUser = parsedUserData.find(user => user.username === username);

        if (!foundUser) {
            document.getElementById("username_error").innerHTML = "Username does not exist";
            return false;
        }

        // Username exists, check the password
        if (foundUser.password !== password) {
            document.getElementById("password_error").innerHTML = "Incorrect password";
            return false;
        }

        // Username and password match, set sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);

        return true;
    }
}
