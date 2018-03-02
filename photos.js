/*
    Emily Meuer
    03/02/2018

    Productivity Website
*/

window.onload=new function() {
    loadPhotos();
    
    // Make the corner x hide the gray-background/edit-categories table:
    document.getElementById("close-photo").addEventListener("click", function() {
                                                           document.getElementById("black-background").style.display  = "none";
                                                           }, false);
    

};

// Clicking outside the table will also close it (but by not just adding the event to blackBackground's on-click, clicking on the table will not close it):
window.onclick = function(event) {
    var blackBackground  = document.getElementById("black-background");
    var container       = document.getElementById("photo-container");
    var flexContainer       = document.getElementById("photo-flex-container");
    //   window.alert("clicked at all; event.target = " + event.target);
    if ( (event.target == blackBackground) || (event.target == container) || (event.target == flexContainer)) {
        //       window.alert("clicked on the background");
        blackBackground.style.display = "none";
    }
}

function loadPhotos() {
    var req;
    var reqObject;
    
    var tableElement    = document.getElementById("photos");
    var photoElement;
    var width   = window.innerWidth / 5;
    
    req = new XMLHttpRequest();
    req.open("GET", "https://emilymeuer.github.io/json/photos.json", true);
    req.send();
    
    req.onreadystatechange  = function() {
        if(req.readyState == 4 && req.status == 200) {
            reqObject   = JSON.parse(req.responseText);
        
            for(var i = 0; i < reqObject.photos.length; i++)
            {
                var size;
                // Figure out whether the height is bigger than the width;
                // Set height and width to ___ and alia accordingly.
                tableElement.innerHTML  = tableElement.innerHTML + "<img id=\"photo" + i + "\" src=\"" + reqObject.photos[i].source + "\" width=\"" + width + "\">";
            }
            
            for(var j = 0; j < reqObject.photos.length; j++)
            {
                photoElement    = document.getElementById("photo" + j);
                photoElement.addEventListener("click", enlarge, false);
                //window.alert("j = " + j + "; photoElement.height = " + photoElement.width);
            }
            
            // Photo table - no border

        }
    } // req-onreadystatechange
} // loadPhotos

function enlarge() {
    document.getElementById("black-background").style.display = "block";
    document.getElementById("large-image").src  = this.src;
}
