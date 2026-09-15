/* eslint-disable guard-for-in,no-restricted-syntax,no-continue */

/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 03/07/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const tasks = require('./gulp');

function handleTask(taskName, task) {
    for (const subTaskName in task) {
        const subTask = task[subTaskName];

        if (typeof subTask === 'object') {
            handleTask(`${taskName}:${subTaskName}`, subTask);
            continue;
        }
        if (typeof subTask !== 'function') continue;

        if (subTaskName === 'default') {
            exports[taskName] = subTask;
        } else {
            exports[`${taskName}:${subTaskName}`] = subTask;
        }
    }
}

for (const taskName in tasks) {
    const task = tasks[taskName];
    handleTask(taskName, task);
}

exports.default = tasks.serve.default;
