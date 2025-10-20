import customtkinter
import tkinter as tk
from tkinter import ttk
from PIL import Image
import os

class PaginaCursos(customtkinter.CTkFrame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        def adicionar_item():
            print("Botão Adicionar Curso Clicado")

        def editar_item():
            print("Botão Editar Curso Clicado")

        def excluir_item():
            print("Botão Excluir Curso Clicado")

        def atualizar_grid():
            print("Botão Atualizar Grid de Cursos Clicado")

        def carregar_imagem(caminho):
            script_dir = os.path.dirname(os.path.abspath(__file__))
            # Sobe um nível para o diretório 'frontend' e depois entra em 'Assets'
            caminho_completo = os.path.join(script_dir, "..", caminho)
            return customtkinter.CTkImage(Image.open(caminho_completo), size=(24, 24))

        self.frame_botoes = customtkinter.CTkFrame(self, fg_color="transparent")
        self.frame_botoes.pack(fill='x', padx=10, pady=(10, 0))

        # Carregar ícones
        self.add_icon = carregar_imagem("Assets/Novo.png")
        self.edit_icon = carregar_imagem("Assets/Editar.png")
        self.delete_icon = carregar_imagem("Assets/Excluir.png")
        self.refresh_icon = carregar_imagem("Assets/Atualizar.png")
        
        # Botões
        self.botao_adicionar = customtkinter.CTkButton(self.frame_botoes, text="", image=self.add_icon, width=32, fg_color="transparent", command=adicionar_item)
        self.botao_adicionar.pack(side='left', padx=(0, 5))

        self.botao_editar = customtkinter.CTkButton(self.frame_botoes, text="", image=self.edit_icon, width=32, fg_color="transparent", command=editar_item)
        self.botao_editar.pack(side='left', padx=5)

        self.botao_excluir = customtkinter.CTkButton(self.frame_botoes, text="", image=self.delete_icon, width=32, fg_color="transparent", command=excluir_item)
        self.botao_excluir.pack(side='left', padx=5)

        self.botao_atualizar = customtkinter.CTkButton(self.frame_botoes, text="", image=self.refresh_icon, width=32, fg_color="transparent", command=atualizar_grid)
        self.botao_atualizar.pack(side='left', padx=5)

        colunas = ('id', 'nome', 'coordenador', 'duracao')
        self.tree = ttk.Treeview(self, columns=colunas, show='headings')
        
        self.tree.heading('id', text='ID', anchor='w')
        self.tree.heading('nome', text='Nome do Curso', anchor='w')
        self.tree.heading('coordenador', text='Coordenador', anchor='w')
        self.tree.heading('duracao', text='Duração (Semestres)', anchor='w')

        # Adicionando dados de exemplo
        cursos_exemplo = [
            (1, 'Análise e Desenvolvimento de Sistemas', 'Junior Silveira', '5'),
            (2, 'Ciência da Computação', 'Eduardo Oliveira', '8'),
            (3, 'Engenharia de Software', 'Cláudia Ferreira', '8')
        ]
        for curso in cursos_exemplo:
            self.tree.insert('', tk.END, values=curso)

        self.tree.pack(expand=True, fill='both', padx=10, pady=10)