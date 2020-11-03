document.querySelector('#add-time').addEventListener('click', cloneField)

function cloneField() {
    const newScheduleItem = document.querySelector('.schedule-item').cloneNode(true)
    const inputFields = newScheduleItem.querySelectorAll('input')

    inputFields.forEach(inputField => inputField.value = '')
    document.querySelector('#schedule-items').appendChild(newScheduleItem)
}