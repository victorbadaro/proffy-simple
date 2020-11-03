const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const proffys = [
    {
        name: 'Victor Badaró',
        avatar: 'https://avatars0.githubusercontent.com/u/9096344?s=460&u=c3d6958cd2a640acfb249cd2d25c2f9c9c525c57&v=4',
        whatsapp: '14999998888',
        bio: 'Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
        subject: 'Química',
        cost: '20,00',
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: 'Miryam Badaró',
        avatar: 'https://scontent.fmii4-1.fna.fbcdn.net/v/t1.0-9/116798261_3940075856019689_8845819322580677497_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=iQ1h17B7K2YAX-cCSRu&_nc_ht=scontent.fmii4-1.fna&oh=5c1f82c60c939c74c7e0f52803051b8a&oe=5FC5A748',
        whatsapp: '14999997777',
        bio: 'Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
        subject: 'Artes',
        cost: '40',
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

app.set('view engine', 'njk')
app.use(express.static('public'))

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})

function getSubject(subjectNumber) {
    const subjectPosition = +subjectNumber - 1
    return subjects[subjectPosition]
}

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