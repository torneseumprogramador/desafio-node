// === O que é a classe Promisse ? =====
// Uma promessa de entrega

function login(login, senha) {
    return new Promise((resolve, reject) => {
        if(login == "danilo"  && senha == "123456"){
            setTimeout(() => {
                resolve({
                    id: 1,
                    nome: "Danilo",
                    token: "258756287653825kjshdkgfskdghvkiu1t23"
                });
            }, 3000);
            return;
        }

        setTimeout(() => {
            reject("Usuário ou senha inválidos");
        }, 1000);
    });
}


function usuarioLogadoTime(usuario, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${usuario.nome} levou o tem pode: ${time}`);
        }, 3000);
    });
}

const executar = async () => {
    console.log(" == código Haduken == ");
    login("danilo", "123456").then((usuario) => {
        usuarioLogadoTime(usuario, "10 segundos (Haduken)").then((retorno)=> {
            console.log(retorno);
        }).catch((erro) => {
            console.log(erro);
        });
    }).catch((erro) => {
        console.log(erro);
    });


    console.log(" == async await (código linear) == ");
    try{
        const usuario = await login("danilo", "1234567");
        const retorno = await usuarioLogadoTime(usuario, "10 segundos (Linear)");
        console.log(retorno);
    }
    catch(e){
        console.log(e)
    }
}

executar();