import database from "infra/database.js";

async function status(request, response) {
  // const result = await database.query("SELECT 1 + 1 as sum;");

  const updatedAt = new Date().toISOString();

  const showMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(showMaxConnections.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const openedConnections = databaseOpenedConnectionsResult.rows[0].count;

  const version = await database.query("SHOW server_version;");

  // const pgMaxConnections = process.env.POSTGRES_HOST.max_connections;
  // console.log(pgMaxConnections);
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: maxConnections,
        opened_connections: openedConnections,
        version: version.rows[0].server_version,
      },
    },
  });
}

export default status;
