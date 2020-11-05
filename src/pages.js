const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')
const Database = require('./database/db')

function pageLanding(req, res) {
    return res.render('index')
}

async function pageStudy(req, res) {
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time)
        return res.render('study', { filters, subjects, weekdays })
    
    const timeInMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT *
        FROM proffys
        INNER JOIN classes ON (proffys.id = classes.proffy_id)
        WHERE EXISTS (
            SELECT *
            FROM classes_schedule
            WHERE class_id = classes.id
            AND weekday = ${filters.weekday}
            AND time_from <= ${timeInMinutes}
            AND time_to > ${timeInMinutes}
        )
        AND subject = '${filters.subject}'
    `

    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map(proffy => proffy.subject = getSubject(proffy.subject))

        return res.render('study', { proffys, filters, subjects, weekdays })
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    return res.render('give-classes', { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    const data = req.body

    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }

    const classValue = {
        subject: data.subject,
        cost: data.cost
    }

    const classScheduleValues = data.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(data.time_from[index]),
            time_to: convertHoursToMinutes(data.time_to[index])
        }
    })

    try {
        const db = await Database
        let queryString = `?subject=${data.subject}&weekday=${data.weekday[0]}&time=${data.time_from[0]}`
        
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        return res.redirect(`/study${queryString}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}