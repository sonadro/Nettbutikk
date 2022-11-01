const userNameText = document.querySelector('.userName');

const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
const userName = JSON.parse(localStorage.getItem('userName'))

if (loggedIn) {
    userNameText.textContent = userName;
}