let debounceTimer;

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
});
