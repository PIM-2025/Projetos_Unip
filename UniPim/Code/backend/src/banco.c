#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "cJSON.h"   // Incluir para manipulação de JSON
#include "sqlite3.h" // Incluir a biblioteca do SQLite
#include "banco.h"   // Incluir nosso próprio cabeçalho

#define DB_FILE "data/unipim.db" // Caminho correto para o arquivo do banco

int inicializar_banco(sqlite3 **db)
{
  char *erro = NULL;
  int rc = sqlite3_open(DB_FILE, db);
  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Nao foi possivel abrir o banco de dados: %s\n", sqlite3_errmsg(*db));
    sqlite3_close(*db);
    return 1; // Retornar 1 para erro, 0 para sucesso
  }

  const char *sql =
      "CREATE TABLE IF NOT EXISTS aulas ("
      "id INTEGER PRIMARY KEY AUTOINCREMENT,"
      "turma TEXT NOT NULL,"
      "professor TEXT NOT NULL,"
      "conteudo TEXT NOT NULL,"
      "timestamp DATETIME DEFAULT CURRENT_TIMESTAMP"
      ");";

  rc = sqlite3_exec(*db, sql, 0, 0, &erro);
  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Erro no SQL ao criar tabela: %s\n", erro);
    sqlite3_free(erro);
    sqlite3_close(*db);
    return 1;
  }

  printf("Banco de dados inicializado com sucesso.\n");
  return 0; // Sucesso
}

void fechar_banco(sqlite3 *db)
{
  if (db)
  {
    sqlite3_close(db);
  }
}

// VERSÃO SEGURA contra SQL Injection
int registrar_aula(sqlite3 *db, const char *turma, const char *professor, const char *conteudo)
{
  sqlite3_stmt *stmt;
  const char *sql = "INSERT INTO aulas (turma, professor, conteudo) VALUES (?, ?, ?);";
  int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, 0);

  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Falha ao preparar o statement: %s\n", sqlite3_errmsg(db));
    return 1;
  }

  // Binds para evitar SQL Injection
  sqlite3_bind_text(stmt, 1, turma, -1, SQLITE_TRANSIENT);
  sqlite3_bind_text(stmt, 2, professor, -1, SQLITE_TRANSIENT);
  sqlite3_bind_text(stmt, 3, conteudo, -1, SQLITE_TRANSIENT);

  rc = sqlite3_step(stmt);
  if (rc != SQLITE_DONE)
  {
    fprintf(stderr, "Falha ao executar o statement: %s\n", sqlite3_errmsg(db));
    sqlite3_finalize(stmt);
    return 1;
  }

  printf("Registro inserido no banco de dados com sucesso.\n");
  sqlite3_finalize(stmt);
  return 0;
}

// VERSÃO ROBUSTA usando cJSON
int listar_aulas(sqlite3 *db, cJSON *array_aulas)
{
  sqlite3_stmt *stmt;
  const char *sql = "SELECT id, turma, professor, conteudo, timestamp FROM aulas ORDER BY timestamp DESC;";
  int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, 0);

  if (rc != SQLITE_OK)
  {
    fprintf(stderr, "Erro ao preparar listagem de aulas: %s\n", sqlite3_errmsg(db));
    return 1;
  }

  // Itera sobre os resultados da consulta
  while ((rc = sqlite3_step(stmt)) == SQLITE_ROW)
  {
    cJSON *aula_json = cJSON_CreateObject();
    cJSON_AddNumberToObject(aula_json, "id", sqlite3_column_int(stmt, 0));
    cJSON_AddStringToObject(aula_json, "turma", (const char *)sqlite3_column_text(stmt, 1));
    cJSON_AddStringToObject(aula_json, "professor", (const char *)sqlite3_column_text(stmt, 2));
    cJSON_AddStringToObject(aula_json, "conteudo", (const char *)sqlite3_column_text(stmt, 3));
    cJSON_AddStringToObject(aula_json, "timestamp", (const char *)sqlite3_column_text(stmt, 4));
    cJSON_AddItemToArray(array_aulas, aula_json);
  }

  if (rc != SQLITE_DONE)
  {
    fprintf(stderr, "Erro ao iterar sobre as aulas: %s\n", sqlite3_errmsg(db));
  }

  sqlite3_finalize(stmt);
  return 0;
}
