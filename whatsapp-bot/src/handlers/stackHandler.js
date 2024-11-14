const userContext = {}; // Exemplo: { userId: { stack: [] } };

function initializeUserContext(userId) {
    if (!userContext[userId]) {
        userContext[userId] = { stack: [] };
    }
}

function addToStack(userId, option) {
    initializeUserContext(userId);
    userContext[userId].stack.push(option);
}

function getLastFromStack(userId) {
    initializeUserContext(userId);
    return userContext[userId].stack[userContext[userId].stack.length - 1];
}

function resetStack(userId) {
    if (userContext[userId]) {
        userContext[userId].stack = [];
    }
}

function removeFromStack(userId) {
    initializeUserContext(userId);
    if (userContext[userId].stack.length > 0) {
        userContext[userId].stack.pop();
    }
}

module.exports = {
    addToStack,
    getLastFromStack,
    resetStack,
    removeFromStack,
};
