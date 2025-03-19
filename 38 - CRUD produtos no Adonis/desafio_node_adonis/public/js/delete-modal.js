let itemIdParaExcluir = null;
let itemTipo = null;

function openDeleteModal(id, nome, tipo) {
  itemIdParaExcluir = id;
  itemTipo = tipo;
  document.getElementById('itemNome').textContent = nome;
  document.getElementById('deleteModal').classList.add('is-active');
  document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
  itemIdParaExcluir = null;
  itemTipo = null;
  document.getElementById('deleteModal').classList.remove('is-active');
  document.getElementById('deleteModal').style.display = 'none';
}

function confirmarExclusao() {
  if (itemIdParaExcluir && itemTipo) {
    const loadingButton = document.querySelector('.modal-card-foot .button.is-danger');
    loadingButton.classList.add('is-loading');
    
    window.location.href = `/${itemTipo}/${itemIdParaExcluir}/delete`;
  }
  closeDeleteModal();
}

// Fechar modal com a tecla ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeDeleteModal();
  }
}); 