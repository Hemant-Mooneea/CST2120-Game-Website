window.onload = function() {
    const storedUserData = localStorage.getItem('user_data');

    if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        const currentUser = parsedUserData.find(user => user.username === sessionStorage.getItem('username'));

        if (currentUser) {
            const scoreNumberText = document.querySelector('.score-number-text');
            const dateText = document.querySelector('.date-text');
            scoreNumberText.innerHTML = currentUser.best_score;
            dateText.innerHTML = currentUser.date;
            
        }
        const sortedUserData = bubbleSort(parsedUserData);
        localStorage.setItem('sorted_user_data', JSON.stringify(sortedUserData));
        displayLeaderboard(sortedUserData);
    }
}

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
function displayLeaderboard(sortedUserData)
{
    const leaderboardTable = document.querySelector('.styled-table tbody');
    leaderboardTable.innerHTML = ''; // Clear existing entries

    for (let i = 0; i < Math.min(10, sortedUserData.length); i++) {
        const user = sortedUserData[i];
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
