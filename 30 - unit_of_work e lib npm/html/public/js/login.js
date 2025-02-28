const login = document.getElementById("login");
if(login){
    login.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const logado = document.getElementById("logado").checked;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("usuario", JSON.stringify({
                    nome: data.usuario.nome,
                    email: data.usuario.email,
                }));
                localStorage.setItem("token", data.token);
                if(logado){
                    const agora = new Date();
                    const expiraEm = agora.getTime() + 60000 * 60; // 1 hora para refazer token
                    localStorage.setItem("refresh_token_expira", expiraEm);
                }
                window.location.href = "/usuarios/index.html";
            } else {
                mostrarErro(data.mensagem);
            }
        } catch (error) {
            mostrarErro("Erro ao conectar com o servidor");
            console.error("Erro:", error);
        }
    });
}

const recuperarSenha = document.getElementById("recuperar-senha");
if(recuperarSenha){
    recuperarSenha.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;

        try {
            const response = await fetch(`${API_URL}/login/esqueci-senha`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                mostrarSucesso("Enviamos a senha para seu email");
            } else {
                mostrarErro(data.mensagem);
            }
        } catch (error) {
            mostrarErro("Erro ao conectar com o servidor");
            console.error("Erro:", error);
        }
    });
}

const cadastrar = document.getElementById("cadastrar");
if(cadastrar){
    cadastrar.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const endereco = document.getElementById("endereco").value;
        const senha = document.getElementById("senha").value;
        const csenha = document.getElementById("csenha").value;

        if(senha != csenha){
            mostrarErro("Senha não bate com a confirmação de senha");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/login/cadastrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nome, email, endereco, senha, csenha })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("usuario", JSON.stringify({
                    nome: data.usuario.nome,
                    email: data.usuario.email,
                }));
                localStorage.setItem("token", data.token);
                window.location.href = "/usuarios/index.html";
            } else {
                mostrarErro(data.mensagem);
            }
        } catch (error) {
            mostrarErro("Erro ao conectar com o servidor");
            console.error("Erro:", error);
        }
    });
}

const mostrarSucesso = (mensagem) => {
    if(document.getElementById("erroMessage")) document.getElementById("erroMessage").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
    document.getElementById("successMessage").innerHTML = mensagem;
}

const mostrarErro = (mensagem) => {
    if(document.getElementById("successMessage")) document.getElementById("successMessage").style.display = "none";
    document.getElementById("erroMessage").style.display = "block";
    document.getElementById("erroMessage").innerHTML = mensagem;
}