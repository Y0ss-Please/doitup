import {renderDOM, renderOverlay} from './modules/DOM_manipulation.js';
import {userDateToEpoch} from './modules/time_control.js';

let taskID = 0;
let tasks = [];
let groupID = 0;
let groups = [];


/* -- Factory Functions --*/
const Task = function( title, description, dateTime, group, sms, email, reminder, recurring ) {
    const id = taskID;
    const checked = false;
    taskID++;
    return { title, description, dateTime, group, sms, email, reminder, recurring, checked, id };
}

const Group = function (title) {
    const id = groupID;
    const active = false;
    groupID++;
    return { title, id, active };
}

/* -- Listeners --*/
function buildListeners() {
    document.getElementById('add-task').addEventListener('click', taskBtn);
    Array.from(document.querySelectorAll('.groups')).forEach((e) => {
        e.addEventListener('click', setActiveGroup);
    });
}


/* -- Task Functions --*/
function taskBtn() {
    renderOverlay('newTask');
    document.getElementById('submit').addEventListener('click', submitNewTask);
    toggleCurtain();
}

function submitNewTask() {
    prepareNewTask();
    toggleCurtain();
    render();
    console.table(tasks);
}

function prepareNewTask() {
    const form = document.getElementById('new-task');
    const [title, description, date, hour, minute, ampm, group, sms, email, reminder, recurring] 
    = [form[0].value, form[1].value, form[2].value, form[3].value, form[4].value,
    form[5].value, form[6].value, form[7].value, form[8].value, form[9].value, form[10].value];
    const dateTime = userDateToEpoch(date,hour,minute,ampm); // TODO: set sateTime to the entered value!
    createNewTask(title, description, dateTime, group, sms, email, reminder, recurring);
}

function createNewTask(title, description, date, hour, minute, ampm, group, sms, email, reminder, recurring) {
    const newTask = new Task (title, description, date, hour, minute, ampm, group, sms, email, reminder, recurring);
    tasks.push(newTask);
}


/* -- Group Functions --*/
function setActiveGroup(e) {
    groups.forEach((group) => {
        (group.title == e.target.id)?group.active = true : group.active = false;
    });
    render();
}


/* -- Overlay Functions --*/
function toggleCurtain() {
    const curtain = document.querySelector('.curtain');
    curtain.classList.toggle('hidden');
    document.getElementById('overlay-close').addEventListener('click', toggleCurtain);
}


/* -- Render --*/
function render() {
    renderDOM(tasks, groups);
    buildListeners();
}


/* -- Dummy Entries, delet someday --*/
function dummyEntries() {
    createNewTask('Make Do-It-Up', 'Lorem Impsum Set Dola', Date.now(), 'work', 'true', 'true', '1 hour before', 'every week');
    createNewTask('Eat Food', 'Chomp, gobble, slurp', Date.now(), 'work', 'false', 'false', 'false', 'false');
    createNewTask('Jubilate', 'HEYYYYY-EEEE-YAAAAY-EEE-YEAAAAAA-YEAH', Date.now(), 'play', 'false', 'true', '1 day bofore', 'every month');
    createNewTask('Birf-deah', 'Time on the right should be 12:30pm Friday March 6 2020', 1583523000000, 'play', 'false', 'true', '1 day bofore', 'every month');
    const newGroup = new Group('work');
    // newGroup.active = true;
    const newerGroup = new Group('play');
    newerGroup.active = true;
    groups.push(newGroup,newerGroup);
}

/* -- Initial Function Call --*/
dummyEntries();
render(tasks, groups);
console.table(tasks);