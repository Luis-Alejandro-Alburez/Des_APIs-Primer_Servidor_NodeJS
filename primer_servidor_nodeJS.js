const http = require("http");
const url = require("url");

// Función para calcular la secuencia de Collatz
function collatzSequence(n) {
  let sequence = [];
  while (n !== 1) {
    sequence.push(n);
    if (n % 2 === 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
  }
  sequence.push(1); // Añadir el último número que es 1
  return sequence;
}

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/collatz") {
    const numero = parseInt(parsedUrl.query.numero, 10);

    // Validar que el número sea un entero positivo
    if (isNaN(numero) || numero <= 0 || !Number.isInteger(numero)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Por favor, proporciona un número entero positivo válido.",
        })
      );
      return;
    }

    // Calcular la secuencia de Collatz
    const sequence = collatzSequence(numero);

    // Devolver la secuencia en formato JSON
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ sequence: sequence }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

// Escuchar en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
