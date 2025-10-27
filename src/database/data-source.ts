import { DataSource } from "typeorm";
const env = {
  host: (process.env.DATABASE_HOST || 'localhost'),
  port: +(process.env.DATABASE_PORT || 5432),
  username: (process.env.DATABASE_USER || 'postgres'),
  password: (process.env.DATABASE_PASSWORD || 'password'),
  database: (process.env.DATABASE_DB || 'movie_lib')
}

export default new DataSource({
  type: "postgres",
  host: env.host,
  port: env.port,
  username: env.username,
  password: env.password,
  database: env.database,
  entities: [
    __dirname + '/**/*.entity{.ts,.js}'
  ],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
})
