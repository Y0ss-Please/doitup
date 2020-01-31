export function render(tasks, groups) {
    const activeGroup = getActiveGroup(groups);
    renderTasks(tasks, activeGroup);
    renderGroups(groups);
}

function renderTasks(tasks, activeGroup) {
    const container = document.querySelector('.main');
    container.innerHTML = `<div class="add-entry">+ New Task</div>`; // Clears the div
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