const authEmail = "admin@admin.com";
    const authPassword = "123";

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("password").value.trim();

        if (email === authEmail && senha === authPassword) {
            alert("SUCESSO! Login realizado.");
        } else {
            alert("Erro! E-mail ou senha incorretos.");
        }
    });