import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: 'sqlite',
    database: `${__dirname}/../../database.sqlite`,
    entities: [`${__dirname}/../entity/*.ts`],
    migrations: [`${__dirname}/../migration/*.js`],
    synchronize:  false, // Cria as tabelas automaticamente
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    }
}

export default config