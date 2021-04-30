var appConfigs = require('../app-services-config');
const neo4j = require("neo4j-driver").v1;

exports.neo4j_driver = {}
exports.neo4j_driver.url_bold = appConfigs.configs.api_split_convert_pdf.url_neo4j_bolt
exports.neo4j_driver.neo4j_user = appConfigs.configs.api_split_convert_pdf.neo4j_user
exports.neo4j_driver.neo4j_password = appConfigs.configs.api_split_convert_pdf.neo4j_password