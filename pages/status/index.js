import useSWR from "swr";

async function fecthAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DependenciesData />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status", fecthAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DependenciesData() {
  const { isLoading, data } = useSWR("api/v1/status", fecthAPI, {
    refreshInterval: 2000,
  });

  let databaseStatus;

  if (!isLoading && data) {
    databaseStatus = data.dependencies.database;
  }

  return (
    <div>
      <h2>Database</h2>
      {databaseStatus ? (
        <div>
          <div>Número máximo de conexões: {databaseStatus.max_connections}</div>
          <div>Conexões abertas: {databaseStatus.opened_connections}</div>
          <div>Versão do Banco de Dados: {databaseStatus.version}</div>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}
