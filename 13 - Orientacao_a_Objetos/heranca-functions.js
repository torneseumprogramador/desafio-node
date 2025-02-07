function Pessoa(id = 0) {
    this.id = id;
    this.nome = "";
    this.telefone = "";
    this.endereco = "";
    this.notas = [];

    this.media = function () {
        logCalculoMedia.call(this);

        return this.notas.length > 0
            ? somaDasNotas.call(this) / this.notas.length
            : 0;
    };

    function somaDasNotas() {
        return this.notas.reduce((acumulador, numero) => acumulador + numero, 0);
    }

    function logCalculoMedia() {
        console.log("Notas: ", this.notas);
        console.log("Soma das notas: ", somaDasNotas.call(this));
        console.log("Quantidade de notas: ", this.notas.length);
    }

    this.situacao = function () {
        const media = this.media();

        if (media >= 7) {
            return "Aprovado";
        } else if (media >= 5) {
            return "Recuperação";
        } else {
            return "Reprovado";
        }
    };
}

// Método estático (associado ao próprio construtor)
Pessoa.mensagem = function () {
    console.log("=====[é um método estático da função Pessoa]====");
};

// Pessoa.prototype.mensagem2 = function () {
//     console.log("=====[é um método estático da função Pessoa]====");
// };

// const p = new Pessoa()
// p.mensagem2()

// Criando a função construtora para PessoaFisica (herança via protótipo)
function PessoaFisica(id = 0, cpf = "") {
    Pessoa.call(this, id); // Chamando o "super"
    this.cpf = cpf;
}

// Configurando a herança do protótipo
PessoaFisica.prototype = Object.create(Pessoa.prototype);
PessoaFisica.prototype.constructor = PessoaFisica;

// Criando a função construtora para PessoaJuridica (herança via protótipo)
function PessoaJuridica(id = 0, cnpj = "") {
    Pessoa.call(this, id); // Chamando o "super"
    this.cnpj = cnpj;
}

// Configurando a herança do protótipo
PessoaJuridica.prototype = Object.create(Pessoa.prototype);
PessoaJuridica.prototype.constructor = PessoaJuridica;

// Exemplo de uso
const pessoa1 = new PessoaFisica(1, "123.456.789-00");
pessoa1.nome = "João";
pessoa1.notas = [8, 7, 9];

console.log(pessoa1);
console.log(pessoa1.media());

// pessoa1.logCalculoMedia(); // Ilegal, pois a função é privada dentro da função construtora
// pessoa1.mensagem(); // Ilegal, pois é um método estático da função Pessoa
Pessoa.mensagem();

// Exemplo de uso com PessoaJuridica
const pessoa2 = new PessoaJuridica(1, "123.456.323/0001-00");
pessoa2.nome = "Empresa X";
pessoa2.notas = [8, 7, 9];

console.log(pessoa2);
console.log(pessoa2.media());
