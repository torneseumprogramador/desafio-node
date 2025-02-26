let paginaAtual = 1;
let totalDePaginas = 1;

// Função para buscar usuários
const buscarUsuarios = async (event, pagina = 1) => {
    if(event) event.preventDefault();

    const nome = document.getElementById("nome").value;
    const dataInicio = document.getElementById("dataInicio").value;
    const dataFim = document.getElementById("dataFim").value;

    let params = new URLSearchParams();
    params.append("pagina", pagina); // Adiciona número da página na query string

    if (nome) params.append("nome", nome);
    if (dataInicio) params.append("dataInicio", dataInicio);
    if (dataFim) params.append("dataFim", dataFim);

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Você precisa estar logado!");
            window.location.href = "/login.html";
            return;
        }

        const response = await fetch(`${API_URL}/usuarios?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            atualizarTabela(result.usuarios);
            atualizarPaginacao(result.paginaCorrente, result.totalDePaginas);
        } else {
            alert("Erro ao buscar usuários: " + (result.mensagem || "Tente novamente."));
        }
    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

// Função para atualizar a tabela
const atualizarTabela = (usuarios) => {
    const tbody = document.getElementById("usuariosLista");
    tbody.innerHTML = "";

    if (usuarios.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center">Nenhum usuário encontrado.</td></tr>`;
        return;
    }

    usuarios.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.endereco || "Não informado"}</td>
            <td>${new Date(user.createdAt).toLocaleDateString("pt-BR")}</td>
            <td><a href="/usuarios/alterar.html?id=${user.id}" class="btn btn-warning">Alterar</a></td>
            <td><a href="javascript:apagar(${user.id})" class="btn btn-danger">Apagar</a></td>
        `;
        tbody.appendChild(tr);
    });
}

const apagar = async (id) => {
    if(confirm("Confirma exclusão?")){
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            buscarUsuarios();
        } else {
            alert("Erro ao apagar usuario");
        }
    }
}

// Função para atualizar a paginação
const atualizarPaginacao = (paginaCorrente, totalPaginas) => {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    paginaAtual = paginaCorrente;
    totalDePaginas = totalPaginas;

    // Botão "Anterior"
    const prevClass = paginaCorrente === 1 ? "disabled" : "";
    pagination.innerHTML += `<li class="page-item ${prevClass}"><a class="page-link" href="#" onclick="buscarUsuarios(event, ${paginaCorrente - 1})">Anterior</a></li>`;

    // Números das páginas
    for (let i = 1; i <= totalPaginas; i++) {
        const activeClass = i === paginaCorrente ? "active" : "";
        pagination.innerHTML += `<li class="page-item ${activeClass}"><a class="page-link" href="#" onclick="buscarUsuarios(event, ${i})">${i}</a></li>`;
    }

    // Botão "Próximo"
    const nextClass = paginaCorrente === totalPaginas ? "disabled" : "";
    pagination.innerHTML += `<li class="page-item ${nextClass}"><a class="page-link" href="#" onclick="buscarUsuarios(event, ${paginaCorrente + 1})">Próximo</a></li>`;
}

// Inicializa a lista ao carregar a página
buscarUsuarios();

// Adiciona evento ao formulário de busca
document.getElementById("filtroUsuarios").addEventListener("submit", (event) => buscarUsuarios(event, 1));
