const Server = require("./src/server");

const server = new Server().app;

const port = process.env.PORT || 8000;



server.listen(port, () => {
  console.log(`==> Open server running on http://localhost:${port} `);
});



