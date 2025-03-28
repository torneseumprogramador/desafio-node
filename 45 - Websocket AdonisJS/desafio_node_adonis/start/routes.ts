
import Route from '@ioc:Adonis/Core/Route'

// Rotas públicas
Route.get('/login', 'AuthController.showLogin').as('auth.login')
Route.post('/login', 'AuthController.login')
Route.get('/forgot-password', 'AuthController.showForgotPassword').as('auth.forgotPassword')
Route.post('/forgot-password', 'AuthController.forgotPassword')
Route.get('/reset-password', 'AuthController.showResetPassword').as('auth.resetPassword')
Route.post('/reset-password', 'AuthController.resetPassword')

Route.get('/teste-ws', 'TesteWsController.index').as('teste-ws.index')

// Grupo de rotas protegidas
Route.group(() => {
  Route.get('/', 'HomeController.index')
  
  // Rotas de clientes
  Route.get('/clientes', 'ClientesController.index').as('clientes.index')
  Route.get('/clientes/novo', 'ClientesController.create')
  Route.post('/clientes', 'ClientesController.store')
  Route.get('/clientes/json', 'ClientesController.indexJson')
  Route.get('/clientes/:id', 'ClientesController.show')
  Route.get('/clientes/:id/edit', 'ClientesController.edit')
  Route.post('/clientes/multiple-delete', 'ClientesController.destroyMultiple')
  Route.post('/clientes/:id', 'ClientesController.update')
  Route.get('/clientes/:id/delete', 'ClientesController.destroy')
  
  // Rotas de administradores
  Route.get('/administradores', 'AdministradoresController.index').as('administradores.index')
  Route.get('/administradores/novo', 'AdministradoresController.create')
  Route.post('/administradores', 'AdministradoresController.store')
  Route.get('/administradores/:id', 'AdministradoresController.show')
  Route.get('/administradores/:id/edit', 'AdministradoresController.edit')
  Route.post('/administradores/:id', 'AdministradoresController.update')
  Route.get('/administradores/:id/delete', 'AdministradoresController.destroy')

  // Rotas de produtos
  Route.get('/produtos', 'ProdutosController.index').as('produtos.index')
  Route.get('/produtos/novo', 'ProdutosController.create')
  Route.post('/produtos', 'ProdutosController.store')
  Route.get('/produtos/:id', 'ProdutosController.show')
  Route.get('/produtos/:id/edit', 'ProdutosController.edit')
  Route.post('/produtos/multiple-delete', 'ProdutosController.destroyMultiple')
  Route.post('/produtos/:id', 'ProdutosController.update')
  Route.get('/produtos/:id/delete', 'ProdutosController.destroy')

  // Rotas de pedidos
  Route.get('/pedidos', 'PedidosController.index').as('pedidos.index')
  Route.get('/pedidos/novo', 'PedidosController.new')
  Route.post('/pedidos', 'PedidosController.create')
  Route.get('/pedidos/:id', 'PedidosController.show')
  Route.get('/pedidos/:id/edit', 'PedidosController.edit')
  Route.get('/pedidos/:id/delete', 'PedidosController.destroy')
  Route.post('/pedidos/:id', 'PedidosController.update')
  
  // Rota de logout
  Route.post('/logout', 'AuthController.logout').as('auth.logout')

  // Rotas de upload de arquivos
  Route.get('/arquivos', 'UploadController.index')
  Route.post('/arquivos', 'UploadController.create')
  Route.get('/arquivos/novo', 'UploadController.new')
  Route.get('/arquivos/:file/delete', 'UploadController.destroy')
  Route.post('/arquivos/multiple-delete', 'UploadController.destroyMultiple')
}).middleware('auth')
