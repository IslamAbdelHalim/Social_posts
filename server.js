import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send({message: "Hello world"});
})


app.listen(5000, () => console.log('the server is running'));