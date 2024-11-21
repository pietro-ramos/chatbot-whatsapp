const { processMessage, userCompanies } = require('./handlers/messageHandler');
const { dialogo } = require('./handlers/dialogo');

function runTest() {
  const userId = 'user123'; // Identificador do usuário para teste

  console.log('Teste de Navegação Iniciado\n');

  // Teste 1: Escolha Gramado Parks
  console.log('1. Escolha Gramado Parks:');
  let response = processMessage(userId, '1'); // Escolhe Gramado Parks
  userCompanies[userId] = '1'; // Define a empresa atual como Gramado Parks
  console.log(response);

  // Teste 2: Escolha "Opções de Pagamento"
  console.log('\n2. Escolha Opções de Pagamento:');
  response = processMessage(userId, '2'); // Escolhe Opções de Pagamento dentro de Gramado Parks
  console.log(response);

  // Teste 3: Escolha "Classe I - Trabalhista"
  console.log('\n3. Escolha Classe I - Trabalhista:');
  response = processMessage(userId, '1'); // Escolhe Classe I - Trabalhista
  console.log(response);

  // Teste 4: Retorno ao menu anterior e escolher outra opção
  console.log('\n4. Retornar ao menu anterior e escolher outra opção:');
  response = processMessage(userId, 'voltar'); // Voltar para o menu anterior
  console.log(response);
  response = processMessage(userId, '2'); // Escolhe outra opção do menu de "Opções de Pagamento"
  console.log(response);

  // Teste 5: Escolha RP Transportes Pegoraro
  console.log('\n5. Escolha RP Transportes Pegoraro:');
  userCompanies[userId] = '3'; // Atualiza a empresa para RP Transportes Pegoraro
  response = processMessage(userId, '3'); // Escolhe RP Transportes Pegoraro
  console.log(response);

  // Teste 6: Escolha "Fase Atual"
  console.log('\n6. Escolha Fase Atual:');
  response = processMessage(userId, '2'); // Escolhe Fase Atual dentro de RP Transportes Pegoraro
  console.log(response);

  // Teste 7: Encerrar Atendimento
  console.log('\n7. Encerrar Atendimento:');
  response = processMessage(userId, 'encerrar'); // Encerra o atendimento
  console.log(response);

  console.log('\nTeste Completo Concluído');
}

runTest();
