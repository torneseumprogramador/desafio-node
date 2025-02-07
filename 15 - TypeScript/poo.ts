class Pessoa {
    id: number;
    nome: string;
    telefone: string;
    endereco: string;
    notas: number[];

    constructor(id: number = 0) {
        this.id = id;
        this.nome = "";
        this.telefone = "";
        this.endereco = "";
        this.notas = [];
    }

    media(): number {
        this.logCalculoMedia();
        return this.notas.length > 0 ? this.somaDasNotas() / this.notas.length : 0;
    }

    private somaDasNotas(): number {
        return this.notas.reduce((acumulador, numero) => acumulador + numero, 0);
    }

    private logCalculoMedia(): void {
        console.log("Notas: ", this.notas);
        console.log("Soma das notas: ", this.somaDasNotas());
        console.log("Quantidade de notas: ", this.notas.length);
    }

    situacao(): string {
        const media = this.media();

        if (media >= 7) {
            return "Aprovado";
        } else if (media >= 5) {
            return "Recuperação";
        } else {
            return "Reprovado";
        }
    }

    static mensagem(): void {
        console.log("=====[É um método estático da classe Pessoa]====");
    }
}

// Aplicando herança com `extends`
class PessoaFisica extends Pessoa {
    cpf: string;

    constructor(id: number = 0, cpf: string = "") {
        super(id); // Chama o construtor da classe Pessoa
        this.cpf = cpf;
    }
}

class PessoaJuridica extends Pessoa {
    cnpj: string;

    constructor(id: number = 0, cnpj: string = "") {
        super(id); // Chama o construtor da classe Pessoa
        this.cnpj = cnpj;
    }
}

// Exemplo de uso
const pessoa1:PessoaFisica = new PessoaFisica(1, "123.456.789-00");
pessoa1.nome = "João";
pessoa1.notas = [8, 7, 9];
console.log(pessoa1);
console.log(pessoa1.media());

PessoaFisica.mensagem();

const pessoa2:PessoaJuridica = new PessoaJuridica(2, "123.456.323/0001-00");
pessoa2.nome = "Maria";
pessoa2.notas = [6, 5, 4];
console.log(pessoa2);
console.log(pessoa2.media());
