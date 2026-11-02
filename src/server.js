
import express from 'express';
import { buscarTrechos } from './buscarTrechos.js';
import { gerarResposta } from './responder.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/perguntar', async (req, res) => {
  try {
    const { pergunta } = req.body;

    if (!pergunta || !pergunta.trim()) {
      return res.status(400).json({
        erro: 'Digite uma pergunta.',
      });
    }

    const trechos = await buscarTrechos(pergunta);
    const resposta = await gerarResposta(pergunta, trechos);

    res.json({ resposta });

  } catch (error) {
    console.error('Erro ao responder:', error.message);

    res.status(500).json({
      erro: 'Não foi possível responder à pergunta.',
    });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
