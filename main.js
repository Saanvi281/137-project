objects = [];
status = "";

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        modelStorage.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status = Object Detected"
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected = " + objects.length;

            fill(red);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(red);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if( objects[i].label == object_name) {
                video.stop();
                modelstorage.detect(video, gotResults);
                document.getElementById("status").innerHTML = object_name +"found"
            }
            else{
                document.getElementById("status").innerHTML = object_name +" not-found"
            }
        }
    }
}
function start() {
    modelStorage = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
    object_name = document.getElementById("object_name").value
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function modelLoaded() {
    console.log("ModelLoaded!!!!");
    status = true;

}