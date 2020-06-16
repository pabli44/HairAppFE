const express = require('express')
const app = express();

app.use(express.static('../dist/hair-app-fe'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/hair-app-fe/'}
  );
});

app.listen(process.env.PORT || 8080);