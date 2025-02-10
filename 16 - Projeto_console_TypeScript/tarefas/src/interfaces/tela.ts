const Tela = {
    limparTela: () : void => {
        console.clear(); // Limpa a tela no terminal do Node.js
        process.stdout.write('\x1B[2J\x1B[0f'); // Move o cursor para o topo e limpa a tela
    },
    esperePor: (segundos: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, segundos * 1000));
    },
    mensagemPor: async (mensagem: string, segundos: number) : Promise<void> => {
        Tela.limparTela()
        console.log(mensagem);
        await Tela.esperePor(segundos);
        Tela.limparTela()
    }
}

export default Tela;
