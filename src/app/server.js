const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let carros = [
  { id: 1, model: 'Gol', year: 2010 },
  { id: 2, model: 'Fiat Uno', year: 2006 },
]

app.get('/listarCarros', (req, res) => {
  res.json(carros);
})

app.post('/cadastrarCarro', (req, res) => {
  const { model, year } = req.body;
  
  if ( !model || !year ) {
    return res.status(400).json({ message: 'Modelo e ano são obrigatórios.' });
  }

  const novoId = carros.reduce((max, carro) => carro.id > max ? carro.id: max, 0) + 1;
  const novoCarro = { id: novoId, model, year };
  carros.push(novoCarro);
  res.status(201).json(novoCarro);
})

app.put('/atualizarCarros/:id', (req, res) => {
  const { id } = req.params;
  const { model, year } = req.body;

  const carro = carros.find((c) => c.id === parseInt(id));
  if (!carro) {
    return res.status(404).json({ message: 'Carro não encontrado!' });
  }

  if (model) carro.model = model;
  if (year) carro.year = year;
  res.json(carro);
})

app.delete('/deletarCarro/:id', (req, res) => {
  const { id } = req.params;
  const index = carros.findIndex((c) => c.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Carro não encontrado.' });
  }

  const removido = carros.splice(index, 1);
  res.json({ message: 'Carro removido com sucesso!', removido });
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
})
