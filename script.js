

let projectsPageDisplayed = false;

// Array of project names
let projects = ['Home Assistant using Raspberry Pi 4', 'Project D', 'Project B'];

function showProjectsPage() {
    setpage('#projects')

    if (projectsPageDisplayed) return;

    document.getElementById('home').style.display = 'none';
    document.getElementById('projects').style.display = 'none'; 

    const projectsPage = document.createElement('div');
    projectsPage.className = 'projects';
    projectsPage.innerHTML = `
        <h2>My Projects</h2>
        <ul id="project_page_list">
        </ul>
    `;

        
    window.onhashchange = function () {
        let currentPage = window.location.hash; // Default to #home
        
        if (currentPage === "#projects") {
            listprojects('project_page_list');
            
        } else if (currentPage === "#home") {
            
        }
    };
        
    

    document.body.appendChild(projectsPage);
    projectsPageDisplayed = true;
}

function refreshHome() {
    location.reload();
}
function showHomePage() {
    setpage('#home')
    if (projectsPageDisplayed==false) return;
    refreshHome();
}
function listprojects(container) {

    

    // Get the container element where the list will be added
    let projectListContainer = document.getElementById(container);

    // Create an unordered list element
    let ul = document.createElement('ul');

    // Loop through the projects array and create list items
    for (let project of projects) {
        let li = document.createElement('li'); // Create a list item
        li.textContent = project;             // Set the text of the list item
        ul.appendChild(li);                   // Append the list item to the unordered list
    }

    // Append the unordered list to the container
    projectListContainer.appendChild(ul);

}

function setpage(page){
    window.location.hash=page;
}


function check_button(){

    // Wait until the DOM is fully loaded
    document.addEventListener("DOMContentLoaded", () => {
        // Get elements
        const openPopupBtn = document.getElementById('openPopupBtn');
        const closePopupBtn = document.getElementById('closePopupBtn');
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('popupOverlay');
        const popupContent = document.getElementById('popupContent');

        if (!openPopupBtn || !closePopupBtn || !popup || !overlay || !popupContent) {
            console.error("One or more elements are missing in the DOM.");
            return; // Exit if elements are not found
        }

        // Show popup and load content from an external file
        openPopupBtn.addEventListener('click', () => {
            fetch('projects/capstone.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load content.');
                    }
                    return response.text();
                })
                .then(data => {
                    popupContent.innerHTML = data;
                    popup.style.display = 'block';
                    overlay.style.display = 'block';
                })
                .catch(error => {
                    popupContent.innerHTML = '<p>Error loading content. Please try again later.</p>';
                    popup.style.display = 'block';
                    overlay.style.display = 'block';
                });
        });

        // Close popup
        closePopupBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });

        // Close popup when clicking on the overlay
        overlay.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });
    });

}


function main(){
    setpage('#home');
    let currentPage = window.location.hash; // Default to #home if no hash

    window.onload = function() {
        
        if (currentPage=="#home") {
            listprojects('projectList');
        }
        
    };

    check_button();
}


main();


