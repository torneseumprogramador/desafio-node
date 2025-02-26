document.getElementById("login").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        localStorage.setItem("usuario", JSON.stringify({
            nome: data.usuario.nome,
            email: data.usuario.email,
        }));
        localStorage.setItem("token", data.token);

        if (response.ok) {
            window.location.href = "/usuarios/index.html";
        } else {
            mostrarErro(data.mensagem);
        }
    } catch (error) {
        mostrarErro("Erro ao conectar com o servidor");
        console.error("Erro:", error);
    }
});


const mostrarErro = (mensagem) => {
    document.getElementById("erroMessage").style.display = "block";
    document.getElementById("erroMessage").innerHTML = mensagem;
}