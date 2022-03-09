const express = require('express')
const PORT = 8010
const app = express()
const videoRoutes = require('./routes/videos')


//middleware
app.use(express.json())
app.use(express.static('public'))

//custom middleware

app.use((req, res, next)=>{
    console.log('incoming request')
next()
})
app.use('/videos', videoRoutes)


//home route

app.get('/', (req, res)=>{
    res.send('welcome to my brainflix api')
})







app.listen(PORT, (err)=>{
    err? console.log(err):
    console.log(`listening on port ${PORT}`)
})













