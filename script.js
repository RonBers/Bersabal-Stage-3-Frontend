// Initial page
let page = 1
let isDarkMode = false

const loadMore = document.getElementById("loadmore-btn")
loadMore.addEventListener("click", () => {
  page++
  fetchData()
})

async function fetchData() {
  try {
    const response = await fetch(
      `https://reqres.in/api/users?per_page=3&page=${page}`
    )
    const users = await response.json()

    // Containers for cards
    const cardContainer = document.getElementById("card-container")

    // Mapping through users to generate card content
    const customCardContent = users.data
      .map((user) => {
        return `
        <div class="card active ${
          isDarkMode ? "darkmode" : ""
        }" id="custom-card">
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
    cardContainer.innerHTML += customCardContent

    // Check if there are more pages to load
    if (page >= users.total_pages) {
      loadMore.innerHTML = "No data"
      loadMore.disabled = true
    }
  } catch (error) {
    console.error("Error fetching the user data:", error)
  }
}

// Initial fetch
fetchData()

// Dark mode
const darkModeBtn = document.getElementById("darkmode-toggle-btn")
const darkModeBG = "resources/img/darkModeBG.JPG"
const lightModeBG = "resources/img/lightModeBG.JPG"

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("darkmode")

  const customCards = document.querySelectorAll("#custom-card")
  customCards.forEach((card) => {
    card.classList.toggle("darkmode")
  })

  const userBGS = document.querySelectorAll(".user-bg")
  userBGS.forEach((userBG) => {
    userBG.src = isDarkMode ? lightModeBG : darkModeBG
  })

  isDarkMode = !isDarkMode
  document.getElementById("avatar").classList.toggle("darkmode")
})
