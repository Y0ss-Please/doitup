import {render} from './modules/DOM_manipulation.js';

let taskID = 0;
let tasks = [];
let groupID = 0;
let groups = [];

const Task = function(title, description, group, date) {
    const id = taskID;
    const checked = false;
    return { title, description, group, date, id, checked };
}

const Group = function (title) {
    const id = groupID;
    const active = false;
    return { title, id, active };
}

function dummyEntries() {
    const newTask = new Task('Make Do-It-Up', 'Lorem Impsum Set Dola','work',Date.now());
    const newerTask = new Task('Eat Food', 'Chomp, gobble, slurp','work',Date.now());
    const newestTask = new Task('Jubilate', 'HEYYYYY-EEEE-YAAAAY-EEE-YEAAAAAA-YEAH','play',Date.now());
    tasks.push(newTask,newerTask,newestTask);
    const newGroup = new Group('work');
    const newerGroup = new Group('play');
    groups.push(newGroup,newerGroup);
}

dummyEntries();

console.log(tasks);

render(tasks, groups);

