/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Rotas públicas
Route.get('/login', 'AuthController.showLogin').as('auth.login')
Route.post('/login', 'AuthController.login')

// Grupo de rotas protegidas
Route.group(() => {
  Route.get('/', 'HomeController.index')
  
  // Rotas de clientes
  Route.get('/clientes', 'ClientesController.index').as('clientes.index')
  Route.get('/clientes/novo', 'ClientesController.create')
  Route.post('/clientes', 'ClientesController.store')
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

  // Rota de logout
  Route.post('/logout', 'AuthController.logout').as('auth.logout')
}).middleware('auth')
