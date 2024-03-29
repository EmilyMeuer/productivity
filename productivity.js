/*
    Emily Meuer
    02/23/2018
 
  - can use HTML color picker
 
 
 Adding categories:
  - categories themselves should be objects, and they can have a color!
  - they should be all set in the JavaScript so that I can add to the list.
 
  - I still need to associate a category with a task,
    and with a color;
 It needs to be independent of that particular task -- no problem; it gets that
 from the document.getElementById.  ** But will that category be able to return my color?
*/

var allTasks    = [];
var categoryNames = [   // use this to get the strings and use the strings to get the colors
    "school", "work", "home", "jobs"
];
var categoryColors   = {
    "school" : "#99ff66",
    "work" : "#00ccff",
    "home" : "#ffff99",
    "jobs" : "#ff99cc"
};


window.onload = function() {
    // Set Category drop-down:
    var categoryDropDown    = document.getElementById("categories");
//    for(var i = 0; i < categoryNames.length; i++)
    for(var category in categoryColors) {
        categoryDropDown.innerHTML  = categoryDropDown.innerHTML + "<option value=" + category + ">" + category + "</option>\"";
    } // for
    
    // Fill the edit-categories table:
    var editCategoriesTable = document.getElementById("edit-categories");
    for(var category in categoryColors) {
        editCategoriesTable.innerHTML   = editCategoriesTable.innerHTML + "<tr><td>\"" + category + "\"</td><td><input type=color id=\"" + category + "color\" value=\"" + categoryColors[category] + "\"></td></tr>";
    }
    
    // Make the corner x hide the gray-background/edit-categories table:
    document.getElementById("close-edit").addEventListener("click", function() {
                                                                document.getElementById("gray-background").style.display  = "none";
                                                    setCategoryColor();
                                                                }, false);
    
};

// Clicking outside the table will also close it (but by not just adding the event to grayBackground's on-click, clicking on the table will not close it):
window.onclick = function(event) {
    var grayBackground  = document.getElementById("gray-background");
    var container       = document.getElementById("container");
    var flexContainer       = document.getElementById("flex-container");
 //   window.alert("clicked at all; event.target = " + event.target);
    if ( (event.target == grayBackground) || (event.target == container) || (event.target == flexContainer)) {
 //       window.alert("clicked on the background");
        grayBackground.style.display = "none";
        setCategoryColor();
    }
}

function addTask() {
    var taskListElement = document.getElementById("tasks");
    var taskTextElement  = document.getElementById("taskText");
    var deadline  = document.getElementById("deadline").value;
    var category  = document.getElementById("categories").value;
    var color     = categoryColors[category];
    var tasksHTML   = taskListElement.innerHTML;
    var date      = new Date();
    taskListElement.innerHTML   = taskListElement.innerHTML +
        "<tr class=\"tasks\" style=\"background-color:" + color + "\"><td><input type=\"checkbox\"></input></td>" +
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
        "<tr class=\"tasks\" style=\"background-color:" + categoryColors[allTasks[i].category] + "\"><td><input type=\"checkbox\"></input></td>" +
        "<td>" + allTasks[i].task + "</td>" +
        "<td>" + allTasks[i].deadline + "</td>" +
        "<td>" + allTasks[i].category + "</td>" +
        "<td>" + allTasks[i].dateAdded.toLocaleDateString() + " " + allTasks[i].dateAdded.toLocaleTimeString() + "</td></tr>";
    }
} // sortTasks

function editCategories() {
    document.getElementById("gray-background").style.display = "block";
} // editCategories

function setCategoryColor() {
    for(var category in categoryColors) {
        categoryColors[category]    = document.getElementById(category + "color").value;
    }
    // Doesn't actually sort; just updates the elements using the new colors:
    sortTasks(undefined);
}

/*
    Date picker
  - Use Date object
  - Use table
*/
