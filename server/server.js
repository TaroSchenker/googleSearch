const express = require('express')  
const PORT  = 3000
const app = express()

app.get('/', (req, res) => {
    res.send('he)llo world')
})

app.use(PORT, () => console.log('listening on port ' + PORT))
