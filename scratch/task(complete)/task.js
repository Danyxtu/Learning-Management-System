document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const submissionModal = document.getElementById('submissionModal');
    const saveConfirmModal = document.getElementById('saveConfirmModal');

    const modalTaskTitle = document.getElementById('modal-task-title');
    const modalTaskDue = document.getElementById('modal-task-due');
    const submissionStatus = document.getElementById('submission-status');
    const submissionFiles = document.getElementById('submission-files');
    const taskNameSpan = document.getElementById('task-name');

    const actionButtons = document.querySelectorAll('.task-action-btn');
    const uploadBtn = document.getElementById('uploadBtn');
    const linkBtn = document.getElementById('linkBtn');
    const fileInput = document.getElementById('fileInput');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
    const saveConfirmBtn = document.getElementById('saveConfirmBtn');

    const tasks = {
        'html-css-basics': {
            title: 'Activity 1: HTML/CSS Basics',
            dueDate: 'Mar 3, 11:59 PM',
            description: 'Create a simple personal portfolio page using HTML and CSS.',
            resources: [{ name: 'Assignment1_HTML_CSS_Basics.pdf', type: 'PDF' }],
            status: 'pending',
            files: []
        },
        'js-functions': {
            title: 'Activity: JavaScript Functions',
            dueDate: 'May 5, 11:59 PM',
            description: 'Create JavaScript functions to solve specific problems.',
            resources: [{ name: 'JavaScript_Functions_Assignment.pdf', type: 'PDF' }],
            status: 'pending',
            files: []
        },
        'db-design': {
            title: 'Project: Database Design',
            dueDate: 'Apr 20, 11:59 PM',
            description: 'Design a database schema for an inventory management system.',
            resources: [{ name: 'Database_Design_Project.pdf', type: 'PDF' }],
            status: 'overdue',
            files: []
        },
        'data-structures': {
            title: 'Quiz: Data Structures',
            dueDate: 'Apr 18, 10:30 AM',
            description: 'Quiz on data structures including arrays, linked lists, trees, and graphs.',
            resources: [{ name: 'Data_Structures_Study_Guide.pdf', type: 'PDF' }],
            status: 'completed',
            files: []
        }
    };

    let currentTaskId = null;

    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('data-task-id');
            openTaskModal(taskId);
        });
    });

    function openTaskModal(taskId) {
        currentTaskId = taskId;
        const task = tasks[taskId];

        modalTaskTitle.textContent = task.title;
        modalTaskDue.textContent = `Due: ${task.dueDate}`;
        submissionStatus.textContent = capitalize(task.status);
        submissionStatus.className = `submission-status ${task.status}`;
        renderSubmissionFiles(task.files);

        modalOverlay.style.display = 'block';
        submissionModal.style.display = 'block';
    }

    function closeModals() {
        modalOverlay.style.display = 'none';
        submissionModal.style.display = 'none';
        saveConfirmModal.style.display = 'none';
    }

    function renderSubmissionFiles(files) {
        submissionFiles.innerHTML = '';
        submissionFiles.classList.toggle('empty', files.length === 0);

        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-icon"><i class="fa ${getFileIconClass(file.type)}"></i></div>
                <div class="file-details">
                    <p class="file-name">${file.name}</p>
                    <p class="file-type">${file.type}</p>
                </div>
                <div class="file-actions">
                    <button class="file-action-btn delete-btn" data-index="${index}">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            `;
            submissionFiles.appendChild(fileItem);
        });

        submissionFiles.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                deleteFile(index);
            });
        });
    }

    function deleteFile(index) {
        tasks[currentTaskId].files.splice(index, 1);
        renderSubmissionFiles(tasks[currentTaskId].files);
    }

    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', function () {
        const files = Array.from(this.files);
        files.forEach(file => {
            tasks[currentTaskId].files.push({
                name: file.name,
                type: getFileExtension(file.name).toUpperCase(),
                size: file.size
            });
        });
        renderSubmissionFiles(tasks[currentTaskId].files);
        this.value = '';
    });

    linkBtn.addEventListener('click', () => {
        const link = prompt('Enter link URL:');
        if (link) {
            tasks[currentTaskId].files.push({ name: link, type: 'LINK', size: 0 });
            renderSubmissionFiles(tasks[currentTaskId].files);
        }
    });

    cancelBtn.addEventListener('click', closeModals);

    saveBtn.addEventListener('click', () => {
        if (tasks[currentTaskId].files.length === 0) {
            taskNameSpan.textContent = tasks[currentTaskId].title;
            submissionModal.style.display = 'none';
            saveConfirmModal.style.display = 'block';
        } else {
            saveSubmission();
        }
    });

    cancelConfirmBtn.addEventListener('click', () => {
        saveConfirmModal.style.display = 'none';
        submissionModal.style.display = 'block';
    });

    saveConfirmBtn.addEventListener('click', saveSubmission);

    function saveSubmission() {
        tasks[currentTaskId].status = 'submitted';
        const taskItem = document.querySelector(`[data-task-id="${currentTaskId}"]`)?.closest('.task-item');
        if (taskItem) {
            const statusElement = taskItem.querySelector('.task-status');
            statusElement.className = 'task-status submitted';
            statusElement.innerHTML = '<span>Submitted</span>';
        }
        alert('Task submitted successfully!');
        closeModals();
    }

    function getFileIconClass(type) {
        const map = {
            'PDF': 'fa-file-pdf',
            'DOC': 'fa-file-word',
            'DOCX': 'fa-file-word',
            'XLS': 'fa-file-excel',
            'XLSX': 'fa-file-excel',
            'PPT': 'fa-file-powerpoint',
            'PPTX': 'fa-file-powerpoint',
            'JPG': 'fa-file-image',
            'JPEG': 'fa-file-image',
            'PNG': 'fa-file-image',
            'GIF': 'fa-file-image',
            'ZIP': 'fa-file-archive',
            'RAR': 'fa-file-archive',
            'TXT': 'fa-file-alt',
            'HTML': 'fa-file-code',
            'CSS': 'fa-file-code',
            'JS': 'fa-file-code',
            'PHP': 'fa-file-code',
            'LINK': 'fa-link'
        };
        return map[type] || 'fa-file';
    }

    function getFileExtension(name) {
        return name.includes('.') ? name.split('.').pop() : '';
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModals();
    });

    function initializeTaskStatuses() {
        for (const taskId in tasks) {
            const task = tasks[taskId];
            const taskItem = document.querySelector(`[data-task-id="${taskId}"]`)?.closest('.task-item');
            if (taskItem) {
                const statusElement = taskItem.querySelector('.task-status');
                statusElement.className = `task-status ${task.status}`;
                statusElement.innerHTML = `<span>${capitalize(task.status)}</span>`;
            }
        }
    }

    initializeTaskStatuses();
});
