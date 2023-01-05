song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600, 400);
canvas.position(425, 200);
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function draw(){
image(video, 0, 0, 600, 400);
fill("#1A5276");
stroke("#1A5276");
if (scoreLeftWrist>0.2) {
    circle(leftWristX, leftWristY, 20);
    numberLeftWrist=Number(leftWristY);
    removeDecimal=floor(numberLeftWrist);
    volume=removeDecimal/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);    
}
if (scoreRightWrist>0.2) {
    circle(rightWristX, rightWristY, 20);
    if (rightWristY>0 && rightWristY<=100) {
        document.getElementById("speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);  
    }
    else if (rightWristY>100 && rightWristY<=200) {
        document.getElementById("speed").innerHTML="Speed = 1.0x";
        song.rate(1);  
    }
    else if (rightWristY>200 && rightWristY<=300) {
        document.getElementById("speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);  
    }
    else if (rightWristY>300 && rightWristY<=400) {
        document.getElementById("speed").innerHTML="Speed = 2x";
        song.rate(2);  
    }
    else{
        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);  
    }
}
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function modelLoaded(){
console.log('Model is Loaded');
}
function gotPoses(results){
if(results.length>0){
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
console.log("scoreLeftWrist = "+scoreLeftWrist);
console.log("scoreRightWrist = "+scoreRightWrist);
console.log(results);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
}
}