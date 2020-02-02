import {renderDOM} from './modules/DOM_manipulation.js';
import {renderOverlay} from './modules/DOM_manipulation.js';

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

    const dateTime = Date.now(); // TODO: set sateTime to the entered value!

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
    const newGroup = new Group('work');
    // newGroup.active = true;
    const newerGroup = new Group('play');
    newerGroup.active = true;
    groups.push(newGroup,newerGroup);
}

/* -- Initial Function Call --*/
dummyEntries();
render(tasks, groups);


/* -- TODO --*/

/*  
Timey Wimey crap. Tasks need to store dates as Epoch time, but DOM needs to display 
dates and times relative to the current users timezone. One day when I get around to making
cron jobs this should make life a lot easier.

Also there should be an array of tasks that need to be remindered. Cron job will check for 
tasks with a matching time, send reminder and remove it from the list. Back end stuff, will
probably do way later, but it needs doing some time...
*/

// Messing with the fabric of space-time //
const someDate = new Date();
console.log('user date: '+someDate);
console.log('GMT date: '+someDate.toGMTString());
console.log('Epoch date: '+someDate.getTime());


const userDate = new Date();
const userUTCOffset = userDate.getTimezoneOffset();



console.log(userUTCOffset);
console.table(tasks);