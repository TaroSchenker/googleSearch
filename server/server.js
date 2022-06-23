const express = require('express')
const app = express()
const cors = require('cors');
const searchResultData = require('./searchResults')
const searchRoutes = require('./controllers/search')

const PORT = 3000;
app.use(cors());

// const quoteRoutes = require('./controllers/quotes')
app.use('/search', searchRoutes)

//  app.get('/search/', (req, res) => {
// res.send(searchResultData)
//  })

//  app.get('/search/:searchedItem', (req, res) => {
//     const searchedItem = req.params.searchedItem
//     if(searchedItem === 'dog adoption'){
//         res.status(200).send(searchResultData)
//     } else {
//         res.status(404).send({"error": "search not found, please search for dog adoption"})
//     }
//      })

app.listen(PORT, () => console.log('listening on port ' + PORT ))
