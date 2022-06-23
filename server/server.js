const express = require('express')
const app = express()
const cors = require('cors');
const searchRoutes = require('./controllers/search')

const PORT = 3000;
app.use(cors());

app.use('/search', searchRoutes)

app.listen(PORT, () => console.log('listening on port ' + PORT ))
