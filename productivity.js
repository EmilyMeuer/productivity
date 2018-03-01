/*
    Emily Meuer
    02/23/2018
 
  - sort ascending -- don't need descending
  - can use HTML color picker
*/

window.onload = function() {
    
};

var allTasks    = [];

function addTask() {
    var taskListElement = document.getElementById("tasks");
    var taskTextElement  = document.getElementById("taskText");
    var deadline  = document.getElementById("deadline").value;
    var category  = document.getElementById("categories").value;
    var tasksHTML   = taskListElement.innerHTML;
    var date      = new Date();
    taskListElement.innerHTML   = taskListElement.innerHTML +
        "<tr><td><input type=\"checkbox\"></input></td>" +
        "<td>" + taskTextElement.value + "</td>" +
        "<td>" + deadline + "</td>" +
        "<td>" + category + "</td>" +
        "<td>" + date.toLocaleDateString() + " " + date.toLocaleTimeString() + "</td></tr>";
    var task    = taskTextElement.value;
    taskTextElement.value   = "";
    allTasks.push( {
        task : task,
        deadline: deadline,
        category: category,
        dateAdded: date
                  });
}; // addTask

function sortByTask() {
    sortTasks(function(a, b) {
                  return a.task > b.task;
                  });
}

function sortByDeadline() {
    sortTasks(function(a, b) {
                  return a.deadline > b.deadline;
                  });
}

function sortByCategory() {
    sortTasks(function(a, b) {
                  return a.category > b.category;
                  });
}

function sortByDate() {
    sortTasks(function(a,b) {
              return a.dateAdded.getTime() > b.dateAdded.getTime();
              });
}

function sortTasks(sortFunction) {
    allTasks.sort(sortFunction);
    
    var taskListElement = document.getElementById("tasks");
    taskListElement.innerHTML   = "<th>Completed</th>" +
        "<th id=\"taskHeader\" onclick=\"sortByTask()\">Task</th>" +
        "<th id=\"deadlineHeader\" onclick=\"sortByDeadline()\">Deadline</th>" +
        "<th id=\"categoryHeader\" onclick=\"sortByCategory()\">Category</th>" +
        "<th id=\"dateHeader\" onclick=\"sortByDate()\">Date Added</th>";
    
    for(var i = 0; i < allTasks.length; i++)
    {
        taskListElement.innerHTML   = taskListElement.innerHTML +
        "<tr><td><input type=\"checkbox\"></input></td>" +
        "<td>" + allTasks[i].task + "</td>" +
        "<td>" + allTasks[i].deadline + "</td>" +
        "<td>" + allTasks[i].category + "</td>" +
        "<td>" + allTasks[i].dateAdded.toLocaleDateString() + " " + allTasks[i].dateAdded.toLocaleTimeString() + "</td></tr>";
    }
} // sortTasks

/*
    Date picker
  - Use Date object
  - Use table
*/
