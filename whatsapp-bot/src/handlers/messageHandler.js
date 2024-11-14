const dialogo = require('./dialogo.json');
const { addToStack, getLastFromStack, resetStack, removeFromStack } = require('./stackHandler');

// Detecta saudações para iniciar o menu principal
function isSaudacao(message) {
    const saudacoes = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "menu", "início", "começar"];
    return saudacoes.some(s => message.toLowerCase().includes(s));
}

// Processa a saudação inicial e reseta o contexto do usuário
function processSaudacao(userId) {
    resetStack(userId);
    return dialogo.welcome;
}

// Processa a opção de voltar no menu
function processVoltar(userId) {
    removeFromStack(userId);
    const lastChoice = getLastFromStack(userId) || 'welcome';
    return `${dialogo[lastChoice]?.menu || dialogo.welcome}\nDigite 'menu' para retornar ao menu principal ou 'voltar' para o menu anterior.`;
}

// Processa a escolha do menu principal e adiciona a opção de voltar
function processMenuEscolhido(userId, message) {
    addToStack(userId, message);
    return `${dialogo[message]?.menu || "Opção inválida."}\nDigite 'voltar' para retornar ao menu anterior.`;
}

// Processa a escolha do submenu, controlando acesso a "Outras Dúvidas"
function processSubMenuEscolhido(userId, message) {
    const lastChoice = getLastFromStack(userId);
    if (!dialogo[lastChoice]?.[message]) {
        return "Opção inválida. Por favor, escolha uma opção válida.";
    }

    const response = dialogo[lastChoice][message];
    
    // Adiciona a instrução de opções de navegação após o submenu
    return `${response}\nVocê pode retornar ao menu principal com 'menu' ou ao menu anterior com 'voltar'.`;
}

// Função principal para processar mensagens e gerenciar navegação
function processMessage(userId, message) {
    if (isSaudacao(message)) { // Identifica saudação inicial
        return processSaudacao(userId);
    }

    if (message.toLowerCase() === "voltar") { // Opção de voltar no menu
        return processVoltar(userId);
    }

    const lastChoice = getLastFromStack(userId);

    if (dialogo[lastChoice]?.[message]) { // Usuário escolheu uma opção de submenu válida
        return processSubMenuEscolhido(userId, message);
    }
    
    if (dialogo[message]) { // Usuário escolheu uma opção de menu principal válida
        return processMenuEscolhido(userId, message);
    }

    return "Opção inválida. Por favor, digite uma opção válida.";
}

module.exports = { processMessage };
