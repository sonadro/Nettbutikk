const userNameText = document.querySelector('.userName');
const logInBtn = document.querySelector('.logInBtn');
const logOutBtn = document.querySelector('.logOutBtn');

const updateInfo = function() {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    const userName = JSON.parse(localStorage.getItem('userName'));

    if (loggedIn === true) {
        userNameText.textContent = userName;
        logInBtn.classList.add('d-none');
        userNameText.classList.remove('d-none');
        logOutBtn.classList.remove('d-none');
    } else {
        userNameText.textContent = null;
        logInBtn.classList.remove('d-none');
        userNameText.classList.add('d-none');
        logOutBtn.classList.add('d-none');
    }
}

updateInfo();

logOutBtn.addEventListener('click', () => {
    localStorage.setItem('loggedIn', false);
    localStorage.removeItem('userName');
    updateInfo();
});