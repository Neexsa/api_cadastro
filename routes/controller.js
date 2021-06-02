const db = require('./db.js');
const query = require('./query.js')
const jwt = require('jsonwebtoken')
const SECRET = '@NEEXSA'

exports.login = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            email: body.email,
            senha: body.senha
        }
        let cql = query.cql.Login;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        const user = result[0].properties
        const token = jwt.sign(user, SECRET)
        res.status(200).send({user: user, token: token, message: 'Login efetuado com sucesso'})
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel fazer o login, verifique seu email e senha!!!'})
    }
};

exports.loadSession = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: 'Sua sessão é inválida ou está expirada' })
        return
      }

      res.status(200).send({
        token,
        user: decoded
      })
    })
}

exports.auth = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            uid: body.uid
        }
        let cql = query.cql.Auth;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        if (result.length > 0){
            res.send('Logado')
        } else {
            res.send('Não logado')
        }
        
    }catch (e){
        console.log(e)
    }
    
};