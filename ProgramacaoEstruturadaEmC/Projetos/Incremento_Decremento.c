#include <stdio.h>
#include <locale.h>

int main()
{
  setlocale(LC_ALL, "Portuguese");
  int i = 5;
  printf("Valor de i: %d\n", i);
  printf("P�s-incremento: %d\n", i++);
  printf("Valor de i ap�s p�s-incremento: %d\n", i);
  printf("Pr�-decremento: %d\n", --i);

  return 0;
}