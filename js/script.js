/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
Completed by Anthony Setiadi
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//Global variables 
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');

// Function displaying 9 students per page
function showPage(list, page) {
   const startIndex = (page * 9) - 9
   const endIndex = page * 9
   studentList.innerHTML = ''
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentInfo = 
         // Includes avatar, name, email, and registered date 
            `<li class="student-item cf>
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>`
         studentList.insertAdjacentHTML('beforeend', studentInfo)
      }
   }
}

// Function to add page numbers at the bottom of the page
function addPagination(list) {
   const totalPages = Math.ceil(list.length / 9)
   linkList.innerHTML = ''
   for (let i = 1; i <= totalPages; i++) {
      let buttons = 
      `<li>
         <button type="button">${i}</button>
      </li>`
      linkList.insertAdjacentHTML('beforeend', buttons)
   }
   const button = document.querySelector('button')
   button.className = 'active'
   // Listen for when the page number is clicked
   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = ''
         let activePage = e.target
         activePage.className = 'active'
         // Show the active page that was clicked
         showPage(list, activePage.textContent)
      }
   })
}


// Dynamically add search bar to HTML
const searchForm = 
   `<label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button class="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`
header.insertAdjacentHTML('beforeend', searchForm)



// DOM Variables for search bar and search button
const searchBar = document.getElementById('search')
const searchButton = document.querySelector('.search-button')
// Empty array variable for filtered names from search
const filteredNames = []  

// Search for name match function
const searchName = () => {
// Filter search results based on first and last name in lowercase
   const input = document.getElementById('search').value
   const filteredNames = data.filter((names) => {
      return (
         names.name.first.toLowerCase().includes(input.toLowerCase())||
         names.name.last.toLowerCase().includes(input.toLowerCase())
         )
         })     
// Show error if no results found
   if (filteredNames.length === 0) {
      noResults = 'No results found. Try another search.'
      studentList.innerHTML = noResults
      addPagination(filteredNames)
// Show filtered names
   } else if (filteredNames.length >= 1) {
      showPage(filteredNames, 1)
      addPagination(filteredNames)
// Show full data list
   } else {
      showPage(data, 1)
      addPagination(data)
   }
}

// Event listeners on Search Bar and Button
searchBar.addEventListener('keyup', searchName)
searchButton.addEventListener('click', searchName)



// Call functions globally
showPage(data, 1)
addPagination(data)