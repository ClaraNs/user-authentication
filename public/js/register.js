const passwordInput = document.querySelector('#user-password')

passwordInput.addEventListener("input", function () {
    const password = this.value;
    const strengthIndicator = document.querySelector('#password-strength-indicator');
    const strengthText = document.querySelector('#password-strength-text');
    let strength = 0;

    if (password.length >= 8)
        strength++;
    if (/[A-Z]/.test(password))
        strength++;
    if (/[0-9]/.test(password))
        strength++;
    if (/[^A-Za-z0-9]/.test(password))
        strength++;

    const width = (strength / 4) * 100;
    strengthIndicator.style.width = `${width}%`;

    switch (strength) {
        case 1:
            strengthIndicator.style.backgroundColor = "#e70b0b";
            strengthText.innerHTML = "Senha Fraca";
            break;
        case 2:
            strengthIndicator.style.backgroundColor = "#FFB74D";
            strengthText.innerHTML = "Senha Média";
            break;
        case 3:
            strengthIndicator.style.backgroundColor = "#FFF176";
            strengthText.innerHTML = "Senha Média";
            break;
        case 4:
            strengthIndicator.style.backgroundColor = "#81C784";
            strengthText.innerHTML = "Senha Forte";
            break;
        default:
            strengthIndicator.style.backgroundColor = "transparent";
            strengthText.innerHTML = "";
            break;
    }

});
/*let debounceTimer;

document.addEventListener('DOMContentLoaded', function () {
    const errorMessage = document.getElementById('error-message');

    document.getElementById('username').addEventListener('input', function () {
        const username = this.value;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (username.length > 0) {
                fetch(`/check-username?username=${encodeURIComponent(username)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.exists) {
                            errorMessage.textContent = 'Nome de usuário já existe. Tente outro.';
                            errorMessage.classList.add('error');
                        } else {
                            errorMessage.textContent = '';
                            errorMessage.classList.remove('error');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao verificar o nome de usuário:', error);
                    });
            }
        }, 300); // Atraso de 300ms

    });
});*/
