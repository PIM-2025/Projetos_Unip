#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "sqlite3.h"
#include "banco.h"

sqlite3 *db = NULL;

int inicializar_banco()
{
  char *erro = NULL;
  int rc = sqlite3_open("banco.db", &db);
  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Erro ao abrir banco: %s\n", sqlite3_errmsg(db));
    return 0;
  }

  const char *sql =
      "CREATE TABLE IF NOT EXISTS aulas ("
      "id INTEGER PRIMARY KEY AUTOINCREMENT,"
      "turma TEXT,"
      "professor TEXT,"
      "conteudo TEXT,"
      "data TEXT DEFAULT (datetime('now'))"
      ");";

  rc = sqlite3_exec(db, sql, 0, 0, &erro);
  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Erro ao criar tabela: %s\n", erro);
    sqlite3_free(erro);
    return 0;
  }

  printf("Banco inicializado com sucesso!\n");
  return 1;
}

int registrar_aula(const char *turma, const char *professor, const char *conteudo)
{
  char sql[512];
  sprintf(sql, "INSERT INTO aulas (turma, professor, conteudo) VALUES ('%s','%s','%s');",
          turma, professor, conteudo);

  char *erro = NULL;
  int rc = sqlite3_exec(db, sql, 0, 0, &erro);
  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Erro ao inserir aula: %s\n", erro);
    sqlite3_free(erro);
    return 0;
  }
  return 1;
}

// Função callback simples para montar JSON manualmente
static int callback_listar(void *data, int argc, char **argv, char **colNome)
{
  char *resultado = (char *)data;
  strcat(resultado, "{");
  for (int i = 0; i < argc; i++)
  {
    char campo[256];
    sprintf(campo, "\"%s\":\"%s\"", colNome[i], argv[i] ? argv[i] : "");
    strcat(resultado, campo);
    if (i < argc - 1)
      strcat(resultado, ",");
  }
  strcat(resultado, "},");
  return 0;
}

int listar_aulas(char *resultado_json, int tamanho_max)
{
  resultado_json[0] = '[';
  resultado_json[1] = '\0';

  char *erro = NULL;
  const char *sql = "SELECT id, turma, professor, conteudo, data FROM aulas ORDER BY data DESC;";
  int rc = sqlite3_exec(db, sql, callback_listar, resultado_json, &erro);
  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Erro ao listar aulas: %s\n", erro);
    sqlite3_free(erro);
    return 0;
  }

  // Remove a última vírgula e fecha o array
  int len = strlen(resultado_json);
  if (len > 1 && resultado_json[len - 1] == ',')
  {
    resultado_json[len - 1] = ']';
    resultado_json[len] = '\0';
  }
  else
  {
    strcat(resultado_json, "]");
  }

  return 1;
}
