import tkinter as tk
from tkinter import ttk

class PaginaAlunos(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        self.label = tk.Label(self, text="Gerenciamento de Alunos", font=("Arial", 18))
        self.label.pack(pady=10, padx=10)

        # Exemplo: Adicionar uma tabela (TreeView) para listar alunos
        colunas = ('id', 'nome', 'curso')
        self.tree = ttk.Treeview(self, columns=colunas, show='headings')
        
        self.tree.heading('id', text='ID')
        self.tree.heading('nome', text='Nome')
        self.tree.heading('curso', text='Curso')

        # Adicionando dados de exemplo
        alunos_exemplo = [
            (1, 'João da Silva', 'Engenharia de Software'),
            (2, 'Maria Oliveira', 'Ciência da Computação'),
            (3, 'Pedro Martins', 'Análise e Des. de Sistemas')
        ]
        for aluno in alunos_exemplo:
            self.tree.insert('', tk.END, values=aluno)

        self.tree.pack(expand=True, fill='both', padx=10, pady=10)

    def atualizar_tema(self, tema):
        """Aplica o tema aos widgets desta página."""
        self.config(bg=tema["conteudo_bg"])
        self.label.config(bg=tema["label_bg"], fg=tema["texto_fg"])
        
        # Estilizando o Treeview (requer um pouco mais de trabalho com ttk.Style)
        style = ttk.Style()
        style.theme_use("default")
        style.configure("Treeview", 
            background=tema["conteudo_bg"],
            foreground=tema["texto_fg"],
            fieldbackground=tema["conteudo_bg"],
            rowheight=25)
        style.map('Treeview', background=[('selected', tema["btn_bg"])])
        style.configure("Treeview.Heading", 
            background=tema["btn_bg"], 
            foreground=tema["btn_fg"],
            relief=tema["btn_relief"])
