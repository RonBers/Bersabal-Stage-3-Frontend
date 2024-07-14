//Initial page
let page = 1

async function fetchData() {
  try {
    const response = await fetch(
      `https://reqres.in/api/users?per_page=3&page=${page}`
    )
    const users = await response.json()

    // Containers for cards
    const cardContainer = document.getElementById("card-container")
    const cardContainer2 = document.getElementById("card-container2")

    // Map through users to generate card content
    const defaultCardContent = users.data
      .map((user) => {
        return `
        <div class="card active" id="default-card">
          <img src="${user.avatar}" alt="" class="avatar" id="avatar" />
          <div class="user-id">
            <h3><span>#</span>${user.id}</h3>
          </div>
          <h1>${user.last_name}, ${user.first_name}</h1>
          <h2>
            <a id="email" href="mailto:${user.email}">${user.email}</a>
          </h2>
        </div>
      `
      })
      .join("")

    const customCardContent = users.data
      .map((user) => {
        return `
        <div class="card" id="custom-card">
          <div class="card-header">
            <img src="resources/img/lightModeBG.jpg" alt="" class="user-bg" id="user-bg" />
          </div>
          <img src="${user.avatar}" alt="" class="avatar" id="avatar" />
          <div class="card-body" id="card-body">
            <h1>${user.last_name}, ${user.first_name}</h1>
            <div class="user-email">
              <i class="fa-solid fa-envelope"></i>
              <a id="email" href="mailto:${user.email}">${user.email}</a>
            </div>
            <hr />
            <div class="user-id">
              <h3>#${user.id}</h3>
            </div>
          </div>
        </div>
      `
      })
      .join("")

    // Append to respective containers
    cardContainer.innerHTML += defaultCardContent
    cardContainer2.innerHTML += customCardContent

    // Check if there are more pages to load
    if (page >= users.total_pages) {
      document.getElementById("loadmore-btn").disabled = true
    }
  } catch (error) {
    console.error("Error fetching the user data:", error)
  }
}

// Initial fetch
fetchData()

// Load more button
const loadMore = document.getElementById("loadmore-btn")

loadMore.addEventListener("click", () => {
  page++
  fetchData()
})

// Dark mode
let isDarkMode = false
const darkModeBtn = document.getElementById("darkmode-toggle-btn")
const darkModeBG = "resources/img/darkModeBG.JPG"
const lightModeBG = "resources/img/lightModeBG.JPG"

darkModeBtn.addEventListener("click", () => {
  document.getElementById("container").classList.toggle("darkmode")
  const defaultCards = document.querySelectorAll("#default-card")
  defaultCards.forEach((card) => {
    card.classList.toggle("darkmode")
  })

  const customCards = document.querySelectorAll("#custom-card")
  customCards.forEach((card) => {
    card.classList.toggle("darkmode")
  })

  const userBGS = document.querySelectorAll("user-bg")
  userBGS.forEach((userBG) => {
    userBG.src = isDarkMode ? lightModeBG : darkModeBG
  })

  isDarkMode = !isDarkMode

  document.getElementById("magic-btn").classList.toggle("darkmode-magic")
  document.getElementById("avatar").classList.toggle("darkmode")
})

// Toggle for personal design
const magicButton = document.getElementById("magic-btn")
magicButton.addEventListener("click", () => {
  magicButton.classList.toggle("activated")
  document.getElementById("container").classList.toggle("active")
  const defaultCardsActive = document.querySelectorAll("#default-card")
  defaultCardsActive.forEach((card) => {
    card.classList.toggle("active")
  })
  const customCardsActive = document.querySelectorAll("#custom-card")
  customCardsActive.forEach((card) => {
    card.classList.toggle("active")
  })
})
