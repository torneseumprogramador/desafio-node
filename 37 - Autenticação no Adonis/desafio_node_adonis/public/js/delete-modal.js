let clienteIdParaExcluir = null;

function openDeleteModal(id, nome) {
  clienteIdParaExcluir = id;
  document.getElementById('clienteNome').textContent = nome;
  document.getElementById('deleteModal').classList.add('is-active');
  document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
  clienteIdParaExcluir = null;
  document.getElementById('deleteModal').classList.remove('is-active');
  document.getElementById('deleteModal').style.display = 'none';
}

function confirmarExclusao() {
  if (clienteIdParaExcluir) {
    const loadingButton = document.querySelector('.modal-card-foot .button.is-danger');
    loadingButton.classList.add('is-loading');
    
    window.location.href = `/clientes/${clienteIdParaExcluir}/delete`;
  }
  closeDeleteModal();
}

// Fechar modal com a tecla ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeDeleteModal();
  }
}); 