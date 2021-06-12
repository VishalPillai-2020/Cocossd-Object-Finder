status = "";
objects = [];
alarm = "";
search = "";
object="";

function searched() {
    search = document.getElementById("i1").value;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    search = search.toLowerCase();
    document.getElementById("l1").innerHTML = "Status:Detecting Objects";
    objectDetector.detect(video, gotResults);
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();


}

function modelLoaded() {
    console.log("Model Is Loaded");
    status = true;

}

function gotResults(error, results) {
    if (error) {
        console.error(error);

    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {

            document.getElementById("l1").innerHTML = "Status : Objects Detected";

            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            stroke(r, g, b);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == search) {
                document.getElementById("l2").innerHTML = search.toUpperCase() + " Found ";

                
                    synth = window.speechSynthesis;

                    speech = search + " Found";
    
                    utterThis = new SpeechSynthesisUtterance(speech);

                    synth.speak(utterThis);

                    objectDetetctor.detect(gotResults);
            
                



            } else {
                document.getElementById("l2").innerHTML = search.toUpperCase() + " not Found ";
            }
            
        }
    }
}
