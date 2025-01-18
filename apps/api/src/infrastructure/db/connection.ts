import { connect } from "@tidbcloud/serverless";
import { env } from "../../env.js";
import { drizzle } from "drizzle-orm/singlestore";
import { drizzle as TiDBdrizzle }  from 'drizzle-orm/tidb-serverless';

const getDatabaseConfig = () => {
  if (env.NODE_ENV === "local") {
    return {
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      port: parseInt(env.DB_PORT),
    };
  }

  return {
    url: env.TIDB_URL,
    username: env.TIDB_USER,
    password: env.TIDB_PASSWORD,
  };
};

export const useConnection = async () => {
  const config = getDatabaseConfig();

  if (env.NODE_ENV === "local") {
    const mysql = await import("mysql2/promise");
    const connection = mysql.createPool(config);
    return drizzle({ client: connection });
  }

  const connection = connect(config);
  return TiDBdrizzle({ client: connection });
}
