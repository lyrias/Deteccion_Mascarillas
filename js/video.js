
    const URL = "./my_model/";    
    let model, webcam, labelContainer, maxPredictions;
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        const flip = true; 
        webcam = new tmImage.Webcam(350, 350, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { 
            labelContainer.appendChild(document.createElement("div"));         
        }
    }
    async function loop() {
        webcam.update(); 
        await predict();
        window.requestAnimationFrame(loop);
    }
    async function predict() {

        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
           var cp1 = parseInt(prediction[0].probability.toFixed(2)*100);
           var cp2 = parseInt(prediction[1].probability.toFixed(2)*100);
           var cp3 = parseInt(prediction[2].probability.toFixed(2)*100);  
            document.getElementById("barra-cbj").setAttribute("style","width:"+cp1+"%");
            document.getElementById("barra-cbj").setAttribute("aria-valuenow",cp1);            

            document.getElementById("barra-sbj").setAttribute("style","width:"+cp2+"%");
            document.getElementById("barra-sbj").setAttribute("aria-valuenow",cp2);

            document.getElementById("barra-nbj").setAttribute("style","width:"+cp3+"%");
            document.getElementById("barra-nbj").setAttribute("aria-valuenow",cp3);
        }
    }
    window.onload = function(){
        init();		
    }