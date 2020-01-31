let taskID = 0;
let tasks = [];
let groupID = 0;
let groups = [];

const Task = function(title, description, group, date) {
    id = taskID;    checked = false;
    return { title, description, group, date };
}

const Group = function (title) {
    id = groupID;
    active = false;
    return {title};
}

function dummyEntries() {
    const newTask = new Task('Make Do-It-Up', 'Lorem Impsum Set Dola','work',Date.now());
    const newerTask = new Task('Eat Food', 'Chomp, gobble, slurp','work',Date.now());
    const newestTask = new Task('Jubilate', 'HEYYYYY-EEEE-YAAAAY-EEE-YEAAAAAA-YEAH','play',Date.now());

    const newGroup = new Group('work');
    const newerGroup = new Group('play');
}

dummyEntries();

