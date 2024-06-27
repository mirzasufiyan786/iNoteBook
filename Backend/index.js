const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');

connectToMongo();

const app = express()
const port = 5000
// Use CORS middleware
app.use(cors());
  // use midelware to for usinf req.body
app.use(express.json())
// Available routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})