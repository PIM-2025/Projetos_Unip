#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "cJSON.h"   // Incluir para manipulação de JSON
#include "sqlite3.h" // Incluir a biblioteca do SQLite
#include "banco.h"   // Incluir nosso próprio cabeçalho

#define DB_FILE "C:\\Users\\Usuario\\OneDrive\\Documentos\\1_teste_massari\\aula\\Include\\unipim.db" // Caminho correto para o arquivo do banco

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
return 0;
}

void fechar_banco(sqlite3 *db)
{
  sqlite3_close(db);
}
//=================================CRUD USUARIO=================================//
//---------------Criar USUARIO------------
int inserir_usuario(sqlite3 *db, const char *nome, const char *email, const char *senha, const char *tipo, const char *dtcadastro, int status){
    const char *sql = "INSERT INTO USUARIO (NOME, EMAIL, SENHA, TIPOUSUARIO, DTCADASTRO, STATUS) VALUES (?, ?, ?, ?, ?, ?);";
    sqlite3_stmt *stmt;
    
int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "Erro ao preparar INSERT: %s\n", sqlite3_errmsg(db));
        return 1;
    }
  
  sqlite3_bind_text(stmt, 1, nome, -1, SQLITE_TRANSIENT);
  sqlite3_bind_text(stmt, 2, email, -1, SQLITE_TRANSIENT);
  sqlite3_bind_text(stmt, 3, senha, -1, SQLITE_TRANSIENT);
  sqlite3_bind_text(stmt, 4, tipo, -1, SQLITE_TRANSIENT);
  sqlite3_bind_text(stmt, 5, dtcadastro, -1, SQLITE_TRANSIENT);
  sqlite3_bind_int(stmt, 6, status);

  rc = sqlite3_step(stmt);
  sqlite3_finalize(stmt);

  return rc == SQLITE_DONE ? 0 : 1;

  }
//---------------Listar USUARIO------------
int listar_usuario(sqlite3 *db) {
    const char *sql = "SELECT IDUSUARIO, NOME, EMAIL, TIPOUSUARIO, DTCADASTRO, STATUS FROM USUARIO;";
    
    sqlite3_stmt *stmt;
    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "Erro ao preparar SELECT: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    
    printf("Lista de usuários:\n");
    while ((rc = sqlite3_step(stmt)) == SQLITE_ROW) {
        printf("ID: %d | Nome: %s | Email: %s | Tipo: %s | Cadastro: %s | Status: %d\n",
               sqlite3_column_int(stmt, 0),
               sqlite3_column_text(stmt, 1),
               sqlite3_column_text(stmt, 2),
               sqlite3_column_text(stmt, 3),
               sqlite3_column_text(stmt, 4),
               sqlite3_column_int(stmt, 5));
    }
    sqlite3_finalize(stmt);
    return 0;
}
//---------------Atualizar USUARIO------------
  int atualizar_usuario(sqlite3 *db, int id, const char *novo_nome, const char *novo_email, const char *nova_senha, int novo_status) {
    const char *sql = "UPDATE USUARIO SET NOME = ?, EMAIL = ?, SENHA = ?, STATUS = ? WHERE IDUSUARIO = ?;";
    sqlite3_stmt *stmt;
    
    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "Erro ao preparar UPDATE: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    
    sqlite3_bind_text(stmt, 1, novo_nome, -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 2, novo_email, -1, SQLITE_TRANSIENT);
    sqlite3_bind_text(stmt, 3, nova_senha, -1, SQLITE_TRANSIENT);
    sqlite3_bind_int(stmt, 4, novo_status);
    sqlite3_bind_int(stmt, 5, id);
    
    rc = sqlite3_step(stmt);
    sqlite3_finalize(stmt);
    
    return rc == SQLITE_DONE ? 0 : 1;
  }
//---------------Deletar USUARIO------------
   int deletar_usuario(sqlite3 *db, int id){
    const char * sql = "DELETE FROM USUARIO WHERE IDUSUARIO = ?;";
    sqlite3_stmt *stmt;
    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK){
        fprintf(stderr, "Erro ao preparar DELETE: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    
    sqlite3_bind_int(stmt, 1, id);

    rc = sqlite3_step(stmt);
    sqlite3_finalize(stmt);
    return rc == SQLITE_DONE ? 0 : 1;

   }
   //---------------------CRUD USUARIO----------------------------//

   //=====================================================================//
   
   //----------------------CRUD CURSO----------------------------//


   //---------------Criar CURSO------------

   int inserir_curso(sqlite3 *db, const char *nome, const char *descricao, const char *turno, int anoletivo ){
    const char *sql = "INSERT INTO CURSO (NOME, DESCRICAO, TURNO, ANOLETIVO) VALUES (?, ?, ?, ?);";
    sqlite3_stmt *stmt;

    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "Erro ao preparar INSERT: %s\n", sqlite3_errmsg(db));
        return 1;
      }

      sqlite3_bind_text(stmt, 1, nome, -1, SQLITE_TRANSIENT);
      sqlite3_bind_text(stmt, 2, descricao, -1, SQLITE_TRANSIENT);
      sqlite3_bind_text(stmt, 3, turno, -1, SQLITE_TRANSIENT);
      sqlite3_bind_int(stmt, 4, anoletivo);

      rc = sqlite3_step(stmt);
      sqlite3_finalize(stmt);

      return rc == SQLITE_DONE ? 0 : 1;
   }

   //---------------Listar CURSO------------
    int listar_curso(sqlite3 *db) {
      const char *sql = "SELECT IDCURSO, NOME, DESCRICAO, TURNO, ANOLETIVO FROM CURSO;";
      
      sqlite3_stmt *stmt;
      int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
      if (rc != SQLITE_OK) {
          fprintf(stderr, "Erro ao preparar SELECT: %s\n", sqlite3_errmsg(db));
          return 1;
      }
      
      printf("Lista de cursos:\n");
      while ((rc = sqlite3_step(stmt)) == SQLITE_ROW) {
          printf("ID: %d | Nome: %s | Descricao: %s | Turno: %s | Ano Letivo: %d\n",
                sqlite3_column_int(stmt, 0),
                sqlite3_column_text(stmt, 1),
                sqlite3_column_text(stmt, 2),
                sqlite3_column_text(stmt, 3),
                sqlite3_column_int(stmt, 4));
      }
      sqlite3_finalize(stmt);
      return 0;
    }
    //---------------Atualizar CURSO------------

    int atualizar_curso(sqlite3 *db, const char *novo_nome_curso, const char *nova_descricao, const char *novo_turno, int novo_anoletivo, int id_curso){
      const char *sql = "UPDATE CURSO SET NOME = ?, DESCRICAO = ?, TURNO = ?, ANOLETIVO = ? WHERE IDCURSO = ?;";
      sqlite3_stmt *stmt;
      
      int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
      if (rc != SQLITE_OK) {
          fprintf(stderr, "Erro ao preparar UPDATE: %s\n", sqlite3_errmsg(db));
          return 1;
      }
      
      sqlite3_bind_text(stmt, 1, novo_nome_curso, -1, SQLITE_TRANSIENT);
      sqlite3_bind_text(stmt, 2, nova_descricao, -1, SQLITE_TRANSIENT);
      sqlite3_bind_text(stmt, 3, novo_turno, -1, SQLITE_TRANSIENT);
      sqlite3_bind_int(stmt, 4, novo_anoletivo);
      sqlite3_bind_int(stmt, 5, id_curso);

      rc = sqlite3_step(stmt);
      sqlite3_finalize(stmt);
      return rc == SQLITE_DONE ? 0 : 1;
}

  //-------------Deletar Curso------------

  int deletar_curso(sqlite3 *db, int id_curso){
    const char * sql = "DELETE FROM CURSO WHERE IDCURSO = ?;";
    sqlite3_stmt *stmt;
    int rc = sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    if (rc != SQLITE_OK){
        fprintf(stderr, "Erro ao preparar DELETE: %s\n", sqlite3_errmsg(db));
        return 1;
    }
    
    sqlite3_bind_int(stmt, 1, id_curso);

    rc = sqlite3_step(stmt);
    sqlite3_finalize(stmt);
    return rc == SQLITE_DONE ? 0 : 1;

   }
    
  //---------------------CRUD CURSO----------------------------//