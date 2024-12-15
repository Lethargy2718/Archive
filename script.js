const projects = document.querySelector(".projects")
const other = document.querySelector(".other")
const light = document.querySelector(".light")
const dark = document.querySelector(".dark")

function AddCard(title, image, text, livePage, github, hasSite) {
    const card = document.createElement('div')
    card.classList.add('card')
  
    card.innerHTML = `
        <h3 class="card-title">${title}</h3>
        <a href="${hasSite ? livePage : github}" target="_blank" class="card-img-link">
            <img src="${image}" class="card-img">
        </a>
        <div class="card-content">
            <p class="card-text">${text}</p>
        </div>
        <div class="card-links">
            ${hasSite ? `<a href="${livePage}" target="_blank">Website</a>` : ""}
            <a href="${github}" target="_blank">GitHub</a>
        </div>
    `
    projects.appendChild(card)
}

function AddCourse(title, org, completion, description, link) {
    const course = document.createElement('div')
    course.classList.add('course')

    course.innerHTML = `
    <div class="course-header">
        <h3 class="course-title">${title}</h3>
        <h5 class="course-org">${org}</h5>
    </div> 
    <span class="course-completion">${completion}</span>
    <p class="course-desc">${description}</p>
    <a href="${link}" class="course-link"><img src="Assets/SVGs/arrow.svg" alt="Link"></a>
    `

    other.append(course)
}

light.addEventListener("click", (event) => {
    event.preventDefault();
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
})

dark.addEventListener("click", (event) => {
    event.preventDefault();
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
})


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

fetch('courses.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        data.forEach(course => {
            AddCourse(course.title, course.org, course.completion, course.description, course.link)
        })
    })
    .catch(error => {
        console.error("Error loading courses:", error)
    })