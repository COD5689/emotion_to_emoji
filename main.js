predection_1 = "";
predection_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_quality:'png',
    png_quality:100
});
camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SL3U3hQRQ/model.json", moadelLoaded);

function moadelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first perdection is "+ predection_1;
    speak_data2 = "And the second perdection is "+ predection_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult); 
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        predection_1 = results[0].label;
        predection_2 = results[1].label;
        speak();
        if(results[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if(results[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}

