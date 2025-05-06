document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.task-nav-btn');
    const taskSections = document.querySelectorAll('.task-section');
    const classFilter = document.getElementById('classFilter');
    const statusFilter = document.getElementById('statusFilter');
    const taskItems = document.querySelectorAll('.task-item');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const actionButtons = document.querySelectorAll('.task-action-btn');

    // Handle navigation between task sections
    const setupNavigation = () => {
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                taskSections.forEach(section => section.style.display = 'none');
                document.getElementById(`${filter}-tasks`).style.display = 'block';
            });
        });
    };

    // Apply class and status filters
    const applyFilters = () => {
        const classValue = classFilter.value;
        const statusValue = statusFilter.value;

        taskItems.forEach(item => {
            const classText = item.querySelector('.task-class').textContent.toLowerCase();
            const statusClass = item.querySelector('.task-status').classList;

            const classMatch = classValue === 'all' || classText.includes(classValue.toLowerCase());
            const statusMatch = statusValue === 'all' || statusClass.contains(statusValue);

            item.style.display = (classMatch && statusMatch) ? 'flex' : 'none';
        });

        checkEmptyStates();
    };

    // Check if each section has visible tasks, show empty state if not
    const checkEmptyStates = () => {
        ['upcoming', 'overdue', 'completed'].forEach(section => {
            const sectionEl = document.getElementById(`${section}-tasks`);
            const emptyState = document.getElementById(`empty-${section}`);
            const hasVisible = [...sectionEl.querySelectorAll('.task-item')]
                .some(task => task.style.display !== 'none');

            if (emptyState) {
                emptyState.style.display = hasVisible ? 'none' : 'flex';
            }
        });
    };

    // Populate sidebar and filter dropdowns with class items
    const populateClassFilter = () => {
        const classes = [
            { id: 'class1', name: 'Web Development' },
            { id: 'class2', name: 'Programming Fundamentals' },
            { id: 'class3', name: 'Database Management' },
            { id: 'class4', name: 'Data Structures and Algorithms' }
        ];

        classes.forEach(cls => {
            if (cls.id !== 'class1') {
                const li = document.createElement('li');
                li.className = 'class-item';
                li.innerHTML = `
                    <a href="#">
                        <i class="fa fa-circle"></i>
                        <span>${cls.name}</span>
                    </a>
                `;
                dropdownMenu.appendChild(li);

                const option = document.createElement('option');
                option.value = cls.id;
                option.textContent = cls.name;
                classFilter.appendChild(option);
            }
        });
    };

    // Setup task action buttons
    const setupTaskActions = () => {
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const taskTitle = button.closest('.task-item').querySelector('.task-title').textContent;
                alert(`Opening task: ${taskTitle}`);
            });
        });
    };

    // Toggle sidebar dropdown
    const setupDropdownToggle = () => {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownToggle.classList.toggle('active');
            dropdownMenu.classList.toggle('show');
        });
    };

    // Initialize all features
    const init = () => {
        setupNavigation();
        populateClassFilter();
        applyFilters();
        setupTaskActions();
        setupDropdownToggle();

        classFilter.addEventListener('change', applyFilters);
        statusFilter.addEventListener('change', applyFilters);
    };

    init();
});
