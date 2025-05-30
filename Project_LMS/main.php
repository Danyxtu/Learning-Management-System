<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CCS Learn: Your Digital Classroom</title>
    <link rel="icon" href="IMAGE/ccs-logo.png" type="image/x-icon/jpeg/png" />
    <link rel="stylesheet" href="CSS/main.css" />
    <link rel="stylesheet" href="CSS/nav-bar.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
</head>

<body>
    <!-- Join Class Modal -->
    <div id="joinClassModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Join Class</h2>
            </div>
            <div class="modal-body">
                <div class="join-class-form">
                    <h3>Join Class</h3>
                    <div class="form-group">
                        <label for="classCode">Class Code</label>
                        <p class="form-hint">
                            Ask your teacher for the class code, then enter
                            it here.
                        </p>
                        <input type="text" id="classCode" placeholder="Class code" />
                    </div>
                    <div class="requirements">
                        <p>To sign in with a class code</p>
                        <ul>
                            <li>Use an authorized account</li>
                            <li>
                                Use a class code with 5-7 letters or
                                numbers, and no spaces or symbols
                            </li>
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-cancel" id="cancelJoin">
                            Cancel
                        </button>
                        <button class="btn btn-join" id="confirmJoin">
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Container -->
    <div class="main-container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <div class="menu" onclick=showSidebar()>
                    X
                </div>
                <img src="IMAGE/ccs-logo.png" alt="CCS Logo" />
                <h1>CCS Learn: Your Digital Classroom</h1>
            </div>
            <div class="user-profile">
                <div class="user-avatar">
                    <img src="IMAGE/ccs-logo.png" alt="User Avatar" />
                </div>
                <div class="user-info">
                    <p class="user-name">Laur, Solijon</p>
                    <p class="user-role">Learner</p>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="content-wrapper">
            <!-- Sidebar -->
            <nav class="sidebar">
                <!-- <button class="close-btn" id="closeBtn">&times;</button> -->
                <ul>
                    <li>
                        <a href="#">
                            <i class="fa fa-th-large"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa fa-calendar"></i>
                            <span>Calendar</span>
                        </a>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">
                            <i class="fa fa-book"></i>
                            <span>Class</span>
                            <i class="fa fa-chevron-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="class-item">
                                <a href="#">
                                    <i class="fa fa-circle"></i>
                                    <span>Class 1</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa fa-tasks"></i>
                            <span>Task</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fa fa-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="login.html">
                            <i class="fa fa-sign-out-alt"></i>
                            <span>Log out</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <!-- Main Content Area -->
            <main class="main-content">
                <div class="dashboard-grid">
                    <!-- My Classes -->
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h2>My Classes</h2>
                            <button class="add-button" id="addClassBtn">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                        <div class="card-body" id="classesContainer">
                            <!-- Empty state -->
                            <div class="empty-state" id="emptyClassState">
                                <div class="empty-icon">
                                    <i class="fa fa-book"></i>
                                </div>
                                <p>
                                    Looks like you don't have any classes
                                    yet
                                </p>
                            </div>

                            <!-- Class item template (hidden by default) -->
                            <div class="class-card" id="classTemplate" style="display: none">
                                <div class="class-card-content">
                                    <h3 class="class-title">Class 1</h3>
                                    <p class="class-code">BSIT 2A</p>
                                    <p class="class-instructor">
                                        Instructor
                                    </p>
                                </div>
                                <div class="class-decoration"></div>
                                <!-- Added decoration div -->
                            </div>
                        </div>
                    </div>

                    <!-- Calendar -->
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h2>Calendar</h2>
                        </div>
                        <div class="card-body">
                            <div class="calendar-container">
                                <div class="calendar-header">
                                    <button class="calendar-nav-btn" id="prevMonth">
                                        <i class="fa fa-chevron-left"></i>
                                    </button>
                                    <h3 id="currentMonth">February 2025</h3>
                                    <button class="calendar-nav-btn" id="nextMonth">
                                        <i class="fa fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div class="calendar">
                                    <div class="calendar-weekdays">
                                        <div>MON</div>
                                        <div>TUE</div>
                                        <div>WED</div>
                                        <div>THU</div>
                                        <div>FRI</div>
                                        <div>SAT</div>
                                        <div>SUN</div>
                                    </div>
                                    <div class="calendar-days" id="calendarDays">
                                        <!-- Calendar days will be generated by JavaScript -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h2>Quick Stats</h2>
                        </div>
                        <div class="card-body">
                            <div class="stats-grid">
                                <div class="stat-card">
                                    <h3 class="stat-number">0</h3>
                                    <p class="stat-label">
                                        Completed works
                                    </p>
                                </div>
                                <div class="stat-card">
                                    <h3 class="stat-number">0</h3>
                                    <p class="stat-label">Missing works</p>
                                </div>
                                <div class="stat-card">
                                    <h3 class="stat-number">0</h3>
                                    <p class="stat-label">Pending works</p>
                                </div>
                                <div class="stat-card">
                                    <h3 class="stat-number">0</h3>
                                    <p class="stat-label">
                                        Number of classes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Task Board -->
                    <div class="dashboard-card">
                        <div class="card-header">
                            <h2>Task Board</h2>
                        </div>
                        <div class="card-body" id="taskContainer">
                            <!-- Empty state -->
                            <div class="empty-state" id="emptyTaskState">
                                <div class="empty-icon">
                                    <i class="fa fa-clipboard-list"></i>
                                </div>
                                <p>Nothing on your to-do list right now</p>
                                <span class="empty-hint">Check back later for new
                                    assignments</span>
                            </div>

                            <!-- Task items container (empty and hidden by default) -->
                            <div class="task-items" id="taskItems" style="display: none">
                                <!-- Tasks will be added dynamically via JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="JavaScript/main.js"></script>
</body>

</html>