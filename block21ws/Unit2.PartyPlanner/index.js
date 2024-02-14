//State

const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/kyle-beaven'

let events = []

const eventsContainer = document.getElementById('events')



// getEvents 



async function getEvents() { //async function
    try {
        const response = await fetch(API_URL + '/events')
        const json = await response.json()

    console.log('Properties: ', json.data)
    // returns the data properties of json object
   return json.data
    } catch (err) {
        console.error(err)
    }
}

//event listener

const form = document.getElementById('edit')

form.addEventListener('submit', async (event) => {
  event.preventDefault() // STOPS PAGE REFRESH

  const formData = form.elements

  let { id, name, description, date, time } = formData
  // Object Destructuring
  // let name = formData.name
  // let description = formData.description
  // let id = formData.id

  const updatedObject = {
    name: name.value,
    description: description.value,
    date: date.value,
    time: time.value
  }

  console.log('UpdatedObject', JSON.stringify(updatedObject))

  const response = await fetch(`${API_URL}/events/${id.value}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedObject), // body data type must match "Content-Type" header
  })

  const json = await response.json()
  console.log(json)


  // Render the updated things on the page
  events = await getEvents()
  renderevents()

})

//renderevents


function renderevents() {

    const htmlevents = events.map(ev => {
        let div = document.createElement('div')

        div.className = 'card'

        div.classList.add('event')

        div.innerHTML = `<h3>#${ev.id}</h3>
                        <h3>${ev.name}</h3>
                        <h3>${ev.time}</h3>
                        <h3>${ev.date}</h3>
                        <h3>${ev.description}</h3>`

                        const deleteButton = document.createElement('button')
                        deleteButton.innerText = 'Delete'
                        deleteButton.addEventListener('click', () => deleteEvent(events.id))
                        div.append(deleteButton)

        return div

    })

    eventsContainer.replaceChildren(...htmlevents)





}


async function startApp() {
    events = await getEvents()
    console.log(events.data)

    renderevents()
}

startApp()


