function status(request, response) {
  response.status(200).json({ chave: "Isso é um teste" });
}

export default status;
