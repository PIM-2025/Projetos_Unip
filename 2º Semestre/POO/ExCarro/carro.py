class Carro:
    def __init__(self, marca, modelo, ano, cor, velocidade_maxima, velocidade_atual=0):
      self.marca = marca
      self.modelo = modelo
      self.ano = ano
      self.cor = cor
      self.velocidade_maxima = velocidade_maxima
      self.velocidade_atual = velocidade_atual
    
    def acelerar(self, velocidade):
      self.velocidade_atual += velocidade

    def frear(self, velocidade):
      self.velocidade_atual -= velocidade