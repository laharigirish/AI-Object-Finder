status = "";
objects = [];
video="";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
    input_name = document.getElementById("name").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#f21111");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#f21111");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_found").innerHTML = input_name+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_name + "found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = input_name + " not found";
            }
        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}