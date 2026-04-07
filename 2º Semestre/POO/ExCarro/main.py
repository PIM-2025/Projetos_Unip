from carro import Carro

carro1 = Carro("Ford", "Mustang", 2020, "Vermelho", 250)
print(f"Marca: {carro1.marca}")
print(f"Modelo: {carro1.modelo}")
print(f"Ano: {carro1.ano}")
print(f"Cor: {carro1.cor}")
print(f"Velocidade Máxima: {carro1.velocidade_maxima} km/h")
print(f"Velocidade Atual: {carro1.velocidade_atual} km/h")

carro1.acelerar(50)
print(f"Acelerando 50 km/h")
print(f"Velocidade Atual: {carro1.velocidade_atual} km/h")

carro1.frear(20)
print(f"Freando 20 km/h")
print(f"Velocidade Atual: {carro1.velocidade_atual} km/h")