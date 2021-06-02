const express = require('express');
const router = express.Router();
var controller = require("./controller");

router.get('/', async function (req, res, next) {
    res.status(200).send("Root Response from :3030/api_cadastro")
    return 700000;
})

router.post('/login', controller.login)
router.get('/load-session', controller.loadSession)
router.post('/auth', controller.auth)

module.exports = router;