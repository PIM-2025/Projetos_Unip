from cachorro import Cachorro

cachorro1 = Cachorro("Cleiton", 5, "Verde", "Labrador")
cachorro1.rolar()
cachorro1.latir()
cachorro1.apresentar()

print("-------------------------------")

# Criando um cachorro a partir de dados inseridos pelo usuário
cachorro2 = Cachorro("", 0, "", "")
cachorro2.nome = input("Escreva o nome do seu cachorro: ")
cachorro2.idade = input("Escreva a idade do seu cachorro: ")
cachorro2.cor = input("Escreva a cor do seu cachorro: ")
cachorro2.raca = input("Escreva a raça do seu cachorro: ")

cachorro2.apresentar()
cachorro2.rolar()
cachorro2.latir()

cachorro3 = Cachorro("Roberto", 10, "Azul", "Poodle")
