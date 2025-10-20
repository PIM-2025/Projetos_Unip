import customtkinter
import tkinter as tk
from tkinter import ttk
from PIL import Image
import os

class PaginaMaterias(customtkinter.CTkFrame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        def adicionar_item():
            print("Botão Adicionar Matéria Clicado")

        def editar_item():
            print("Botão Editar Matéria Clicado")

        def excluir_item():
            print("Botão Excluir Matéria Clicado")

        def atualizar_grid():
            print("Botão Atualizar Grid de Matérias Clicado")

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

        colunas = ('id', 'nome', 'curso', 'carga_horaria')
        self.tree = ttk.Treeview(self, columns=colunas, show='headings')
        
        self.tree.heading('id', text='ID', anchor='w')
        self.tree.heading('nome', text='Nome da Matéria', anchor='w')
        self.tree.heading('curso', text='Curso Associado', anchor='w')
        self.tree.heading('carga_horaria', text='Carga Horária', anchor='w')

        # Adicionando dados de exemplo
        materias_exemplo = [
            (1, 'Banco de Dados', 'Análise e Des. de Sistemas', '80h'),
            (2, 'Engenharia de Software I', 'Análise e Des. de Sistemas', '80h'),
            (3, 'Linguagem de Programação', 'Ciência da Computação', '120h')
        ]
        for materia in materias_exemplo:
            self.tree.insert('', tk.END, values=materia)

        self.tree.pack(expand=True, fill='both', padx=10, pady=10)