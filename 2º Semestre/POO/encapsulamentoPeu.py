matriz = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
count = 0
for i in range(3):
    for j in range(4):
        count+= 1
        matriz[i][j] = count
    print(matriz[i])

class pessoa:
  def __init__(self, nome, idade, cpf, dtNascimento):
        self.__nome = nome
        self.__idade = idade
        self.__cpf = cpf
        self.__dtNascimento = dtNascimento
  def get_nome(self):
        return self.__nome
  def get_idade(self):
        return self.__idade
  def get_cpf(self):
        return self.__cpf
  def get_dtNascimento(self):
        return self.__dtNascimento
  def set_nome(self, new_nome):
        self.__nome = new_nome
  def set_idade(self, new_idade):
        self.__idade = new_idade
  def set_cpf(self, new_cpf):
    self.__cpf = new_cpf
  def set_dtNascimento(self, new_dtNascimento):
    self.__dtNascimento = new_dtNascimento
  def cadastrarPessoa(self):
    return "Criando cadastro"
  
class profissional(pessoa):
  def __init__(self, nome, idade, cpf, dtNascimento, cargaHoraria, plantao):
      super().__init__(nome, idade, cpf, dtNascimento)
      self.__cargaHoraria = cargaHoraria
      self.__plantao = plantao

  def get_cargaHoraria(self):
    return self.__cargaHoraria
  
  def get_plantao(self):
    return self.__plantao
def set_cargaHoraria(self, new_cargaHoraria):
        self.__cargaHoraria = new_cargaHoraria
def set_plantao(self, new_plantao):
        self.__plantao = new_plantao
class medico(profissional):
def __init__(self, nome, idade, cpf, dtNascimento, cargaHoraria, plantao, crm, especialidade):
super().__init__(nome, idade, cpf, dtNascimento, cargaHoraria, plantao)
        self.__crm = crm
        self.__especialidade = especialidade
def get_crm(self):
        return self.__crm
def get_especialidade(self):
        return self.__especialidade
def set_crm(self, new_crm):
        self.__crm = new_crm
def set_especialidade(self, new_especialidade):
        self.__especialidade = new_especialidade
class enfermeira(profissional):
def __init__(self, nome, idade, cpf, dtNascimento, cargaHoraria, plantao, tipo, nivel):
super().__init__(nome, idade, cpf, dtNascimento, cargaHoraria, plantao)
        self.__tipo = tipo
        self.__nivel = nivel
def get_tipo(self):
        return self.__tipo
def get_nivel(self):
        return self.__nivel
def set_tipo(self, new_tipo):
        self.__tipo = new_tipo
def set_nivel(self, new_nivel):
        self.__nivel = new_nivel
class paciente(pessoa):
def __init__(self, nome, idade, cpf, dtNascimento, endereco, contato, ocorrencia):
super().__init__(nome, idade, cpf, dtNascimento)
        self.__endereco = endereco
        self.__contato = contato
        self.__ocorrencia = ocorrencia
def get_endereco(self):
        return self.__endereco
def get_contato(self):
        return self.__contato
def get_ocorrencia(self):
        return self.__ocorrencia
def set_endereco(self, new_endereco):
        self.__endereco = new_endereco
def set_contato(self, new_contato):
        self.__contato = new_contato
def set_ocorrencia(self, new_ocorrencia):
        self.__ocorrencia = new_ocorrencia
class triagem(paciente):
def __init__(self, nome, idade, cpf, dtNascimento, endereco, bpm, temp, pressao, altura, peso, possuiAlergia):
super().__init__(nome, idade, cpf, dtNascimento, endereco)
        self.__bpm = bpm
        self.__temp = temp
        self.__pressao = pressao
        self.__altura = altura
        self.__peso = peso
        self.__possuiAlergia = possuiAlergia
def get_bpm(self):
            return self.__bpm
def get_temp(self):
        return self.__temp
def get_pressao(self):
        return self.__pressao
def get_altura(self):
        return self.__altura
def get_peso(self):
        return self.__peso
def get_possuiAlergia(self):
        return self.__possuiAlergia
def set_bpm(self, new_bpm):
        self.__bpm = new_bpm
def set_temp(self, new_temp):
        self.__temp = new_temp
def set_pressao(self, new_pressao):
        self.__pressao = new_pressao
def set_altura(self, new_altura):
        self.__altura = new_altura
def set_peso(self, new_peso):
        self.__peso = new_peso
def set_possuiAlergia(self, new_possuiAlergia):
        self.__possuiAlergia = new_possuiAlergia