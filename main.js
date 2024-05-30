video = "";
search = "person";
objects = [];
Status = "";
alarm = ""
console.log("Baby Monitoring! If there is no baby, you might experience a jumpscare, the audio is very loud")
function preload()
{
    alarm = loadSound("Friendly Alarm.mp3");
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(Status != "")
        {
            objectDetector.detect(video, gotResult);
            for(i=0; i < objects.length; i++)
            {
                if (search == objects[i].label)
                    {
                        document.getElementById('status').innerHTML = "Status: Baby detected";
                        alarm.stop();
                    }else
                    {
                        alarm.play();
                    }
               
                document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;
    
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect=(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Searching for objects...";
    console.log(search);
}

function modelLoaded()
{
    console.log("Model Loaded");
    Status = true;

}

function gotResult(error, results)
{
    if (error)
        {
            console.error(error);
        }
        console.log(results);
        objects = results;
}