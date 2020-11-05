const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const { subjects, weekdays, getSubject } = require('./utils/format')

app.set('view engine', 'njk')
app.use(express.static('public'))

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})

function pageLanding(req, res) {
    return res.render('index')
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render('study', { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query
    const isEmpty = Object.keys(data).length == 0

    if(!isEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect('/study')
    }

    return res.render('give-classes', { subjects, weekdays })
}

app.get('/', pageLanding)
app.get('/study', pageStudy)
app.get('/give-classes', pageGiveClasses)

app.listen(3333)