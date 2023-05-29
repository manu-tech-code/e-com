import express from 'express'

const app = express()
const port: any = process.env.PORT || 3000;

app.use('/api', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.listen(port ,() => {
    console.log(`Server is running on port ${port}`)
})