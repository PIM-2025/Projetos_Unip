#ifndef BANCO_H
#define BANCO_H

#include "sqlite3.h"

extern sqlite3 *db;

int inicializar_banco();
int registrar_aula(const char *turma, const char *professor, const char *conteudo);
int listar_aulas(char *resultado_json, int tamanho_max);

#endif
