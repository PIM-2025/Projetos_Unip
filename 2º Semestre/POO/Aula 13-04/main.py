class Pessoa:
    def __init__(self, nome, idade):
        self.__nome = nome
        self.__idade = idade
    
    def get_nome(self):
        return self.__nome
    def get_idade(self):
        return self.__idade
    def set_nome(self, nome):
        self.__nome = nome
    def set_idade(self, idade):
        self.__idade = idade

pessoa1 = Pessoa("Ramon", 20)
pessoa2 = Pessoa("Gabriel", 21)
pessoa3 = Pessoa("Peu", 19)
pessoa4 = Pessoa("Jean", 21)

print(pessoa1.get_nome())
print(pessoa1.get_idade())
print(pessoa2.get_nome())
print(pessoa2.get_idade())
print(pessoa3.get_nome())
print(pessoa3.get_idade())
print(pessoa4.get_nome())
print(pessoa4.get_idade())

list = [pessoa1, pessoa2, pessoa3, pessoa4]
contador = 1

for i in list:
    i.set_nome(input(f"Digite o nome da pessoa {contador}: "))
    i.set_idade(input(f"Digite a idade da pessoa {contador}: "))
    contador += 1
    print(f"Nome: {i.get_nome()}, Idade: {i.get_idade()}")

## Formato com atributos públicos
##pessoa1 = Pessoa("Ramon", 20)
##pessoa2 = Pessoa("Gabriel", 21)
##pessoa3 = Pessoa("Peu", 19)
##pessoa4 = Pessoa("Jean", 21)

##print(pessoa1.nome)
##print(pessoa1.idade)
##print(pessoa2.nome)
##print(pessoa2.idade)
##print(pessoa3.nome)
##print(pessoa3.idade)
##print(pessoa4.nome)
##print(pessoa4.idade)