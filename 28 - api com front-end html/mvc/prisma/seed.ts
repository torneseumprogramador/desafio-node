import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.usuario.createMany({
        data: [
            {
                nome: "Danilo Aparecido",
                endereco: "Rua A, 123",
                email: "danilo@email.com",
                senha: "123456",
            },
            {
                nome: "João Silva",
                endereco: "Avenida B, 456",
                email: "joao@email.com",
                senha: "654321",
            },
            {
                nome: "Maria Oliveira",
                endereco: "Praça C, 789",
                email: "maria@email.com",
                senha: "987654",
            }
        ]
    });

    console.log("Seed executado com sucesso!");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
