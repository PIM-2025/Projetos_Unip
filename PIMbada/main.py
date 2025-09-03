import tkinter as tk

# Janela principal
janela = tk.Tk()
janela.title("PIMthon")
janela.geometry("600x400")

# Frame do menu lateral
menu_lateral = tk.Frame(janela, bg="#2c3e50", width=150)
menu_lateral.pack(side="left", fill="y")

# Frame do conteúdo
conteudo = tk.Frame(janela, bg="")
conteudo.pack(side="right", expand=True, fill="both")

# Evento show page
def mostrar_pagina(nome):
    conteudo_label.config(text=f"Página: {nome}")

conteudo_label = tk.Label(conteudo, text="Bem-vindo!", font=("Arial", 16), bg="white")
conteudo_label.pack(pady=50)

# Botões do menu lateral
botoes = [
    ("Início", lambda: mostrar_pagina("Início")),
    ("Alunos", lambda: mostrar_pagina("Alunos")),
    ("Professores", lambda: mostrar_pagina("Professores")),
    ("Notas", lambda: mostrar_pagina("Notas")),
    ("Configurações", lambda: mostrar_pagina("Configurações")),
    ("Trocar Tema", lambda: mostrar_pagina("TrocarTema"))
]

for texto, comando in botoes:
    btn = tk.Button(menu_lateral, text=texto, command=comando,
                    bg="#34495e", fg="white", relief="flat", anchor="w")
    btn.pack(fill="x", pady=2, padx=5)

janela.mainloop()
