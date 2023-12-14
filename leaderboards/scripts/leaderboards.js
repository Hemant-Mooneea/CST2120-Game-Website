window.onload = function()
{
    const storedUserData = localStorage.getItem('user_data');

    if (storedUserData)
    {
        const parsedUserData = JSON.parse(storedUserData);
        const currentUser = parsedUserData.find(user => user.username === sessionStorage.getItem('username'));

        if (currentUser)
        {
            const scoreNumberText = document.querySelector('.score-number-text');
            const dateText = document.querySelector('.date-text');
            scoreNumberText.innerHTML = currentUser.best_score;
            dateText.innerHTML = currentUser.date;
        }


    }
}