import {render} from './modules/DOM_manipulation.js';

let taskID = 0;
let tasks = [];
let groupID = 0;
let groups = [];

const Task = function(title, description, group, date) {
    const id = taskID;
    const checked = false;
    taskID++;
    return { title, description, group, date, id, checked };
}

const Group = function (title) {
    const id = groupID;
    const active = false;
    groupID++;
    return { title, id, active };
}

function buildListeners() {
    Array.from(document.querySelectorAll('.groups')).forEach((e) => {
        document.addEventListener('click', setActiveGroup);
    });
}

function setActiveGroup(e) {
    groups.forEach((group) => {
        (group.title == e.target.id)?group.active = true : group.active = false;
    });
    render(tasks,groups);
}

function dummyEntries() {
    const newTask = new Task('Make Do-It-Up', 'Lorem Impsum Set Dola','work',Date.now());
    const newerTask = new Task('Eat Food', 'Chomp, gobble, slurp','work',Date.now());
    const newestTask = new Task('Jubilate', 'HEYYYYY-EEEE-YAAAAY-EEE-YEAAAAAA-YEAH','play',Date.now());
    tasks.push(newTask,newerTask,newestTask);
    const newGroup = new Group('work');
    // newGroup.active = true;
    const newerGroup = new Group('play');
    newerGroup.active = true;
    groups.push(newGroup,newerGroup);
}

dummyEntries();
render(tasks, groups);
buildListeners();

