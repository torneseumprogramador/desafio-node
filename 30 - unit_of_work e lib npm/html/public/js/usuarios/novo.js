document.getElementById("cadastroUsuario").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const endereco = document.getElementById("endereco").value;

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado!");
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nome, email, senha, endereco })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "/usuarios/index.html"; // Redireciona para a listagem de usuários
        } else {
            alert("Erro ao cadastrar usuário: " + (result.mensagem || "Tente novamente."));
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
    }
});
