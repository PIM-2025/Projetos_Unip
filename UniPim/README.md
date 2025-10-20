# UniPIM# 📘 Plataforma de Registro Acadêmico Digital

## 🎯 Objetivo do Projeto

A **Plataforma de Registro Acadêmico Digital** tem como objetivo facilitar o registro e a organização das informações escolares, substituindo o **diário de classe tradicional em papel** por uma versão eletrônica.  
Com ela, será possível registrar **aulas, presenças, notas e atividades** de forma rápida e prática, oferecendo mais agilidade para professores e mais transparência para alunos e gestores.

O sistema busca tornar o processo de acompanhamento acadêmico mais **simples, moderno e acessível**, contribuindo para a **redução da burocracia** e para uma **melhor comunicação dentro do ambiente escolar**.

---

## 🧩 Estrutura do Projeto

**Tema do PIM:** Desenvolvimento de um Sistema Acadêmico Colaborativo com Apoio de Inteligência Artificial (IA)  
**Nome do Sistema:** Plataforma de Registro Acadêmico Digital (PRAD)  
**Linguagens:** Python (Tkinter) e C (Backend)

---

## 👥 Divisão de Equipe e Responsabilidades

| Integrante                                       | Função Principal                            | Responsabilidades                                                                                                                                                                                                                                                                     | Entregas                                                                                              |
| ------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **1️⃣ Líder do Projeto / Analista de Requisitos** | Organização e documentação                  | - Criar o **documento principal (ABNT)**: introdução, justificativa, objetivos e metodologia.<br> - Reunir requisitos do sistema com o grupo.<br> - Coordenar prazos e integração entre membros.                                                                                      | Documento ABNT (introdução, objetivos, justificativa, metodologia).<br> Cronograma e atas de reunião. |
| **2️⃣ Desenvolvedor Backend (C)**                 | Lógica de negócio e banco de dados          | - Criar módulos em **C** para:<br> &nbsp;&nbsp;• Registro de aulas e presenças.<br> &nbsp;&nbsp;• Controle de notas e médias.<br> &nbsp;&nbsp;• Acesso e autenticação de usuários.<br> - Fazer comunicação com Python (via **socket**, **arquivo CSV/JSON** ou **API local**).        | Código C documentado.<br> Diagramas UML (classes e sequência).                                        |
| **3️⃣ Desenvolvedor Frontend (Python + Tkinter)** | Interface gráfica e interação com o usuário | - Criar telas em Tkinter para:<br> &nbsp;&nbsp;• Login e cadastro.<br> &nbsp;&nbsp;• Registro de aulas e notas.<br> &nbsp;&nbsp;• Mural de atividades.<br> &nbsp;&nbsp;• Relatórios e avisos.<br> - Integrar interface com backend C.                                                 | Código Python documentado.<br> Telas funcionais.<br> Manual de uso (prints e explicações).            |
| **4️⃣ Engenheiro de Testes e Redes**              | Testes, rede local e validação              | - Configurar **rede local (LAN)** simulada com 2 máquinas (cliente e servidor).<br> - Realizar **testes de homologação** (funcionalidade, desempenho e rede).<br> - Criar o **plano de testes** e **diagrama de rede** (IPs estáticos, DHCP etc.).                                    | Plano de testes.<br> Diagrama de rede.<br> Relatório de homologação.                                  |
| **5️⃣ Especialista em IA e Documentação Final**   | IA e conclusão do relatório                 | - Criar uma **IA simples** em Python:<br> &nbsp;&nbsp;• Sugestão de atividades com base em aulas registradas.<br> &nbsp;&nbsp;• Chat interno para dúvidas frequentes.<br> - Escrever **conclusão, resultados esperados e referências ABNT**.<br> - Criar **apresentação PowerPoint**. | Módulo de IA (Python).<br> Conclusão ABNT.<br> Slides de apresentação.                                |

---

## ⚙️ Arquitetura Técnica

┌───────────────────────────────┐
│ Interface Tkinter (Python) │
│ - Login, mural, registro │
│ - Consulta de dados │
│ - IA de sugestões/respostas │
└──────────────┬────────────────┘
│
Comunicação via socket/arquivo
│
┌───────────────────────────────┐
│ Módulos em C (Backend) │
│ - CRUD de alunos, turmas │
│ - Registro de notas/presenças│
│ - Armazenamento (CSV/binário)│
└───────────────────────────────┘
│
┌───────────────────────────────┐
│ Banco de Dados Local / Arquivo│
│ - Dados persistentes │
└───────────────────────────────┘

---

## 🧠 Inteligência Artificial no Projeto

A IA será aplicada em funções simples e úteis dentro do ambiente escolar, como:

- **Chat de Dúvidas Frequentes:** o sistema responde perguntas básicas dos usuários.
- **Sugestão de Atividades:** a IA recomenda tarefas com base no histórico de aulas.
- **Resumo Automático:** gera pequenos resumos dos avisos do mural.

---

## 🧾 Estrutura do Relatório (Padrão ABNT)

1. **Capa e Folha de Rosto**
2. **Resumo e Palavras-Chave**
3. **Introdução** – Contextualização e objetivos do projeto
4. **Justificativa** – Importância da digitalização dos registros acadêmicos
5. **Objetivos Gerais e Específicos**
6. **Metodologia** – Linguagens, ferramentas, divisão de equipe
7. **Desenvolvimento**
   - Estrutura do sistema
   - Diagramas UML e de rede
   - Prints das telas
8. **Resultados Esperados e Testes**
9. **Conclusão e Trabalhos Futuros**
10. **Referências Bibliográficas**

---

## 📊 Estrutura da Apresentação (PowerPoint)

1. **Título, Curso e Integrantes**
2. **Problema Identificado**
3. **Solução Proposta (PRAD)**
4. **Tecnologias Utilizadas (Python, Tkinter, C, IA)**
5. **Diagramas UML e de Rede**
6. **Prints das Telas e Demonstração**
7. **Resultados e Benefícios**
8. **Conclusão e Próximos Passos**

---

## 📅 Sugestão de Cronograma (Resumo)

| Semana | Atividade                                        | Responsável          |
| ------ | ------------------------------------------------ | -------------------- |
| 1–2    | Levantamento de requisitos e definição do escopo | Líder                |
| 3–4    | Criação do backend em C                          | Dev Backend          |
| 5–6    | Desenvolvimento da interface Tkinter             | Dev Frontend         |
| 7–8    | Implementação da IA e integração                 | Especialista IA      |
| 9      | Testes e validação em rede local                 | Engenheiro de Testes |
| 10     | Finalização da documentação ABNT e PowerPoint    | Todos                |

---

## 📦 Entregáveis Finais

- Documento ABNT completo (PDF)
- Código-fonte (Python + C) comentado
- Diagramas UML e de rede
- Plano de testes e homologação
- Manual do usuário
- Apresentação PowerPoint
- Demonstração prática (2 usuários conectados em rede local)

---

> 💬 **Dica:** utilize GitHub ou Google Drive para centralizar os arquivos e permitir que todos os integrantes trabalhem de forma colaborativa e organizada.



Rodar: gcc servidor.c cJSON.c sqlite3.c -o output/servidor.exe -lws2_32
gcc src/servidor.c src/cJSON.c src/sqlite3.c -Iinclude -o build/servidor.exe -lws2_32


Instalações Front:
pip install customtkinter
pip install Pillow
