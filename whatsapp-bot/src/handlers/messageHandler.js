const dialogo = require('./dialogo.json');
const { addToStack, getLastFromStack, resetStack, removeFromStack } = require('./stackHandler');

// Funções auxiliares
function getNavigationHints() {
    return "Você pode retornar ao menu principal com 'menu', ao menu anterior com 'voltar' ou encerrar o atendimento com 'encerrar'.";
}

function invalidOptionMessage(userId, empresaId) {
    const lastMenu = dialogo[empresaId][getLastFromStack(userId, empresaId)]?.menu || dialogo.welcome;
    return `Opção inválida. Por favor, escolha uma das opções disponíveis:\n${lastMenu}\n${getNavigationHints()}`;
}

function handleMenuNavigation(userId, empresaId, message, menu) {
    if (menu.menu) {
        addToStack(userId, empresaId, message);
        return `${menu.menu}\n${getNavigationHints()}`;
    }
    return `${menu || "Opção inválida."}\n${getNavigationHints()}`;
}

// Detecta saudações para iniciar o menu principal
function isSaudacao(message) {
    const saudacoes = ["oi", "olá", "ola", "bom dia", "boa tarde", "boa noite", "menu", "início", "começar"];
    return saudacoes.some(s => message.toLowerCase().includes(s));
}

// Processa a saudação inicial e reseta o contexto do usuário
function processSaudacao(userId) {
    resetStack(userId);
    return `${dialogo.welcome}\n\nDigite 'encerrar' ou 'sair' a qualquer momento para finalizar o atendimento.`;
}

// Processa a opção de voltar no menu
function processVoltar(userId, empresaId) {
    removeFromStack(userId, empresaId);
    const lastChoice = getLastFromStack(userId, empresaId) || 'welcome';
    const submenu = dialogo[empresaId][lastChoice];

    if (!submenu || !submenu.menu) {
        return `Não há menu anterior.\n${getNavigationHints()}`;
    }

    return `${submenu.menu || dialogo.welcome}\n${getNavigationHints()}`;
}

// Processa a escolha do menu principal e adiciona a opção de voltar
function processMenuEscolhido(userId, empresaId, message) {
    const menu = dialogo[empresaId][message];
    if (!menu) {
        return invalidOptionMessage(userId, empresaId);
    }

    addToStack(userId, empresaId, message);
    return handleMenuNavigation(userId, empresaId, message, menu);
}

// Processa a escolha do submenu
function processSubMenuEscolhido(userId, empresaId, message) {
    const lastChoice = getLastFromStack(userId, empresaId);
    const submenu = dialogo[empresaId][lastChoice]?.[message];

    if (!submenu) {
        return invalidOptionMessage(userId, empresaId);
    }

    if (typeof submenu === 'string') {
        return `${submenu}\n${getNavigationHints()}`;
    }

    addToStack(userId, empresaId, message);
    return handleMenuNavigation(userId, empresaId, message, submenu);
}

// Função principal para processar mensagens e gerenciar navegação
function processMessage(userId, message) {
    const empresaId = getLastFromStack(userId, 'empresa') || 'welcome'; // Pega a empresa do contexto do usuário
    if (isSaudacao(message)) { // Identifica saudação inicial
        return processSaudacao(userId);
    }

    if (message.toLowerCase() === 'menu') {
        return processSaudacao(userId);
    }

    if (message.toLowerCase() === 'voltar') { // Opção de voltar no menu
        return processVoltar(userId, empresaId);
    }

    const lastChoice = getLastFromStack(userId, empresaId);

    if (lastChoice && dialogo[empresaId][lastChoice]?.[message]) {
        return processSubMenuEscolhido(userId, empresaId, message);
    }
    
    if (dialogo[empresaId][message]) { // Usuário escolheu uma opção de menu principal válida
        return processMenuEscolhido(userId, empresaId, message);
    }

    return invalidOptionMessage(userId, empresaId);
}

module.exports = { processMessage };
