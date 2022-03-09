const express = require('express')
const fs = require('fs')
const router = express.Router()



router.get('/', (req, res)=>{
    fs.readFile('./data/videos.json', 'utf-8', (err, data)=>{
        if(err){
            res.send('error reading videos data')
        } else{
            res.send(data)
        }
    })
})



module.exports = router
