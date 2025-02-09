const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

const srcDir = path.join(__dirname, 'src');
const assetsDir = path.join(srcDir, 'assets');

app.use(express.static(srcDir));
app.use('/assets', express.static(assetsDir));

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
