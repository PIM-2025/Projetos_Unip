// servidor.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Bloco para compatibilidade com Windows (Winsock) e Linux/macOS
#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")                         // Link com a biblioteca Winsock para compiladores MSVC
#define close closesocket                                  // Mapeia a função close para closesocket no Windows
#define read(sock, buffer, len) recv(sock, buffer, len, 0) // Mapeia read para recv
#else                                                      // Para Linux/macOS
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#endif

#include "cJSON.h" // Inclui a biblioteca para manipulação de JSON
#include "banco.h" // Inclui nosso módulo de banco de dados

#define PORT 5050
#define BUFFER_SIZE 4096

// Protótipos das funções
void handle_connection(int client_socket, sqlite3 *db);

int main(void)
{
#ifdef _WIN32
  // Inicializa o Winsock no Windows
  WSADATA wsaData;
  int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
  if (iResult != 0)
  {
    printf("WSAStartup failed: %d\n", iResult);
    return 1;
  }
#endif

  sqlite3 *db = NULL;

  // No Windows, o tipo de socket é SOCKET, mas int funciona na maioria dos casos.
  // Usar 'int' aqui mantém a compatibilidade com o código Linux.
  int server_fd, client_socket;
  struct sockaddr_in address;
  int opt = 1;
  // socklen_t não existe no Winsock por padrão
  int addrlen = sizeof(address);

  // 1. Inicializa o banco de dados
  if (inicializar_banco(&db) != 0)
  {
    fprintf(stderr, "Falha fatal: Nao foi possivel inicializar o banco de dados.\n");
    return -1;
  }

  // 2. Cria o socket do servidor
  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
  {
#ifdef _WIN32
    fprintf(stderr, "socket failed com erro: %d\n", WSAGetLastError());
#else
    perror("socket failed");
#endif
    exit(EXIT_FAILURE);
  }

  // Permite reutilizar o endereço e a porta
  // No Windows, o 4º argumento de setsockopt é um char*
  if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, (const char *)&opt, sizeof(opt)))
  {
#ifdef _WIN32
    fprintf(stderr, "setsockopt failed com erro: %d\n", WSAGetLastError());
#else
    perror("setsockopt");
#endif
    exit(EXIT_FAILURE);
  }
  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY; // Escuta em todos os IPs locais (incluindo 127.0.0.1)
  address.sin_port = htons(PORT);

  // 3. Associa o socket à porta 5050
  if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0)
  {
#ifdef _WIN32
    fprintf(stderr, "bind failed com erro: %d\n", WSAGetLastError());
#else
    perror("bind failed");
#endif
    exit(EXIT_FAILURE);
  }

  // 4. Começa a escutar por conexões
  if (listen(server_fd, 3) < 0)
  {
#ifdef _WIN32
    fprintf(stderr, "listen failed com erro: %d\n", WSAGetLastError());
#else
    perror("listen");
#endif
    exit(EXIT_FAILURE);
  }

  printf("Servidor C escutando na porta %d\n", PORT);

  // 5. Loop infinito para aceitar conexões
  while (1)
  {
    printf("\nAguardando nova conexao...\n");
    if ((client_socket = accept(server_fd, (struct sockaddr *)&address, &addrlen)) < 0)
    {
#ifdef _WIN32
      fprintf(stderr, "accept failed com erro: %d\n", WSAGetLastError());
#else
      perror("accept");
#endif
      continue; // Continua para a próxima iteração em caso de erro
    }

    printf("Conexao aceita!\n");
    handle_connection(client_socket, db);
    close(client_socket); // Fecha o socket do cliente após o tratamento
  }

  // Fecha a conexão com o banco de dados ao final
  fechar_banco(db);

#ifdef _WIN32
  WSACleanup(); // Limpa o Winsock no final
#endif

  return 0;
}

// Função para tratar uma conexão de cliente
void handle_connection(int client_socket, sqlite3 *db)
{
  char buffer[BUFFER_SIZE] = {0};
  char *response_str = NULL;

  // Lê a mensagem do cliente
  int valread = read(client_socket, buffer, BUFFER_SIZE);
  if (valread <= 0)
  {
    printf("Cliente desconectou ou erro na leitura.\n");
    return;
  }
  printf("Mensagem recebida: %s\n", buffer);

  // Analisa o JSON recebido
  cJSON *json = cJSON_Parse(buffer);
  cJSON *response_json = cJSON_CreateObject();

  if (json == NULL)
  {
    const char *error_ptr = cJSON_GetErrorPtr();
    if (error_ptr != NULL)
    {
      fprintf(stderr, "Erro ao analisar JSON: %s\n", error_ptr);
    }
    cJSON_AddStringToObject(response_json, "status", "erro");
    cJSON_AddStringToObject(response_json, "mensagem", "JSON invalido.");
  }
  else
  {
    const cJSON *acao = cJSON_GetObjectItemCaseSensitive(json, "acao");

    if (cJSON_IsString(acao) && (acao->valuestring != NULL) && strcmp(acao->valuestring, "registrar_aula") == 0)
    {
      const cJSON *turma = cJSON_GetObjectItemCaseSensitive(json, "turma");
      const cJSON *professor = cJSON_GetObjectItemCaseSensitive(json, "professor");
      const cJSON *conteudo = cJSON_GetObjectItemCaseSensitive(json, "conteudo");

      if (cJSON_IsString(turma) && cJSON_IsString(professor) && cJSON_IsString(conteudo))
      {
        printf("Acao: registrar_aula. Turma: %s, Professor: %s\n", turma->valuestring, professor->valuestring);

        if (registrar_aula(db, turma->valuestring, professor->valuestring, conteudo->valuestring) == 0)
        {
          cJSON_AddStringToObject(response_json, "status", "sucesso");
          cJSON_AddStringToObject(response_json, "mensagem", "Aula registrada com sucesso!");
        }
        else
        {
          cJSON_AddStringToObject(response_json, "status", "erro");
          cJSON_AddStringToObject(response_json, "mensagem", "Falha ao registrar aula no banco de dados.");
        }
      }
      else
      {
        cJSON_AddStringToObject(response_json, "status", "erro");
        cJSON_AddStringToObject(response_json, "mensagem", "Dados para 'registrar_aula' estao faltando ou sao invalidos.");
      }
    }
    else if (cJSON_IsString(acao) && (acao->valuestring != NULL) && strcmp(acao->valuestring, "listar_aulas") == 0)
    {
      printf("Acao: listar_aulas\n");
      cJSON *aulas_array = cJSON_CreateArray();
      if (listar_aulas(db, aulas_array) == 0)
      {
        cJSON_AddStringToObject(response_json, "status", "sucesso");
        cJSON_AddItemToObject(response_json, "aulas", aulas_array);
      }
      // O array já está no response_json, não precisa deletar separado
    }
    else
    {
      cJSON_AddStringToObject(response_json, "status", "erro");
      cJSON_AddStringToObject(response_json, "mensagem", "Acao desconhecida ou nao especificada.");
    }
    cJSON_Delete(json); // Libera a memória do JSON recebido
  }

  // Converte a resposta JSON para string e envia ao cliente
  response_str = cJSON_PrintUnformatted(response_json);
  send(client_socket, response_str, strlen(response_str), 0);
  printf("Resposta enviada: %s\n", response_str);

  // Libera a memória da resposta
  cJSON_Delete(response_json);
  free(response_str);
}
