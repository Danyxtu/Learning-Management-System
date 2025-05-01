// DOM Elements
const tabItems = document.querySelectorAll('.tab-item');
const tabPanes = document.querySelectorAll('.tab-pane');
const sidebarClassList = document.getElementById('sidebarClassList');
const classTitle = document.getElementById('classTitle');
const classCode = document.getElementById('classCode');
const classBanner = document.getElementById('classBanner');

// Utility: Extract class info from URL parameters
const getClassInfoFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id') || '1',
        title: params.get('title') || 'Class 1',
        code: params.get('code') || 'BSIT 2A'
    };
};

// Initialize tabs functionality
const initializeTabs = () => {
    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // Set active class on the selected tab
            tabItems.forEach(tab => tab.classList.remove('active'));
            item.classList.add('active');

            // Toggle the corresponding tab pane
            const tabId = item.dataset.tab;
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
};

// Render sidebar class list
const loadSidebarClasses = (currentClassId) => {
    const hasClasses = localStorage.getItem('hasClasses') === 'true';
    sidebarClassList.innerHTML = '';

    if (hasClasses) {
        const classCount = parseInt(localStorage.getItem('classCounter') || '1');

        for (let i = 1; i <= classCount; i++) {
            const isActive = i.toString() === currentClassId;
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
        sidebarClassList.innerHTML = `
            <li class="class-item active">
                <a href="class-view.html?id=1&title=Class 1&code=BSIT 2A">
                    <i class="fa fa-circle"></i>
                    <span>Class 1</span>
                </a>
            </li>
        `;
    }
};

// Set class banner color based on ID
const setBannerColor = (id) => {
    const colors = ['#ffd95a', '#a7e1d0', '#ffb6c1', '#add8e6', '#d8bfd8'];
    const colorIndex = (parseInt(id) - 1) % colors.length;
    classBanner.style.backgroundColor = colors[colorIndex];
};

// Initialize view
const initClassView = () => {
    const { id, title, code } = getClassInfoFromURL();
    classTitle.textContent = title;
    classCode.textContent = code;
    loadSidebarClasses(id);
    initializeTabs();
    setBannerColor(id);
};

// DOM Ready
document.addEventListener('DOMContentLoaded', initClassView);
