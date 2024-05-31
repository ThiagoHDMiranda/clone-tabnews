test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedResponse = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedResponse);

  expect(responseBody.dependencies.database.max_connections).toBe(100);

  expect(responseBody.dependencies.database.opened_connections).toBe(1);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
});

// test.only("Teste de SQL Injection", async () => {
//   const response = await fetch(
//     "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --'",
//   );
// });
