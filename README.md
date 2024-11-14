
# Chatbot para Consultas Automatizadas via WhatsApp

Este projeto implementa um chatbot para WhatsApp, desenvolvido utilizando **Node.js** e a biblioteca [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js). O sistema foi projetado para fornecer um fluxo de consultas interativas via WhatsApp, com um modelo de navegação baseado em opções de menu.

## Descrição

O projeto foi desenvolvido de forma expansível, permitindo que você personalize e adapte as mensagens e fluxos de navegação conforme as necessidades do seu negócio ou aplicação. No exemplo, a configuração foi feita com um foco específico em processos de recuperação judicial, mas o modelo de navegação e estrutura de dados pode ser facilmente adaptado para diversos tipos de consulta automatizada, seja para serviços de suporte, informações institucionais ou outros tipos de interação com os usuários.

## Funcionalidades

- **Saudações**: O chatbot responde a saudações com uma mensagem de boas-vindas e oferece opções de menu.
- **Menu Principal**: O usuário pode escolher entre várias opções, cada uma levando a um submenu específico.
- **Navegação Dinâmica**: O chatbot permite ao usuário navegar entre as opções do menu e submenus, e até voltar para o menu anterior.
- **Opções de Voltar**: O usuário pode voltar ao menu anterior a qualquer momento.
- **Outras Dúvidas**: Após responder a uma consulta, o chatbot oferece a opção de registrar outras dúvidas ou voltar ao menu inicial.

## Tecnologias

- **Node.js**: Plataforma JavaScript para o back-end.
- **whatsapp-web.js**: Biblioteca para interação com o WhatsApp Web, que permite o envio e recebimento de mensagens.
- **JSON**: Arquivo de configuração para definição das mensagens e estrutura de navegação.

## Estrutura do Projeto

### Arquivos principais

- **`messageHandler.js`**: Responsável por gerenciar o fluxo de mensagens, processar as opções escolhidas pelo usuário e navegar entre menus e submenus.
- **`stackHandler.js`**: Gerencia a pilha de navegação dos usuários, permitindo armazenar o estado de onde o usuário está no fluxo.
- **`dialogo_example.json`**: Arquivo de exemplo com a estrutura de navegação e mensagens. É aqui que você define os menus, submenus e as mensagens a serem enviadas ao usuário.

### Exemplo de `dialogo_example.json`

```json
{
    "welcome": "Insira a saudação",
    
    "1": {
        "menu": "Mensagem a retornar",
        "b": "Retorno da opção B",
        "c": "Retorno da opção C"
    },

    "2": {
        "menu": "Mensagem a retornar",
        "b": "Retorno da opção B",
        "c": "Retorno da opção C"
    },

    "3": {
        "menu": "Mensagem a retornar",
        "b": "Retorno da opção B",
        "c": "Retorno da opção C"
    },
  
    "4": {
        "prompt": "Outras dúvidas"
    }
}
```

### Principais Funcionalidades

- **`"welcome"`**: A mensagem de boas-vindas que é enviada assim que o usuário inicia a conversa.
- **Menu**: Cada número (`"1"`, `"2"`, `"3"`) representa uma categoria de opções, e dentro delas você define um submenu (opções `"b"`, `"c"`, etc.).
- **"4"**: Define uma opção para o usuário registrar outras dúvidas ou retornar ao menu anterior.

## Como Rodar o Projeto

### 1. Instalação das Dependências

Clone o repositório:

```bash
git clone https://github.com/pietro-ramos/chatbot-whatsapp.git
cd chatbot-whatsapp
```

Instale as dependências do projeto:

```bash
npm install
npm i whatsapp-web.js
```

### 2. Executando o Bot

Após a configuração inicial, execute o bot:

```bash
npm start
```

O bot irá fornecer o QR Code, escaneie e ele irá começar a monitorar as mensagens recebidas.

## Personalizando o Fluxo de Mensagens

- O arquivo **`dialogo_example.json`** contém todas as mensagens do fluxo de interação.
- Personalize as mensagens de acordo com a necessidade do seu projeto.
- Para adicionar novas opções, basta adicionar novas chaves (como `"5"`, `"6"`) e definir o conteúdo das respostas.


## Agradecimentos

- [whatsapp-web.js](https://github.com/mukulhase/Web.whatsapp.js) pela incrível biblioteca que facilita a interação com o WhatsApp Web.
