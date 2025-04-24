// DOM Elements
const tabItems = document.querySelectorAll('.tab-item');
const tabPanes = document.querySelectorAll('.tab-pane');
const sidebarClassList = document.getElementById('sidebarClassList');
const classTitle = document.getElementById('classTitle');
const classCode = document.getElementById('classCode');
const classBanner = document.getElementById('classBanner');

// Get class information from URL parameters
function getClassInfoFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'), 10);

    return {
        id: isNaN(id) ? 1 : id,
        title: urlParams.get('title') || 'Class 1',
        code: urlParams.get('code') || 'BSIT 2A'
    };
}

// Initialize the class view
function initClassView() {
    const classInfo = getClassInfoFromURL();

    // Set class title and code
    classTitle.textContent = classInfo.title;
    classCode.textContent = classInfo.code;

    // Set custom banner color based on class ID
    const colors = ['#ffd95a', '#a7e1d0', '#ffb6c1', '#add8e6', '#d8bfd8'];
    const colorIndex = (classInfo.id - 1) % colors.length;
    classBanner.style.backgroundColor = colors[colorIndex];

    // Load sidebar classes
    loadSidebarClasses(classInfo.id);

    // Set tab switching behavior
    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active tab
            tabItems.forEach(tab => tab.classList.remove('active'));
            item.classList.add('active');

            // Show relevant tab pane
            const tabId = item.getAttribute('data-tab');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Load sidebar class items dynamically
function loadSidebarClasses(currentClassId) {
    const hasClasses = localStorage.getItem('hasClasses') === 'true';

    // Clear any existing sidebar content
    sidebarClassList.innerHTML = '';

    if (hasClasses) {
        const classCounter = parseInt(localStorage.getItem('classCounter') || '1', 10);

        for (let i = 1; i <= classCounter; i++) {
            const isActive = i === currentClassId;

            const classItem = document.createElement('li');
            classItem.className = `class-item ${isActive ? 'active' : ''}`;
            classItem.innerHTML = `
                <a href="class-view.html?id=${i}&title=Class ${i}&code=BSIT ${i}A">
                    <i class="fa fa-circle"></i>
                    <span>Class ${i}</span>
                </a>
            `;

            sidebarClassList.appendChild(classItem);
        }
    } else {
        // Fallback if no classes exist
        const defaultItem = document.createElement('li');
        defaultItem.className = 'class-item active';
        defaultItem.innerHTML = `
            <a href="class-view.html?id=1&title=Class 1&code=BSIT 2A">
                <i class="fa fa-circle"></i>
                <span>Class 1</span>
            </a>
        `;
        sidebarClassList.appendChild(defaultItem);
    }
}

// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initClassView);
