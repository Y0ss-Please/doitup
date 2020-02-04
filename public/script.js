import { renderDOM, renderOverlay } from "./modules/DOM_manipulation.js";
import { userDateToEpoch } from "./modules/time_control.js";

let taskID = 0;
let tasks = [];
let groupID = 0;
let groups = [];

/* -- Factory Functions --*/
const Task = function(title, description, dateTime, group) {
  const id = taskID;
  const checked = false;
  taskID++;
  return { title, description, dateTime, group, checked, id };
};

const Group = function(title) {
  const id = groupID;
  const active = false;
  groupID++;
  return { title, id, active };
};

/* -- Listeners --*/
function buildListeners() {
  document.getElementById("add-task").addEventListener("click", taskBtn);
  Array.from(document.querySelectorAll(".groups")).forEach(e => {
    e.addEventListener("click", setActiveGroup);
  });
  Array.from(document.querySelectorAll(".remove-task")).forEach(e => {
    e.addEventListener("click", removeTask);
  });
  Array.from(document.querySelectorAll(".checkbox")).forEach(e => {
    e.addEventListener("click", toggleChecked);
  });
  Array.from(document.querySelectorAll(".remove-groups")).forEach(e => {
    e.addEventListener("click", removeGroups);
  });
  document.querySelector(".add-group").addEventListener("click", groupBtn);
}

/* -- Task Functions --*/
function taskBtn() {
  renderOverlay("newTask", groups);
  document.getElementById("submit").addEventListener("click", submitNewTask);
  toggleCurtain();
}

function submitNewTask() {
  prepareNewTask();
  toggleCurtain();
  render();
}

function prepareNewTask() {
  const form = document.getElementById("new-task");
  const [title, description, group, date, hour, minute, ampm] = [
    form[0].value,
    form[1].value,
    form[2].value,
    form[3].value,
    form[4].value,
    form[5].value,
    form[6].value
  ];
  const dateTime = userDateToEpoch(date, hour, minute, ampm); // TODO: set sateTime to the entered value!
  createNewTask(title, description, dateTime, group);
}

function createNewTask(title, description, date, hour, minute, ampm, group) {
  const newTask = new Task(title, description, date, hour, minute, ampm, group);
  tasks.push(newTask);
}

function removeTask(e) {
  if (!e.target) return;
  tasks = tasks.filter(el => {
    return e.target.id != el.id;
  });
  render();
}

function toggleChecked(e) {
  let checked = "";
  tasks.findIndex((element, index) => {
    if (element.id == e.target.id) {
      checked = index;
    }
  });
  tasks[checked].checked = !tasks[checked].checked;
  render();
}

/* -- Group Functions --*/
function setActiveGroup(e) {
  groups.forEach(group => {
    group.title == e.target.id ? (group.active = true) : (group.active = false);
  });
  render();
}

function groupBtn() {
  renderOverlay("newGroup", groups);
  document.getElementById("submit").addEventListener("click", submitNewGroup);
  toggleCurtain();
}

function submitNewGroup() {
  createNewGroup();
  toggleCurtain();
  render();
}

function createNewGroup() {
  const newGroup = new Group(document.getElementById("new-group")[0].value);
  groups.push(newGroup);
}

function removeGroups(e) {
  if (
    confirm(
      `This will delete the group "${e.target.id}" and all the tasks it contains. This cannot be undone. Are you sure?`
    )
  ) {
    tasks = tasks.filter(el => {
      return e.target.id != el.group;
    });
    groups = groups.filter(ele => {
      return e.target.id != ele.title;
    });
    render();
  }
}

/* -- Overlay Functions --*/
function toggleCurtain() {
  const curtain = document.querySelector(".curtain");
  curtain.classList.toggle("hidden");
  document
    .getElementById("overlay-close")
    .addEventListener("click", toggleCurtain);
}

/* -- Render --*/
function render() {
  setLocalStorage();
  renderDOM(tasks, groups);
  buildListeners();
}

/* -- Local Storage -- */

function getLocalStorage() {
  try {
    tasks = JSON.parse(window.localStorage.getItem("storedTasks"));
    groups = JSON.parse(window.localStorage.getItem("storedGroups"));
  } catch {
    window.localStorage.setItem("storedTasks", JSON.stringify(tasks));
    window.localStorage.setItem("storedGroups", JSON.stringify(groups));
  }
  if (tasks == null) {
    tasks = [];
  }
  if (groups == null) {
    groups = [];
  }
}

function setLocalStorage() {
  window.localStorage.setItem("storedTasks", JSON.stringify(tasks));
  window.localStorage.setItem("storedGroups", JSON.stringify(groups));
}

/* -- Initial render() Call --*/
if (typeof Storage !== "undefined") {
  getLocalStorage();
} else {
  alert(
    "Your browser does not support local storage. Anything you do here will be lost once you leave this page."
  );
}
render();
