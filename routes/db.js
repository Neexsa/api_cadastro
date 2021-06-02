const config = require("./config.js");
const neo4j = require("neo4j-driver");


//
// Método privado genérico para execução de cypher query.
//
exports.neo4j = {
    executeCypherAsync: async function executeCypherAsync(cql, params) {
        let driver = neo4j.driver(
            config.neo4j_driver.url_bold, 
            neo4j.auth.basic(config.neo4j_driver.neo4j_user, config.neo4j_driver.neo4j_password));
        let session = driver.session();
        var result = await session.run(cql, params);
    
        session.close();
        driver.close();

        if (result && result.records && result.records.length > 0 && result.records[0]._fields && result.records[0]._fields.length > 0)
            return result.records[0]._fields[0];
        else
            return {}
    }
}