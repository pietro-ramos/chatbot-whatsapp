const dialogo = require('./dialogo.json');
const { addToStack, getLastFromStack, resetStack } = require('./stackHandler');

// Função para processar saudação inicial
function processSaudacao(userId) {
    resetStack(userId);
    return dialogo.welcome;
}

// Processa a escolha do menu principal
function processMenuEscolhido(userId, message) {
    addToStack(userId, message); // Armazena a escolha do menu na stack
    const processo = dialogo[message]?.menu || "Opção inválida.";
    return processo;
}

// Processa a escolha do submenu
function processSubMenuEscolhido(userId, message) {
    const lastChoice = getLastFromStack(userId);
    return dialogo[lastChoice][message] || "Opção inválida.";
}

// Função principal para processar mensagens com lógica de navegação
function processMessage(userId, message) {
    if (message.toLowerCase() === "menu") { // Inicia saudação e menu principal
        return processSaudacao(userId);
    }

    const lastChoice = getLastFromStack(userId);

    if (dialogo[lastChoice]?.[message]) { // Usuário escolheu uma opção válida no submenu
        return processSubMenuEscolhido(userId, message);
    }
    
    if (dialogo[message]) { // Usuário escolheu uma opção válida no menu principal
        return processMenuEscolhido(userId, message);
    }

    return "Opção inválida. Por favor, digite uma opção válida."; // Opção inválida
}

module.exports = { processMessage };
