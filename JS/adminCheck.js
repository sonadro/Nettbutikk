const adminForm = document.querySelector('.adminForm');
const pwInput = document.querySelector('.adminPw');

const adminLogin = function(password) {
    db.collection('security').get().then(snapshot => {
        const adminPw = snapshot.docs[0].data().adminPassword;
        if (password === adminPw) {
            console.log('logged in');
        } else {
            console.warn('You silly sausage, trying to get in to my admin site?');
            window.location.replace('http://127.0.0.1:5500/index.html');
        }
    }).catch(err => {
        console.error(err);
    });
}

adminForm.addEventListener('submit', e => {
    e.preventDefault();
    adminLogin(pwInput.value);
});