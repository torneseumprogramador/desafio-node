function adicionarProduto() {
  const container = document.getElementById('produtos-container');
  const template = container.querySelector('.produto-item').cloneNode(true);
  
  // Limpar valores
  template.querySelector('.produto-select').value = '';
  template.querySelector('.quantidade-input').value = '';
  template.querySelector('.valor-total').value = '';
  
  // Atualizar índices
  template.querySelector('.produto-select').name = `produtos[${produtoCount}][produto_id]`;
  template.querySelector('.quantidade-input').name = `produtos[${produtoCount}][quantidade]`;
  
  // Mostrar botão de remover
  template.querySelector('.remove-produto').style.display = 'block';
  
  container.appendChild(template);
  produtoCount++;
}

function calcularValorTotal() {
  const valores = Array.from(document.querySelectorAll('.valor-total'))
    .map(input => parseFloat(input.value.replace("R$", "")) || 0);
  
  const total = valores.reduce((acc, curr) => acc + curr, 0);
  document.getElementById('valor_total_pedido').value = `R$ ${total.toFixed(2)}`;
}

function calcularValorProduto(produtoItem) {
  const select = produtoItem.querySelector('.produto-select');
  const quantidade = produtoItem.querySelector('.quantidade-input');
  const valorTotal = produtoItem.querySelector('.valor-total');
  
  const valor = parseFloat(select.selectedOptions[0]?.dataset.valor || 0);
  const qtd = parseInt(quantidade.value) || 0;
  
  valorTotal.value = `R$ ${(valor * qtd).toFixed(2)}`;
  calcularValorTotal();

  quantidade.focus();
}

let produtoCount = 0;

document.addEventListener('DOMContentLoaded', function() {
  produtoCount = document.querySelector('.produto-item') ? 1 : 0;

  // Eventos para o primeiro produto
  const primeiroProduto = document.querySelector('.produto-item');
  if (primeiroProduto) {
    primeiroProduto.querySelector('.produto-select').addEventListener('change', function() {
      calcularValorProduto(primeiroProduto);
    });
    
    primeiroProduto.querySelector('.quantidade-input').addEventListener('input', function() {
      calcularValorProduto(primeiroProduto);
    });
  }

  // Evento para remover produtos
  document.addEventListener('click', function(e) {
    if (e.target.closest('.remove-produto')) {
      const produtoItem = e.target.closest('.produto-item');
      produtoItem.remove();
      calcularValorTotal();
    }
  });

  // Evento para adicionar eventos aos novos produtos
  document.getElementById('produtos-container').addEventListener('change', function(e) {
    if (e.target.classList.contains('produto-select')) {
      calcularValorProduto(e.target.closest('.produto-item'));
    }
  });

  document.getElementById('produtos-container').addEventListener('input', function(e) {
    if (e.target.classList.contains('quantidade-input')) {
      calcularValorProduto(e.target.closest('.produto-item'));
    }
  });
}); 