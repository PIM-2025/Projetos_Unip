# Makefile
CC=gcc
CFLAGS=-Wall
LIBS=-lsqlite3 -ljson-c
OBJ=banco.o servidor.o

all: servidor

servidor: $(OBJ)
	$(CC) $(OBJ) -o servidor $(LIBS)

banco.o: banco.c banco.h
	$(CC) $(CFLAGS) -c banco.c

servidor.o: servidor.c banco.h
	$(CC) $(CFLAGS) -c servidor.c

clean:
	rm -f *.o servidor banco.db
