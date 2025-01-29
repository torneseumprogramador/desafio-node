const Tela = {
    limparTela: () => {
        console.clear(); // Limpa a tela no terminal do Node.js
        process.stdout.write('\x1B[2J\x1B[0f'); // Move o cursor para o topo e limpa a tela
    },
    esperePor: (segundos) => {
        return new Promise(resolve => setTimeout(resolve, segundos * 1000));
    },
    mensagemPor: async (mensagem, segundos) => {
        Tela.limparTela()
        console.log(mensagem);
        await Tela.esperePor(segundos);
        Tela.limparTela()
    }
}

module.exports = Tela;
