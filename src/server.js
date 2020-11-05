const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

app.set('view engine', 'njk')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})

app.get('/', pageLanding)
app.get('/study', pageStudy)
app.get('/give-classes', pageGiveClasses)
app.post('/give-classes', saveClasses)

app.listen(3333)