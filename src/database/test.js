const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    proffyValue = {
        name: 'Victor Badaró',
        avatar: 'https://avatars0.githubusercontent.com/u/9096344?s=460&u=c3d6958cd2a640acfb249cd2d25c2f9c9c525c57&v=4',
        whatsapp: '014999998787',
        bio: 'Instrutor de Educação Física'
    }

    classValue = {
        subject: 'Educação Física',
        cost: '20'
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, { proffyValue, classValue, classScheduleValues })

    const selectedProffys = await db.all('SELECT * FROM proffys')
    console.log(selectedProffys)
})