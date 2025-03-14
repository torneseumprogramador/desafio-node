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

Route.get('/', 'HomeController.index')
Route.get('/clientes', 'ClientesController.index').as('clientes.index')
Route.get('/clientes/novo', 'ClientesController.create')
Route.post('/clientes', 'ClientesController.store')
Route.get('/clientes/:id', 'ClientesController.show')
Route.get('/clientes/:id/edit', 'ClientesController.edit')
Route.post('/clientes/:id', 'ClientesController.update')
Route.get('/clientes/:id/delete', 'ClientesController.destroy')
