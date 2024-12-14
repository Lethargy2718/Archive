let projects = document.querySelector(".projects")

function AddCard(title, image, text, livePage, github, hasSite) {
    const card = document.createElement('div')
    card.classList.add('card')

    card.innerHTML = `
        <h3 class="card-title">${title}</h3>
        <a href="${livePage}" target="_blank" class="card-img-link">
            <img src="${image}" class="card-img">
        </a>
        <div class="card-content">
            <p class="card-text">${text}</p>
        </div>
        <div class="card-links">
            ${hasSite ? `<a href="${livePage}" target="_blank">Live Page</a>` : ""}
            <a href="${github}" target="_blank">GitHub</a>
        </div>
    `

    projects.appendChild(card)
}

fetch('cards.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        data.forEach(card => {
            AddCard(card.title, card.image, card.text, card.livePage, card.github, card.hasSite)
        })
    })
    .catch(error => {
        console.error("Error loading cards:", error)
    })
