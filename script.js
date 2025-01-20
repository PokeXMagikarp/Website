

let projectsPageDisplayed = false;

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
            listcurrentprojects('project_page_list');
            
        } else if (currentPage === "#home") {
            
        }
    };
        
    

    document.body.appendChild(projectsPage);
    projectsPageDisplayed = true;
}

function showProjectsPagehtml() {
    alert("this is the projects html");
    alert("The first window location hash is: " + window.location.hash);
    // Check if the current page is already #projects
    // if (window.location.hash === "#projects") return;

    // Set the page hash to #projects
    window.location.hash='#projects';
    alert("The second window location hash is: " + window.location.hash);
    // Optionally, show a loading spinner or indicator
    const mainContainer = document.getElementById('main');
    if (mainContainer) {
        mainContainer.innerHTML = '<p>Loading...</p>';
    }

    // Fetch the new HTML file
    fetch('projects_page.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load the projects page. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Replace the current page content with the fetched content
            if (mainContainer) {
                mainContainer.innerHTML = data;
            } else {
                console.error('Main container not found in the current HTML.');
            }
        })
        .catch(error => {
            console.error(error);
            if (mainContainer) {
                mainContainer.innerHTML = '<p>Error loading the projects page. Please try again later.</p>';
            }
        });
}




function refreshHome() {
    location.reload();
}
function showHomePage() {
    setpage('#home')
    if (projectsPageDisplayed==false) return;
    refreshHome();
}
function listcurrentprojects(container) {

    // Array of project names
    let projects = ['Home Assistant using Raspberry Pi 4', 'Project D', 'Project B'];

    // Get the container element where the list will be added
    let projectListContainer = document.getElementById(container);

    // Create an unordered list element
    let ul = document.createElement('ul');

    //set class name
    ul.id = 'openPopupBtn';  

    // Loop through the projects array and create list items
    for (let project of projects) {
        let li = document.createElement('li'); // Create a list item
        li.textContent = project;             // Set the text of the list item
        li.className = 'openPopupBtn-item';
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
            fetch('projects/old/capstone.html')
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

    check_button();
}


main();


