document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.querySelector('input[name="cep"]');
    
    if (cepInput) {
        cepInput.addEventListener('blur', async function() {
            let cep = this.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                return;
            }

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    alert('CEP não encontrado');
                    return;
                }

                // Preenche os campos com os dados retornados
                document.querySelector('input[name="logradouro"]').value = data.logradouro || '';
                document.querySelector('input[name="bairro"]').value = data.bairro || '';
                document.querySelector('input[name="cidade"]').value = data.localidade || '';
                document.querySelector('input[name="estado"]').value = data.uf || '';

                // Foca no campo número após preencher o endereço
                document.querySelector('input[name="numero"]').focus();

            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar o CEP. Tente novamente.');
            }
        });

        // Formata o CEP enquanto digita
        cepInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            
            if (value.length > 5) {
                this.value = `${value.slice(0, 5)}-${value.slice(5)}`;
            } else {
                this.value = value;
            }
        });
    }
}); 