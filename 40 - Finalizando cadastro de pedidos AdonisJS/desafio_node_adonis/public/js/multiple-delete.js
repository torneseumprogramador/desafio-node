let itemTipoDeleteMultiple = null;

// Função para inicializar o tipo da entidade
function initMultipleDelete(tipo) {
  itemTipoDeleteMultiple = tipo;
}

// Função para selecionar/deselecionar todos os checkboxes
document.getElementById('selectAll').addEventListener('change', function() {
  const checkboxes = document.querySelectorAll(`.${itemTipoDeleteMultiple}-checkbox`);
  checkboxes.forEach(checkbox => checkbox.checked = this.checked);
  updateDeleteButton();
});

// Função para atualizar o botão de exclusão múltipla
function updateDeleteButton() {
  const checkboxes = document.querySelectorAll(`.${itemTipoDeleteMultiple}-checkbox:checked`);
  const deleteBtn = document.getElementById('deleteSelectedBtn');
  deleteBtn.style.display = checkboxes.length > 0 ? 'inline-flex' : 'none';
}

// Adicionar evento de mudança para cada checkbox
document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll(`.${itemTipoDeleteMultiple}-checkbox`);
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateDeleteButton);
  });
});

// Funções do modal de exclusão múltipla
function openDeleteMultipleModal() {
  const checkboxes = document.querySelectorAll(`.${itemTipoDeleteMultiple}-checkbox:checked`);
  const modal = document.getElementById('deleteMultipleModal');
  const quantidadeElement = modal.querySelector('[data-quantidade]');
  const form = modal.querySelector('#deleteMultipleForm');
  
  quantidadeElement.textContent = checkboxes.length;
  form.action = `/${itemTipoDeleteMultiple}s/multiple-delete`;
  modal.style.display = 'block';
}

function closeDeleteMultipleModal() {
  document.getElementById('deleteMultipleModal').style.display = 'none';
}

function confirmarExclusaoMultipla() {
  const checkboxes = document.querySelectorAll(`.${itemTipoDeleteMultiple}-checkbox:checked`);
  const ids = Array.from(checkboxes).map(checkbox => checkbox.value);
  
  // Preenche o input hidden com os IDs
  document.getElementById('selectedIds').value = JSON.stringify(ids);
  
  // Submete o formulário
  document.getElementById('deleteMultipleForm').submit();
} 