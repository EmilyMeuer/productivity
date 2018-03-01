/*
    Emily Meuer
    03/02/2018

    Productivity Website
*/

window.onload=loadPhotos;

function loadPhotos() {
    var req;
    var reqObject;
    
    var tableElement    = document.getElementById("photos");
    
    req = new XMLHttpRequest();
    req.open("GET", "https://emilymeuer.github.io/json/photos.json", true);
    req.send();
    
    req.onreadystatechange  = function() {
        if(req.readyState == 4 && req.status == 200) {
            reqObject   = JSON.parse(req.responseText);
        
            for(var i = 0; i < reqObject.photos.length; i++)
            {
                tableElement.innerHTML  = tableElement.innerHTML + "<td><img src=\"" + reqObject.photos[i].source + "\" width=\"500\"></td>";
            }
            
            // Photo table - no border
 
            /*for(var i = 0; i < reqObject.photos.length; i++)
            {
                window.alert("reqObject.photos[" + i + "].source = " + reqObject.photos[i].source);
            }
             */
        }
    } // req-onreadystatechange
} // loadPhotos
