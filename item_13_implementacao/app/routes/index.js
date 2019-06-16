var express = require('express')
var router = express.Router()

var controller = require('../controllers/index')

router.get('/', controller.home)
router.all('/eventos', controller.eventos)
router.post('/ingresso', controller.ingresso)

module.exports = router