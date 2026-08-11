const express = require('express')
const app = express();

app.use(express.static('./dist/hair-app-fe'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/hair-app-fe/'}
  );
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Hair App FE running at http://localhost:${PORT}`);
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error(`Failed to start server on port ${PORT}:`, err.message);
  process.exit(1);
});
