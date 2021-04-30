exports.cql = {
    Login:`
        MATCH (u:User) 
        WHERE u.email = $email AND u.senha = $senha
        RETURN collect(u)
    `,

    Auth:`
        MATCH (u:User) 
        WHERE u.uid = $uid
        RETURN collect(u)
    `,
    CeiarConta:`
        MERGE (u:User {email: $email})
        SET u.senha = $seha
        RETURN collect(u)
    `
}