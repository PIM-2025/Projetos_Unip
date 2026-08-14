# ⚒️ ByteForge

> **Forjando conhecimento:** mais do que apenas copiar respostas, o objetivo é realmente aprender a construir soluções!

O **ByteForge** é um chatbot inteligente voltado para programação, focado em responder dúvidas sobre código, linguagens e conceitos diretamente no navegador, de forma simples, clara e visual.

---

## 📖 Sobre o Projeto
A proposta do ByteForge é entregar uma experiência imersiva e intuitiva. A interface conta com um chat centralizado, atalhos para tópicos rápidos e um mascote interativo que reage às interações. No geral, o aplicativo oferece a leveza de um site comum, mas com um motor de inteligência artificial ou banco de conhecimentos robusto funcionando nos bastidores.

## 🚀 Tecnologias Utilizadas
O projeto foi construído focando na leveza e no controle total da interface, sem depender de bibliotecas ou frameworks pesados no Frontend.

- **Frontend:** HTML5, CSS3, JavaScript puro (Vanilla JS).
- **Backend (Proxy):** Node.js / Arquitetura Serverless (Vercel Functions).
- **IA e APIs:** Integração com LLMs externos (Groq / Llama 3) via proxy seguro.
- **Hospedagem:** Disponível publicamente via processo de deploy na web.

---

## ⚙️ Arquitetura e Funcionamento

### 1. Interface e Dinâmica do DOM
Tudo o que aparece na tela (chat, blocos de código com *syntax highlight*, animações e indicadores de digitação) é rigidamente controlado de forma nativa pelo navegador via JavaScript puro.

### 2. Comunicação Segura via Proxy Serverless
Para lidar com a inteligência artificial, não fazemos chamadas diretas pelo Frontend, pois isso exporia as chaves de API (tokens) no navegador e causaria erros de CORS.
- Utilizamos um **Proxy Serverless** (função intermediária).
- O proxy recebe a requisição do site, adiciona as credenciais com segurança, encaminha para a IA (como o Groq) e devolve apenas a resposta pronta para o usuário.

### 3. Confiabilidade e Respostas Locais (Fallback)
O sistema foi desenhado para não depender 100% de conexões externas. 
Caso haja falha na requisição da IA, queda de internet ou limite da API alcançado, o ByteForge continua funcionando perfeitamente utilizando o **Banco de Respostas Locais** (`brain.js`). Isso torna a aplicação altamente robusta, sobretudo para situações reais e apresentações ao vivo.

---

## 📱 Responsividade e Acessibilidade
O design foi concebido sob conceitos de *Responsive Web Design*. O chat se adapta suavemente a qualquer resolução, mantendo a facilidade de uso, leitura e cópia de códigos, seja na tela de um computador *desktop* ou na palma da mão através de um celular.

---

## 🛠️ Como Executar Localmente

### 1. Clone o repositório
```bash
git clone https://github.com/SeuUsuario/ByteForge.git
cd ByteForge
```

### 2. Configurar e rodar a API Proxy local
Para conversar com a inteligência artificial, você precisará ligar o proxy localmente.
```bash
# Instale as dependências caso necessário (ou apenas use o Node para rodar o script HTTP básico)
node groq-proxy.js
```
O proxy iniciará na porta `3000`.

### 3. Abrir o Frontend
Basta abrir o arquivo `index.html` em seu navegador favorito. Opcionalmente, você pode usar uma extensão como o *Live Server* no VS Code para servir os arquivos.

---

## 🤝 Colaboradores
Projeto desenvolvido para apresentação universitária (2º Semestre). Código-fonte totalmente disponível no GitHub para colaboração, ajustes e estudos. 

*Mantenha a forja acesa!* 🔥