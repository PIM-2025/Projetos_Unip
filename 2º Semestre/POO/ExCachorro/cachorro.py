class Cachorro:
  def __init__(self, nome, idade, cor, raca):
    self.nome = nome
    self.idade = idade
    self.cor = cor
    self.raca = raca
  
  def rolar(self):
    print(f"{self.nome} está rolando!")

  def latir(self):
    print(f"{self.nome} está latindo!")
  
  def apresentar(self):
    print(f"Olá, meu nome é {self.nome}, tenho {self.idade} anos, sou da cor {self.cor} e sou da raça {self.raca}.")