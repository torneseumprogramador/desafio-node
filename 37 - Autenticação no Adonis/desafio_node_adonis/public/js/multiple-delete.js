// Função para selecionar/deselecionar todos os checkboxes
document.getElementById('selectAll').addEventListener('change', function() {
  const checkboxes = document.querySelectorAll('.cliente-checkbox');
  checkboxes.forEach(checkbox => checkbox.checked = this.checked);
  updateDeleteButton();
});

// Função para atualizar o botão de exclusão múltipla
function updateDeleteButton() {
  const checkboxes = document.querySelectorAll('.cliente-checkbox:checked');
  const deleteBtn = document.getElementById('deleteSelectedBtn');
  deleteBtn.style.display = checkboxes.length > 0 ? 'inline-flex' : 'none';
}

// Adicionar evento de mudança para cada checkbox
document.querySelectorAll('.cliente-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', updateDeleteButton);
});

// Funções do modal de exclusão múltipla
function openDeleteMultipleModal() {
  const checkboxes = document.querySelectorAll('.cliente-checkbox:checked');
  document.getElementById('quantidadeClientes').textContent = checkboxes.length;
  document.getElementById('deleteMultipleModal').style.display = 'block';
}

function closeDeleteMultipleModal() {
  document.getElementById('deleteMultipleModal').style.display = 'none';
}

function confirmarExclusaoMultipla() {
  const checkboxes = document.querySelectorAll('.cliente-checkbox:checked');
  const ids = Array.from(checkboxes).map(checkbox => checkbox.value);
  
  debugger
  // Preenche o input hidden com os IDs
  document.getElementById('selectedIds').value = JSON.stringify(ids);
  
  // Submete o formulário
  document.getElementById('deleteMultipleForm').submit();
} 