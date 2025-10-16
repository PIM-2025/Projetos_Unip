#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#define close closesocket
#define read(s, b, l) recv(s, b, l, 0)
#else
#include <unistd.h>
#include <arpa/inet.h>
#endif

#include "banco.h"

#define PORTA 5050
#define TAM_MAX 4096

// Parser simples para JSON
char *buscar_valor(const char *msg, const char *chave, char *dest, int tam)
{
  char padrao[64];
  sprintf(padrao, "\"%s\":\"", chave);
  char *p = strstr(msg, padrao);
  if (!p)
    return NULL;
  p += strlen(padrao);
  char *fim = strchr(p, '"');
  if (!fim)
    return NULL;
  int len = fim - p;
  if (len >= tam)
    len = tam - 1;
  strncpy(dest, p, len);
  dest[len] = '\0';
  return dest;
}

int main()
{
#ifdef _WIN32
  WSADATA wsaData;
  if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
  {
    printf("Erro WSAStartup\n");
    return 1;
  }
#endif

  if (!inicializar_banco())
  {
    printf("Erro ao inicializar banco.\n");
#ifdef _WIN32
    WSACleanup();
#endif
    return 1;
  }

  int servidor, cliente;
  struct sockaddr_in addr_servidor, addr_cliente;
  socklen_t tam_cliente = sizeof(addr_cliente);
  char buffer[TAM_MAX], resposta[TAM_MAX];

  servidor = socket(AF_INET, SOCK_STREAM, 0);
  if (servidor < 0)
  {
    printf("Erro ao criar socket.\n");
    return 1;
  }

  addr_servidor.sin_family = AF_INET;
  addr_servidor.sin_port = htons(PORTA);
  addr_servidor.sin_addr.s_addr = INADDR_ANY;

  if (bind(servidor, (struct sockaddr *)&addr_servidor, sizeof(addr_servidor)) < 0)
  {
    printf("Erro ao bind.\n");
    return 1;
  }

  if (listen(servidor, 5) < 0)
  {
    printf("Erro ao listen.\n");
    return 1;
  }

  printf("Servidor rodando na porta %d...\n", PORTA);

  while (1)
  {
    cliente = accept(servidor, (struct sockaddr *)&addr_cliente, &tam_cliente);
    if (cliente < 0)
    {
      printf("Erro ao aceitar cliente.\n");
      continue;
    }

    memset(buffer, 0, TAM_MAX);
    read(cliente, buffer, TAM_MAX);
    int n = read(cliente, buffer, TAM_MAX - 1);
    if (n > 0)
      buffer[n] = '\0';

    char acao[64];
    buscar_valor(buffer, "acao", acao, sizeof(acao));

    if (strlen(acao) == 0)
    {
      strcpy(resposta, "{\"status\":\"erro\",\"mensagem\":\"Requisição inválida\"}");
    }
    else if (strcmp(acao, "registrar_aula") == 0)
    {
      char turma[128], professor[128], conteudo[1024];
      buscar_valor(buffer, "turma", turma, sizeof(turma));
      buscar_valor(buffer, "professor", professor, sizeof(professor));
      buscar_valor(buffer, "conteudo", conteudo, sizeof(conteudo));

      if (registrar_aula(turma, professor, conteudo))
        strcpy(resposta, "{\"status\":\"ok\",\"mensagem\":\"Aula registrada com sucesso!\"}");
      else
        strcpy(resposta, "{\"status\":\"erro\",\"mensagem\":\"Falha ao registrar aula\"}");
    }
    else if (strcmp(acao, "listar_aulas") == 0)
    {
      char json_lista[TAM_MAX];
      if (listar_aulas(json_lista, TAM_MAX))
        snprintf(resposta, TAM_MAX, "{\"status\":\"ok\",\"dados\":%s}", json_lista);
      else
        strcpy(resposta, "{\"status\":\"erro\",\"mensagem\":\"Falha ao listar aulas\"}");
    }
    else
    {
      strcpy(resposta, "{\"status\":\"erro\",\"mensagem\":\"Ação desconhecida\"}");
    }

    send(cliente, resposta, (int)strlen(resposta), 0);
    close(cliente);
  }

  sqlite3_close(db);

#ifdef _WIN32
  WSACleanup();
#endif

  return 0;
}
