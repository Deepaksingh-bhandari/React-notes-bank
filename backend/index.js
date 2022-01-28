const express = require('express')
const connectToMongo=require('./db')
const app = express()
var cors = require('cors')
 
app.use(cors())     //To disable cors-issue

const port = 5000
connectToMongo();

app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req,res)=>{res.send("Server is up & running")})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
