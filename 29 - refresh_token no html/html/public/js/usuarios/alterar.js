// Função para buscar parâmetros da URL
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Função para carregar os dados do usuário pelo ID
const carregarDadosUsuario = async () => {
    const userId = getQueryParam("id");

    if (!userId) {
        alert("ID do usuário não encontrado.");
        window.location.href = "/usuarios/index.html";
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado!");
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/usuarios/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const user = await response.json();

        if (response.ok) {
            document.getElementById("id").value = user.id;
            document.getElementById("nome").value = user.nome;
            document.getElementById("email").value = user.email;
            document.getElementById("endereco").value = user.endereco || "";
        } else {
            alert("Erro ao carregar usuário: " + (user.mensagem || "Tente novamente."));
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
    }
};

// Função para enviar as alterações do usuário
document.getElementById("alterarUsuario").addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
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

    const userData = { nome, email, endereco };
    if (senha) {
        userData.senha = senha; // Envia a senha apenas se for alterada
    }

    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Usuário atualizado com sucesso!");
            window.location.href = "/usuarios/index.html";
        } else {
            alert("Erro ao atualizar usuário: " + (result.mensagem || "Tente novamente."));
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
    }
});

// Carrega os dados do usuário ao abrir a página
carregarDadosUsuario();
