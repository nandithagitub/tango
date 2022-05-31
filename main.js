var ScoreLeftWrist = 0;
var status;

function setup(){
    canvas = createCanvas(350,350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video,0,0,350,350);

    fill("red");
    stroke("red");

    status = song1.isPlaying();
    if(ScoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();

        if(status == false){
           song1.play();
           document.getElementById("song").innerHTML = "Wolves";
        }
    }
}

song1 = "";
song2 = "";

function preload (){
song1 = loadSound("Wolves.mp3");
song2 = loadSound("faded.mp3");
}

function modelLoaded(){
    console.log('poseNet is initialized');
}
rightWristX = 0;
rightWristY = 0;

leftWristY = 0;
leftWristX = 0;

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.x;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        ScoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}