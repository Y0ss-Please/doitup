import {
    getDayFromTime,
    getMonthFromTime,
    getDateFromTime,
    getTimeFromTime,
    dateTimeToString
  } from "./time_control.js";
  
  export function renderDOM(tasks, groups) {
    const activeGroup = getActiveGroup(groups);
    renderTasks(tasks, activeGroup);
    renderGroups(groups);
  }
  
  export function renderOverlay(type, groups) {
    // Clear the overlay
    const container = document.querySelector(".overlay-container");
    container.innerHTML = `<div id="overlay-close" class="overlay-close">x</div>`;
  
    if (type == "newTask") renderNewTaskOverlay(container, groups);
    if (type == "newGroup") renderNewGroupOverlay(container, groups);
  }
  
  function renderNewTaskOverlay(container, groups) {
    const html = `  <div class="overlay-title">New Task</div>
                      <hr>
                      <form id="new-task" class="overlay-form" action="">
                          <h1>Task Name:</h1><input id="title" type="text">
                          <h1>Description:</h1><input id="description" type="text">
                          <h1>Group:</h1><select id="group"></select>
                          <h1>Date:</h1><input id="date" type="date">
                          <h1>Time:</h1>
                              <div>
                                  <select id="hour">
                                      <option>12</option>
                                      <option>11</option>
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
                          <input id="submit" class="submit" type="button" value="submit">
                      </form>`;
    container.innerHTML = container.innerHTML + html;
    const groupContainer = document.getElementById("group");
    let groupsOptions = "";
    groups.forEach(group => {
      if (group.title == getActiveGroup(groups)) {
        groupsOptions =
          groupsOptions + "<option selected>" + group.title + "</option>";
      } else {
        groupsOptions = groupsOptions + "<option>" + group.title + "</option>";
      }
    });
    groupContainer.innerHTML = groupsOptions;
  }
  
  function renderNewGroupOverlay(container, groups) {
    const html = `  <div class="overlay-title">New Group</div>
                      <hr>
                      <form id="new-group" class="overlay-form" action="">
                          <h1>Group Name:</h1><input id="title" type="text">
                          <input id="submit" class="submit" type="button" value="submit">
                      </form>`;
    container.innerHTML = container.innerHTML + html;
  }
  
  function renderTasks(tasks, activeGroup) {
    const container = document.querySelector(".main");
    container.innerHTML = `<div class="add-task" id="add-task">+ New Task</div>`; // Clears the div
    // Filter out tasks that are not assigned to the current group
    let activeTasks = [];
    if (activeGroup) {
      tasks.forEach(e => {
        if (e.group == activeGroup) {
          activeTasks.push(e);
        }
      });
    } else {
      // if no group is active, allow all tasks
      activeTasks = tasks;
    }
  
    activeTasks = activeTasks.sort((a, b) =>
      a.dateTime > b.dateTime || isNaN(b.dateTime) ? 1 : -1
    ); // Sort tasks by date
    activeTasks = activeTasks.sort((a, b) => (a.checked ? 1 : -1)); // Sort tasks by checked
  
    if (activeTasks.length != 0) {
      activeTasks.forEach(e => {
        const html = `<div class="checkbox-container"> 
                              <div class="checkbox" id="${e.id}">X</div> 
                          </div> 
                          <div class="title">${e.title} 
                              <span class="remove-task" id="${
                                e.id
                              }">&#128465;</span> 
                              <hr> 
                          </div>                         
                          <div class="description"> 
                              <p>${e.description}</p> 
                          </div> 
                          <div class="due-date"> 
                              ${setDueDate(e.dateTime)}
                          </div>`;
        const newTask = document.createElement("div");
        newTask.className = e.checked ? "task checked" : "task";
        if (e.dateTime <= new Date() && !e.checked) {
          newTask.classList.add("overdue");
        }
        newTask.innerHTML = html;
        container.appendChild(newTask);
      });
    } else {
      const html = "It's totally empty...";
      const newTask = document.createElement("div");
      newTask.className = "empty";
      newTask.textContent = html;
      container.appendChild(newTask);
    }
    setDueDate();
    setUpcoming(tasks);
  }
  
  function setDueDate(dateTime) {
    if (isNaN(dateTime)) {
      return "soon";
    } else {
      const html = `
          <div class="month">${getMonthFromTime(
            dateTimeToString(dateTime)
          )}</div> 
          <div class="date">${getDateFromTime(dateTimeToString(dateTime))}</div> 
          <div class="time">${getTimeFromTime(dateTimeToString(dateTime))}</div>
          <hr>
          <div class="day">${getDayFromTime(dateTimeToString(dateTime))}</div>
          `;
      return html;
    }
  }
  
  function renderGroups(groups, activeGroup) {
    const container = document.querySelector(".groups-container");
    // Clear the div --
    container.innerHTML = `<div class="header">
                              Groups
                              <div class="add-group">+</div>
                              </div>`;
    groups.forEach(e => {
      const newGroup = document.createElement("div");
      newGroup.className = "groups";
      newGroup.textContent = capitalize(e.title);
      newGroup.setAttribute("id", e.title);
      if (e.active == true) {
        newGroup.classList.add("active");
        newGroup.textContent = newGroup.textContent + " ⯈";
      }
      const removeGroup = document.createElement("div");
      removeGroup.className = "remove-groups";
      removeGroup.setAttribute("id", e.title);
      removeGroup.innerHTML = "&#128465;";
      newGroup.appendChild(removeGroup);
      container.appendChild(newGroup);
    });
    container.innerHTML =
      container.innerHTML + `<div class="groups all">All</div>`;
  }
  
  /*-- Helper Functions --*/
  function setUpcoming(tasks) {
    const container = document.getElementById("upcoming");
    const now = new Date();
    let upcomingTasks = tasks.sort((a, b) =>
      a.dateTime > b.dateTime || isNaN(a.dateTime) ? 1 : -1
    ); // Sort tasks by date
    if (upcomingTasks != "")
      upcomingTasks = upcomingTasks.filter(e => {
        return e.checked == false;
      });
    try {
      container.innerHTML = upcomingTasks[0].title + "<hr>";
      if (isNaN(upcomingTasks[0].dateTime)) {
        container.innerHTML = container.innerHTML + "No Time Set";
      } else {
        container.innerHTML =
          container.innerHTML +
          getDayFromTime(dateTimeToString(upcomingTasks[0].dateTime)) +
          " " +
          "<br>" +
          getMonthFromTime(dateTimeToString(upcomingTasks[0].dateTime)) +
          " " +
          getDateFromTime(dateTimeToString(upcomingTasks[0].dateTime)) +
          " " +
          getTimeFromTime(dateTimeToString(upcomingTasks[0].dateTime));
      }
      if (upcomingTasks[0].dateTime < now) {
        container.classList.add("overdue");
      } else {
        container.classList.remove("overdue");
      }
    } catch {
      container.innerHTML = "No tasks...";
      container.classList.remove("overdue");
    }
  }
  
  function getActiveGroup(groups) {
    let active = "";
    groups.forEach(e => {
      if (e.active) {
        active = e.title;
      }
    });
    return active;
  }
  
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function setDatePickerDefault() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString();
    let date = currentDate.getDate().toString();
    if (month[1] == null) month = "0" + month;
    if (date[1] == null) date = "0" + date;
    return year + "-" + month + "-" + date;
  }
  