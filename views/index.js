// views/index.js

import { createServer } from 'http';
import app from '../src/app.js'; // Adicione o sufixo .js

const server = createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
