const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Qual é o seu nome? ', (nome) => {
    rl.question('Qual é a sua idade? ', (idade) => {
        console.log('\nDados capturados:');
        console.log(`Nome: ${nome}`);
        console.log(`Idade: ${idade}`);
        
        rl.close();
    });
}); 