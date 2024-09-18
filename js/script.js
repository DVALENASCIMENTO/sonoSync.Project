// Exibe o horário atual em tempo real
function showTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    setTimeout(showTime, 1000);
}

// Alarme de sono
let alarmTime = null;
let isAlarmSet = false;
const alarmSound = document.getElementById("alarm-sound");

document.getElementById("set-alarm").addEventListener("click", function() {
    const sleepTimeInput = document.getElementById("sleep-time").value;
    const [hours, minutes] = sleepTimeInput.split(":");
    const now = new Date();
    alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    
    if (now > alarmTime) {
        alarmTime.setDate(alarmTime.getDate() + 1); // Se for no dia seguinte
    }
    
    isAlarmSet = true;
    alert(`Alarme definido para ${alarmTime.toLocaleTimeString()}`);
});

// Estágios de Sono
const sleepStages = [
    { name: "Estágio 1", duration: 10 },  // 10 minutos
    { name: "Estágio 2", duration: 20 },  // 20 minutos
    { name: "Estágio 3", duration: 30 },  // 30 minutos
    { name: "REM", duration: 30 }         // 30 minutos
];

let currentStageIndex = 0;
let currentCycle = 1;

function updateSleepStage() {
    const currentStage = sleepStages[currentStageIndex];
    
    // Atualiza o ciclo atual
    const cycleElement = document.querySelector(`.cycle${currentCycle}`);
    cycleElement.classList.add('active');
    cycleElement.querySelector('p').textContent = `${currentStage.name} (${currentStage.duration} min)`;
    
    // Avança para o próximo estágio após a duração do estágio atual
    setTimeout(() => {
        cycleElement.classList.remove('active');
        
        // Passa para o próximo estágio
        currentStageIndex++;
        if (currentStageIndex >= sleepStages.length) {
            currentStageIndex = 0;  // Reinicia os estágios
            currentCycle++;         // Passa para o próximo ciclo
            if (currentCycle > 5) currentCycle = 1; // Limita a 5 ciclos
        }
        
        updateSleepStage();
    }, currentStage.duration * 1000); // Multiplicado por 1000 para converter minutos para milissegundos
}

// Verificação do alarme e atualização do estágio de sono
function checkAlarm() {
    if (isAlarmSet) {
        const now = new Date();
        if (now >= alarmTime) {
            alarmSound.play();
            isAlarmSet = false; // Desabilitar o alarme após tocar
            updateSleepStage(); // Inicia o ciclo de sono após o alarme
        }
    }
    setTimeout(checkAlarm, 1000);
}

// Inicializa funções
showTime();
checkAlarm();
