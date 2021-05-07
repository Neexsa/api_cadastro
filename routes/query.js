exports.cql = {
    Clientes: `
        MATCH (c:Cliente)
        WHERE toUpper(c.nome) CONTAINS toUpper($nomePesquisa)
        OPTIONAL MATCH (c)<-[:PROJETO_DA]-(p:Projeto)
        WITH count(p) as quantidade, c
        RETURN collect({cliente: c{.*}, quantidadeProjetos: toFloat(quantidade)})
    `,

    NovoClientes:`
        MERGE (c:Cliente {nome: $novoNomeCliente})
    `,

    NovoProjeto: `
        WITH $novoNomeProjeto AS pNovoNome, $dataInicio AS pDataInicio, $nomeCliente AS pNomeCliente
        MERGE (:Projeto {nome: pNovoNome, dataInicio: pDataInicio, ativo: true, pausado: false})
        WITH pNovoNome, pDataInicio, pNomeCliente
        MATCH (c:Cliente), (p:Projeto)
        WHERE c.nome = pNomeCliente AND p.nome = pNovoNome AND p.dataInicio = pDataInicio
        CREATE (c)<-[:PROJETO_DA]-(p)
    `,

    Projetos: `
        WITH $nomeCliente AS pNomeCliente, 
        coalesce($dataInicio, -30599326412000) AS pDataInicio,
        coalesce($textoPesquisar, '') AS pTextoPesquisa

        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto)
        WHERE c.nome = pNomeCliente AND p.dataInicio >= pDataInicio AND p.nome CONTAINS pTextoPesquisa
        RETURN collect(p{.*, dataInicioInter: toFloat(p.dataInicio)}) as projetos
    `,

    PausarProjeto: `
        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto)
        WHERE c.nome = $nomeCliente AND p.nome = $nomeProjeto
        SET p.pausado = $status
    `,

    Rdos: `
        WITH coalesce($dataInicio, -30599326412000) AS pDataInicio,
        $textoPesquisar AS pTextoPesquisar
        MATCH (r:RDO)
        WHERE r.dataInicio >= pDataInicio 
        AND (toUpper(r.cliente) CONTAINS toUpper(pTextoPesquisar) 
        OR toUpper(r.projeto) CONTAINS toUpper(pTextoPesquisar))
        RETURN collect(r{.*})
    `,

    NovoRdo: `
        WITH $nomeCliente AS pNomeCliente,
            $nomeProjetos AS pNomeProjetos,
            $dateInicio AS pDateInicio,
            $idRDO AS pIdRDO

        MERGE (:RDO {
            cliente: pNomeCliente,
            projeto: pNomeProjetos,
            dataInicio: pDateInicio,
            id_rdo: pIdRDO
        })

        WITH pNomeCliente, pNomeProjetos, pIdRDO

        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto), (r:RDO)
        WHERE c.nome = pNomeCliente AND p.nome = pNomeProjetos AND r.id_rdo = pIdRDO

        CREATE (p)<-[:RDO_DA]-(r)
    `,

    DominioClientes: `
        MATCH (c:Cliente)
        RETURN collect(c.nome)
    `,

    DominioProjetosClientes: `
        MATCH (c:Cliente)<-[:PROJETO_DA]-(p:Projeto)
        RETURN collect({cliente: c{.*}, projeto: p{.*}})
    `
}