document.getElementById("audio")
.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        const arraybuffer = event.target.result;
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(arraybuffer, (audioBuffer) => {
            visualize(audioBuffer, audioContext);
        });
    });
    reader.readAsArrayBuffer(file);

});

function visualize(audioBuffer, audioContext){
    const canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const frequencyBufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(frequencyBufferLength);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    source.start();

    const canvasContext = canvas.getContext("2d");
    
    const barWidth = canvas.width / frequencyBufferLength;

    function draw(){
        requestAnimationFrame(draw);
        canvasContext.fillStyle = '#F0F0F0';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.fillStyle = '#5271FF';

        analyser.getByteFrequencyData(frequencyData);

        const max = Math.max(...frequencyData);
        for(let i = 0; i < frequencyBufferLength; i++){
            const barHeight = frequencyData[i]*canvas.height/255;
            canvasContext.fillRect(
                i * barWidth,
                canvas.height - barHeight - 10,
                barWidth - 2,
                barHeight
            );
        }
    }

    draw();
}

