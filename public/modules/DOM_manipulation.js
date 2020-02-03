import { getDayFromTime, getMonthFromTime, getDateFromTime, getTimeFromTime, dateTimeToString } from './time_control.js';

export function renderDOM(tasks, groups) {
    const activeGroup = getActiveGroup(groups);
    renderTasks(tasks, activeGroup);
    renderGroups(groups);
}

export function renderOverlay(string) {
    // Clear the overlay
    const container = document.querySelector('.overlay-container');
    container.innerHTML = `<div id="overlay-close" class="overlay-close">x</div>`;

    if (string == 'newTask') renderNewTaskOverlay(container);
}

function renderNewTaskOverlay(container) {
    const html = `  <div class="overlay-title">New Task</div>
                    <hr>
                    <form id="new-task" class="overlay-form" action="">
                        <h1>Task Name:</h1><input id="title" type="text">
                        <h1>Description:</h1><input id="description" type="text">
                        <h1>Date:</h1><input id="date" type="date">
                        <h1>Time:</h1>
                            <div>
                                <select id="hour">
                                    <option>12</option>
                                    <option>10</option>
                                    <option>9</option>
                                    <option>8</option>
                                    <option>7</option>
                                    <option>6</option>
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </select>
                                <select id="minute">
                                    <option>00</option>
                                    <option>15</option>
                                    <option>30</option>
                                    <option>45</option>
                                </select>
                                <select id=ampm>
                                    <option>am</option>
                                    <option>pm</option>
                                </select>
                            </div>
                        <h1>Group:</h1><select id="group">
                            <option>work</option>
                            <option>play</option>
                        </select>
                        <h1>Reminder:</h1>
                        <div>
                            <span class="reminder-tag">SMS:</span><input type="checkbox" id="sms">
                            <span class="reminder-tag">E-mail:</span><input type="checkbox" id="email">
                        </div>
                        <h1>When:</h1><select id="reminder" id="reminder-time">
                            <option>None</option>
                            <option>15 minutes before</option>
                            <option>30 minutes before</option>
                            <option>1 hour before</option>
                            <option>3 hours before</option>
                            <option>1 day before</option>
                            <option>3 days before</option>
                            <option>1 week before</option>
                        </select>
                        <h1>Reccuring</h1><select id="recurring" id="recurring">
                            <option>None</option>
                            <option>Every Day</option>
                            <option>Every Week</option>
                            <option>Every 2 Weeks</option>
                            <option>Every Month</option>
                        </select>
                        <input id="submit" class="submit" type="button" value="submit">
                    </form>`;
    container.innerHTML = container.innerHTML + html;
}

function renderTasks(tasks, activeGroup) {
    const container = document.querySelector('.main');
    container.innerHTML = `<div class="add-task" id="add-task">+ New Task</div>`; // Clears the div
    // Filter out tasks that are not assigned to the current group
    let activeTasks = [];
    if (activeGroup) {
        tasks.forEach((e)=> {
            if (e.group == activeGroup) {
                activeTasks.push(e);
            }
        });
    } else {
        // if no group is active, allow all tasks
        activeTasks = tasks;
    }

    activeTasks = activeTasks.sort((a, b) => (a.dateTime>b.dateTime)? 1 : -1); // Sort tasks by date

    if (activeTasks.length != 0) {
        activeTasks.forEach((e) => {
            const html =`<div class="checkbox-container"> 
                            <div class="checkbox">X</div> 
                        </div> 
                        <div class="title">${e.title} 
                            <span class="tag"></span> 
                            <hr> 
                        </div>                         
                        <div class="description"> 
                            <p>${e.description}</p> 
                        </div> 
                        <div class="due-date"> 
                            <div class="month">${getMonthFromTime(dateTimeToString(e.dateTime))}</div> 
                            <div class="date">${getDateFromTime(dateTimeToString(e.dateTime))}</div> 
                            <div class="time">${getTimeFromTime(dateTimeToString(e.dateTime))}</div>
                            <hr>
                            <div class="day">${getDayFromTime(dateTimeToString(e.dateTime))}</div>
                        </div>`;
            const newTask = document.createElement('div');
            newTask.className = 'task';
            newTask.innerHTML = html;
            container.appendChild(newTask);
        });
    } else {
        const html = 'It\'s totally empty...';
        const newTask = document.createElement('div');
        newTask.className = 'empty';
        newTask.textContent = html;
        container.appendChild(newTask);
    }
}

function renderGroups(groups, activeGroup) {
    const container = document.querySelector('.groups-container');
    // Clear the div --
    container.innerHTML = `<div class="header">
                            Groups
                            <div class="add-group">+</div>
                            </div>`;
    groups.forEach((e) => {
        const newGroup = document.createElement('div');
        newGroup.className = 'groups'
        newGroup.textContent = capitalize(e.title);
        newGroup.setAttribute('id', e.title);
        if (e.active == true) {
            newGroup.classList.add('active')
            newGroup.textContent = newGroup.textContent + ' ⯈';
        }
        container.appendChild(newGroup);
    });

}


/*-- Helper Functions --*/
function getActiveGroup(groups) {
    let active = ''
    groups.forEach((e) => {
        if (e.active) {
            active = e.title;
        }
    });
    return active;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}