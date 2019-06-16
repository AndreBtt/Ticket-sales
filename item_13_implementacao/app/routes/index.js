var express = require('express')
var router = express.Router()

var controller = require('../controllers/index')

router.get('/', controller.home)
router.post('/criarEvento', controller.criarEvento)
router.post('/comprarIngresso', controller.comprarIngresso)
router.post('/buscarEvento', controller.buscarEvento)

module.exports = router