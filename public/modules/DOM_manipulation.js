export function renderDOM(tasks, groups) {
    const activeGroup = getActiveGroup(groups);
    renderTasks(tasks, activeGroup);
    renderGroups(groups);
}

export function renderOverlay() {
    const container = document.querySelector('.overlay-container');
    container.innerHTML = `<div id="overlay-close" class="overlay-close">x</div>`;

    const html = `  <div class="overlay-title">New Task</div>
                    <hr>
                    <form class="overlay-form">
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
                            <option>Work</option>
                            <option>Play</option>
                        </select>
                        <h1>Reminder:</h1>
                        <div>
                            <span class="reminder-tag">SMS:</span><input type="checkbox" id="sms">
                            <span class="reminder-tag">E-mail:</span><input type="checkbox" id="email">
                        </div>
                        <h1>When:</h1><select id="group" id="reminder-time">
                            <option>None</option>
                            <option>15 minutes before</option>
                            <option>30 minutes before</option>
                            <option>1 hour before</option>
                            <option>3 hours before</option>
                            <option>1 day before</option>
                            <option>3 days before</option>
                            <option>1 week before</option>
                        </select>
                        <h1>Reccuring</h1><select id="group" id="recurring">
                            <option>None</option>
                            <option>Every Day</option>
                            <option>Every Week</option>
                            <option>Every 2 Weeks</option>
                            <option>Every Month</option>
                        </select>
                    </form>`;
    container.innerHTML = container.innerHTML + html;
}

function renderTasks(tasks, activeGroup) {
    const container = document.querySelector('.main');
    container.innerHTML = `<div class="add-entry" id="add-entry">+ New Task</div>`; // Clears the div
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

    if (activeTasks.length != 0) {
        activeTasks.forEach((e) => {
            const html ='<div class="checkbox-container">' +
                            '<div class="checkbox">X</div>' +
                        '</div>' +
                        `<div class="title">${e.title}` +
                            '<span class="tag"></span>' +
                            '<hr>' +
                        '</div>' +                        
                        '<div class="description">' +
                            `<p>${e.description}</p>` +
                        '</div>' +
                        '<div class="due-date">' +
                            '<div class="month">Feb</div>' +
                            '<div class="day">03</div>' +
                            '<div class="time">12:00</div>' +
                        '</div>';
            const newEntry = document.createElement('div');
            newEntry.className = 'entry';
            newEntry.innerHTML = html;
            container.appendChild(newEntry);
        });
    } else {
        const html = 'It\'s totally empty...';
        const newEntry = document.createElement('div');
        newEntry.className = 'empty';
        newEntry.textContent = html;
        container.appendChild(newEntry);
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