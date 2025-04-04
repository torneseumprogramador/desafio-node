import router from '@adonisjs/core/services/router'

// Rota Home
router.get('/', '#controllers/home_controller.index')

// Rotas de produtos
router.group(() => {
    router.get('/', '#controllers/produtos_controller.index').as('produtos.index')
    router.get('/:id', '#controllers/produtos_controller.show')
}).prefix('/produtos')

// Rotas de categorias
router.group(() => {
    router.get('/', '#controllers/categorias_controller.index').as('categorias.index')
    router.get('/:id', '#controllers/categorias_controller.show')
}).prefix('/categorias')
