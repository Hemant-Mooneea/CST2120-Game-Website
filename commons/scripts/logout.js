function logout() 
{
    // Remove the isLoggedIn flag from sessionStorage
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("username");
}

// Check if the user is logged in when the page loads
window.onload = function() {
    const loginButton = document.querySelector(".login-button");

    // If the user is logged in, change the button text to "Logout"
    if (sessionStorage.getItem("isLoggedIn")) {
        loginButton.innerHTML = "<p class='login-text'>Logout</p>";
        loginButton.onclick = logout; // Call the logout function for the button
        loginButton.style.backgroundColor = "#CC3333"; // Change the background color to red
    }
};
