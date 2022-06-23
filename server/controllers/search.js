const express = require('express');
const router = express.Router();
const searchResultData = require('../data/searchResults');
const errorArray = require('../data/errorArray')

router.get('/', (req, res) => {
    res.send(searchResultData)
     })
    
router.get('/:searchedItem', (req, res) => {
        const searchedItem = req.params.searchedItem
        console.log(searchedItem);
        if(searchedItem === 'dog adoption'){
            res.status(200).send(searchResultData)
        } else {
            res.status(404).send(errorArray)
        }
         })

module.exports = router
