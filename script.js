// Obtém referências aos elementos HTML
const roleta = document.getElementById('roleta');
const btnGirar = document.getElementById('btnGirar');
const btnPara = document.getElementById('btnPara'); // Vamos desabilitá-lo, mas mantemos a referência.

// Mapeamento dos quadrantes e o ângulo de parada (opcional, para log)
const quadrantes = {
    q1: { nome: 'Amarelo', angulo: 45 }, // Centro do quadrante 1 (0 a 90)
    q2: { nome: 'Azul', angulo: 135 },   // Centro do quadrante 2 (90 a 180)
    q3: { nome: 'Vermelho', angulo: 225 }, // Centro do quadrante 3 (180 a 270)
    q4: { nome: 'Verde', angulo: 315 }   // Centro do quadrante 4 (270 a 360)
};

// Variável global para armazenar a rotação base para que o próximo giro seja contínuo
let ultimaRotacao = 0;

/**
 * Inicia o giro da roleta com parada aleatória.
 */
function girarRoleta() {
    // Se o botão já estiver desabilitado, ignora o clique
    if (btnGirar.disabled) return;

    // 1. Desabilita o botão para evitar cliques durante o giro
    btnGirar.disabled = true;

    // 2. Escolhe um quadrante aleatório (ex: Amarelo, Azul, Vermelho, Verde)
    const chaves = Object.keys(quadrantes);
    const chaveSorteada = chaves[Math.floor(Math.random() * chaves.length)];
    const anguloDeParada = quadrantes[chaveSorteada].angulo;

    // 3. Define o giro total (múltiplas voltas + ângulo de parada)
    // 5 voltas completas (5 * 360) + ângulo de parada.
    // O uso de 'ultimaRotacao' faz com que o giro seja contínuo e não volte para 0.
    const voltas = 5;
    const giroTotal = ultimaRotacao + (voltas * 360) + (360 - anguloDeParada);
    ultimaRotacao = giroTotal; // Atualiza a rotação base para o próximo giro

    // 4. Aplica a transição e a rotação para iniciar o giro
    roleta.style.transition = 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)'; // 6 segundos, com desaceleração (ease-out)
    roleta.style.transform = `rotate(${giroTotal}deg)`;

    console.log(`Roleta girando! Parada em: ${quadrantes[chaveSorteada].nome} (${anguloDeParada} graus)`);

    // 5. Espera o tempo da transição e reabilita o botão
    setTimeout(() => {
        btnGirar.disabled = false;
        console.log(`Roleta parou no ${quadrantes[chaveSorteada].nome}!`);
    }, 6000); // 6000ms = 6 segundos (deve ser o mesmo tempo da transição)
}

// Inicialização: Desabilita o botão 'Para Roleta' e adiciona o listener de giro
btnPara.disabled = true;
btnPara.textContent = 'Parada Automática'; // Feedback visual

btnGirar.addEventListener('click', girarRoleta);