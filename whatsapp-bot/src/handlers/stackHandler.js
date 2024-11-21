const userContext = {}; // Exemplo: { userId: { empresaId: { stack: [] } } }

function initializeUserContext(userId, empresaId) {
    if (!userContext[userId]) {
        userContext[userId] = {};
    }
    if (!userContext[userId][empresaId]) {
        userContext[userId][empresaId] = { stack: [] };
    }
}

function addToStack(userId, empresaId, option) {
    initializeUserContext(userId, empresaId);
    userContext[userId][empresaId].stack.push(option);
}

function getLastFromStack(userId, empresaId) {
    initializeUserContext(userId, empresaId);
    const stack = userContext[userId][empresaId].stack;
    return stack.length > 0 ? stack[stack.length - 1] : null;
}

function resetStack(userId, empresaId) {
    if (userContext[userId] && userContext[userId][empresaId]) {
        userContext[userId][empresaId].stack = [];
    }
}

function removeFromStack(userId, empresaId) {
    initializeUserContext(userId, empresaId);
    if (userContext[userId][empresaId].stack.length > 0) {
        userContext[userId][empresaId].stack.pop();
    }
}

module.exports = {
    addToStack,
    getLastFromStack,
    resetStack,
    removeFromStack,
};
