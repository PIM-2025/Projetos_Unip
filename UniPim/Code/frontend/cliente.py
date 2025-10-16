import socket
import json

HOST = '127.0.0.1'
PORT = 5050

mensagem = {"acao": "registrar_aula", "turma": "Turma A", "professor": "Prof. João", "conteudo": "Matemática"}

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(json.dumps(mensagem).encode('utf-8'))
    resposta = s.recv(4096)
    print(resposta.decode('utf-8'))
