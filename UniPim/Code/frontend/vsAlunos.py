import customtkinter
import tkinter as tk
from tkinter import ttk
from PIL import Image
import os

class PaginaAlunos(customtkinter.CTkFrame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        def adicionar_item():
            print("Botão Adicionar Clicado")

        def editar_item():
            print("Botão Editar Clicado")

        def excluir_item():
            print("Botão Excluir Clicado")

        def atualizar_grid():
            print("Botão Atualizar Clicado")

        def carregar_imagem(caminho):
            script_dir = os.path.dirname(os.path.abspath(__file__))
            caminho_completo = os.path.join(script_dir, caminho)
            return customtkinter.CTkImage(Image.open(caminho_completo), size=(24, 24))

        self.frame_botoes = customtkinter.CTkFrame(self, fg_color="transparent")
        self.frame_botoes.pack(fill='x', padx=10, pady=(10, 0))

        # Carregar ícones
        self.add_icon = carregar_imagem("img/Novo.png")
        self.edit_icon = carregar_imagem("img/Editar.png")
        self.delete_icon = carregar_imagem("img/Excluir.png")
        self.refresh_icon = carregar_imagem("img/Atualizar.png")
        
        self.style = ttk.Style()
        self.style.theme_use("default")

        # Configuração de estilo para o Treeview
        self.style.configure("Treeview",
                             background="#2a2d2e",
                             foreground="white",
                             rowheight=25,
                             fieldbackground="#343638",
                             bordercolor="#343638",
                             borderwidth=0)
        self.style.map('Treeview', background=[('selected', '#22559b')])

        self.style.configure("Treeview.Heading",
                             background="#565b5e",
                             foreground="white",
                             relief="flat")
        self.style.map("Treeview.Heading",
                       background=[('active', '#3484F0')])

        # Botões
        self.botao_adicionar = customtkinter.CTkButton(self.frame_botoes, text="", image=self.add_icon, width=32, fg_color="transparent", command=adicionar_item)
        self.botao_adicionar.pack(side='left', padx=(0, 5))

        self.botao_editar = customtkinter.CTkButton(self.frame_botoes, text="", image=self.edit_icon, width=32, fg_color="transparent", command=editar_item)
        self.botao_editar.pack(side='left', padx=5)

        self.botao_excluir = customtkinter.CTkButton(self.frame_botoes, text="", image=self.delete_icon, width=32, fg_color="transparent", command=excluir_item)
        self.botao_excluir.pack(side='left', padx=5)

        self.botao_atualizar = customtkinter.CTkButton(self.frame_botoes, text="", image=self.refresh_icon, width=32, fg_color="transparent", command=atualizar_grid)
        self.botao_atualizar.pack(side='left', padx=5)


        # Treeview (Grid)
        colunas = ('id', 'nome', 'curso')
        self.tree = ttk.Treeview(self, columns=colunas, show='headings')
        
        self.tree.heading('id', text='ID')
        self.tree.heading('nome', text='Nome')
        self.tree.heading('curso', text='Curso')

        # Dados de exemplo
        alunos_exemplo = [
            (1, 'João da Silva', 'Engenharia de Software'),
            (2, 'Maria Oliveira', 'Ciência da Computação'),
            (3, 'Pedro Martins', 'Análise e Des. de Sistemas')
        ]
        for aluno in alunos_exemplo:
            self.tree.insert('', tk.END, values=aluno)

        self.tree.pack(expand=True, fill='both', padx=10, pady=10)
