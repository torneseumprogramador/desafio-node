const sair = () => {
    localStorage.clear();
    window.location.href = "/login.html"
}

const logado = localStorage.getItem("token")
if(!logado) {
    sair()
}