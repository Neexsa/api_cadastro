const db = require('./db.js');
const query = require('./query.js')
const jwt = require('jsonwebtoken')
const SECRET = '@NEEXSA'

exports.clientes = async (req, res, next) => {
    try{
        const body = req.body
        const params = {
            nomePesquisa: body.nomePesquisa
        }
        let cql = query.cql.Clientes;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar os cliente'})
    }
}

exports.novoClientes = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            novoNomeCliente: body.novoNomeCliente
        }
        let cql = query.cql.NovoClientes;
        await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send({mensagem: 'Cliente salvo com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel fazer cadastro'})
    }
}

exports.projetos = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            dataInicio: body.dataInicio,
            textoPesquisar: body.textoPesquisar
        }
        let cql = query.cql.Projetos;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar os projetos'})
    }
}

exports.novoProjeto = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            novoNomeProjeto: body.novoNomeProjeto,
            dataInicio: body.dataInicio
        }
        let cql = query.cql.NovoProjeto;
        await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send({mensagem: 'Projeto salvo com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel fazer cadastro do projeto'})
    }
}

exports.alterarStatusProjeto = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            nomeProjeto: body.nomeProjeto,
            status: body.status
        }
        let cql = query.cql.PausarProjeto;
        await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send({mensagem: 'Status do projeto alterado com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel alterar o status do projeto'})
    }
}

exports.rdos = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            dataInicio: body.dataInicio ? body.dataInicio : null,
            textoPesquisar: body.textoPesquisar ? body.textoPesquisar : ''
        }
        let cql = query.cql.Rdos;
        let result = await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar as RDOs'})
    }
}

exports.novoRdo = async (req, res, next) => {
    try{
        let body = req.body
        let params = {
            nomeCliente: body.nomeCliente,
            nomeProjetos: body.nomeProjetos,
            dateInicio: body.dateFormatted,
            idRDO: body.dataIDRDO
        }
        let cql = query.cql.NovoRdo;
        await db.neo4j.executeCypherAsync(cql, params)
        res.status(200).send({mensagem: 'RDO salvo com sucesso'})
    }catch (e){
        res.status(500).send({message: 'Não foi possivel fazer cadastro do RDO'})
    }
}

exports.dominioClientes = async (req, res, next) => {
    try{
        let cql = query.cql.DominioClientes;
        let result = await db.neo4j.executeCypherAsync(cql)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar as RDOs'})
    }
}

exports.dominioProjetosClientes = async (req, res, next) => {
    try{
        let cql = query.cql.DominioProjetosClientes;
        let result = await db.neo4j.executeCypherAsync(cql)
        res.status(200).send(result)
    }catch (e){
        res.status(500).send({resposta: e, message: 'Não foi possivel buscar as RDOs'})
    }
}