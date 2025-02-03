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
    try{
        const usuario = await login("danilo", "123456");
        // const r = await usuarioLogadoTime(usuario, "- mostre em paralelo"); // esperar 
        // console.log(r);
        usuarioLogadoTime(usuario, "- mostre em paralelo").then((r) => console.log(r)); // em paralelo
        
        for(let i=0; i<10; i++){
            console.log(`I: ${i}`);
        }
    }
    catch(e){
        console.log(e)
    }
}

executar();