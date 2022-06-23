const express = require('express');
const router = express.Router();
const searchResultData = require('../searchResults');


router.get('/', (req, res) => {
    res.send(searchResultData)
     })
    
router.get('/:searchedItem', (req, res) => {
        const searchedItem = req.params.searchedItem
        console.log(searchedItem);
        if(searchedItem === 'dog adoption'){
            res.status(200).send(searchResultData)
        } else {
            res.status(404).send({"error": "search not found, please search for dog adoption"})
        }
         })

module.exports = router
