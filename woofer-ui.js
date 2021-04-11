//
//
//            !!!!!!!! WARNING !!!!!!!!
//
// This file has all the functions you need to update the
// page, but you don't need to make any changes to this
// file to complete the project. Do so at your own risk!
//
//

const woofText = document.getElementById('woof-text')
const woofs = document.getElementById('woofs')
const woofCreate = document.getElementById('woof-button')

// Adds a new row to the list of woofs
function addWoofRow (woofKey, woof) { // eslint-disable-line no-unused-vars
  const template = document.getElementById('woof-template')
  const clone = document.importNode(template.content, true)

  clone.querySelector('.row').id = woofKey
  clone.querySelector('.created-at').textContent = moment(woof.created_at).calendar() // eslint-disable-line no-undef
  clone.querySelector('.text').textContent = woof.text
  clone.querySelector('.btn-edit').addEventListener('click', showWoofTextbox)
  clone.querySelector('.btn-delete').addEventListener('click', deleteWoof)
  clone.querySelector('input').addEventListener('keyup', editWoof)

  woofs.insertBefore(clone, woofs.firstChild)
  woofText.value = ''
}

// Get woof text from input and pass it to addWoof
function createWoof () {
  const text = woofText.value || ''
  if (!text.trim().length) return
  createWoofInDatabase({ // eslint-disable-line no-undef
    created_at: new Date().getTime(),
    text: text
  })
}

// Make the textbox to edit a woof appear
function showWoofTextbox () {
  const row = this.parentElement.parentElement
  const textbox = row.querySelector('input')
  const form = textbox.parentElement
  const text = row.querySelector('.text')

  textbox.value = row.querySelector('.text').textContent
  text.className = text.className.replace('show', 'hidden')
  form.className = form.className.replace('hidden', 'show')
  textbox.focus()
  textbox.select()
}

// If Enter was pressed, update woof in database,
// If Escape was pressed, hide the textbox
function editWoof (event) {
  const row = this.parentElement.parentElement.parentElement
  const textbox = row.querySelector('input')
  const form = textbox.parentElement
  const text = row.querySelector('.text')

  if (event.key === 'Enter') {
    // Enter key pressed
    updateWoofInDatabase(row.id, textbox.value) // eslint-disable-line no-undef
  } else if (event.key === 'Escape') {
    // Escape key pressed
    form.className = form.className.replace('show', 'hidden')
    text.className = text.className.replace('hidden', 'show')
  }
}

// Update the woof text in a row on the page
function updateWoofRow (woofKey, woof) { // eslint-disable-line no-unused-vars
  const row = document.getElementById(woofKey)
  const form = row.querySelector('input').parentElement
  const text = row.querySelector('.text')
  form.className = form.className.replace('show', 'hidden')
  row.querySelector('.text').textContent = woof.text
  text.className = text.className.replace('hidden', 'show')
}

// Remove a woof row from the page
function deleteWoofRow (woofKey) { // eslint-disable-line no-unused-vars
  const row = document.getElementById(woofKey)
  row.parentElement.removeChild(row)
}

// Remove the clicked woof from the database
function deleteWoof () {
  const row = this.parentElement.parentElement
  deleteWoofFromDatabase(row.id) // eslint-disable-line no-undef
}

// Event listeners to add a new woof
woofCreate.addEventListener('click', createWoof)
woofText.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') createWoof()
})
