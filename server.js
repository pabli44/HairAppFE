const express = require('express')
const app = express();

app.use(express.static('./dist/hairAppFE'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/hairAppFE/'}
  );
});

app.listen(process.env.PORT || 8080);