// Run this function when the window loads
window.onload = function() 
{
    // Get stored user data from local storage
    const storedUserData = localStorage.getItem('user_data');

    // Check if user data exists
    if (storedUserData) 
    {
        // Parse the stored user data into an array of objects
        const parsedUserData = JSON.parse(storedUserData);

        // Find the current user in the parsed user data using session storage
        const currentUser = parsedUserData.find(user => user.username === sessionStorage.getItem('username'));

        // If the current user exists
        if (currentUser) 
        {
            // Get elements to display the current user's best score and date
            const scoreNumberText = document.querySelector('.score-number-text');
            const dateText = document.querySelector('.date-text');

            // Set the HTML content to display the current user's best score and date
            scoreNumberText.innerHTML = currentUser.best_score;
            dateText.innerHTML = currentUser.date;
        }

        // Sort the user data based on best score using bubble sort
        const sortedUserData = bubbleSort(parsedUserData);

        // Store the sorted user data in local storage
        localStorage.setItem('sorted_user_data', JSON.stringify(sortedUserData));

        // Display the leaderboard with the sorted user data
        displayLeaderboard(sortedUserData);
    }
}

// Bubble sort function to sort user data based on best score
function bubbleSort(arr) 
{
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) 
    {
        for (let j = 0; j < length - i - 1; j++)
         {
            if (parseInt(arr[j].best_score) < parseInt(arr[j + 1].best_score))
            {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Function to display the leaderboard
function displayLeaderboard(sortedUserData) 
{
    // Get the table body element of the leaderboard
    const leaderboardTable = document.querySelector('.styled-table tbody');

    // Clear existing entries in the leaderboard
    leaderboardTable.innerHTML = '';

    // Display the top 10 users in the leaderboard
    for (let i = 0; i < Math.min(10, sortedUserData.length); i++) 
    {
        const user = sortedUserData[i];

        // Create a row for each user and insert it into the leaderboard table
        const row = `
            <tr>
                <td>${user.username}</td>
                <td>${user.date}</td>
                <td>${user.best_score}</td>
            </tr>
        `;
        leaderboardTable.insertAdjacentHTML('beforeend', row);
    }
}
