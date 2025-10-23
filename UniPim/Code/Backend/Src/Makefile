# Nome do compilador
CC = gcc

# Flags de compilação
# -Iinclude: Procura headers na pasta include
# -Wall -Wextra: Ativa avisos extras de compilação (boa prática)
# -g: Adiciona informações de debug
CFLAGS = -Iinclude -Wall -Wextra -g

# Bibliotecas a serem linkadas
LDFLAGS = -lws2_32

# Pastas
SRCDIR = src
BUILDDIR = build

# Arquivos-fonte
SRCS = $(SRCDIR)/servidor.c $(SRCDIR)/banco.c $(SRCDIR)/cJSON.c $(SRCDIR)/sqlite3.c

# Nome do executável
TARGET = $(BUILDDIR)/servidor.exe

# Regra principal: o que fazer quando você digita 'make'
all: $(TARGET)

# Regra para criar o executável
$(TARGET): $(SRCS)
	@mkdir -p $(BUILDDIR) # Cria a pasta build se não existir
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

# Regra para limpar os arquivos compilados
clean:
	rm -f $(BUILDDIR)/*

.PHONY: all clean
