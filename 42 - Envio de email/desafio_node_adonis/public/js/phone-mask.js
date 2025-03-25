document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('input[name="whatsapp"]');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            // Formata o número conforme a quantidade de dígitos
            if (value.length <= 10) {
                // Formato: (00) 0000-0000
                if (value.length > 6) {
                    this.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
                } else if (value.length > 2) {
                    this.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length > 0) {
                    this.value = `(${value}`;
                }
            } else {
                // Formato: (00) 00000-0000
                this.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        });

        // Limpa formatação ao focar no campo
        phoneInput.addEventListener('focus', function() {
            if (!this.value) return;
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            this.value = value;
        });

        // Reaplica formatação ao sair do campo
        phoneInput.addEventListener('blur', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            if (!value) return;

            if (value.length <= 10) {
                // Formato: (00) 0000-0000
                if (value.length > 6) {
                    this.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
                } else if (value.length > 2) {
                    this.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else {
                    this.value = `(${value}`;
                }
            } else {
                // Formato: (00) 00000-0000
                this.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
        });
    }
}); 