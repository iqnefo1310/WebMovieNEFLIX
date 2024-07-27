document.addEventListener('DOMContentLoaded', function() {
    const showPasswordToggle = document.getElementById('showtg');
    const passwordInput = document.getElementById('inpt-pas');
    const icon = showPasswordToggle.querySelector('.bx-show');

    showPasswordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.style.color = '#6e6767'; // Change icon color when showing password
        } else {
            passwordInput.type = 'password';
            icon.style.color = ''; // Reset icon color
        }
    });
});
