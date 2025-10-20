import customtkinter
from tkinter import ttk
import os
from PIL import Image
from vsPadrao import PaginaInicio
from vsAlunos import PaginaAlunos
from vsProfessores import PaginaProfessores
from vsConfigs import PaginaConfiguracoes
from vsMaterias import PaginaMaterias
from vsCursos import PaginaCursos

class UniPimApp(customtkinter.CTk):
    
    # Construtor da classe principal da aplicação
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        customtkinter.set_appearance_mode("dark")
        customtkinter.set_default_color_theme("blue")

        self.title("UniPim - Plataforma de registro acadêmico digital")

        # Maximiza a janela ao iniciar
        self.after(0, lambda: self.state('zoomed'))

        self.tema_atual = "dark"

        # Dicionário para mapear nome dos temas em português
        self.mapa_temas = {"Escuro": "dark", "Claro": "light", "Sistema": "system"}

        style = ttk.Style(self)
        style.theme_use("clam")

        #  Criação do Menu de abas
        self.ribbon_container = customtkinter.CTkFrame(self, corner_radius=0)
        self.ribbon_container.pack(side="top", fill="x")

        # Criação do container de conteúdo (Onde ficam as páginas)
        self.container_conteudo = customtkinter.CTkFrame(self, corner_radius=0)
        self.container_conteudo.pack(side="top", expand=True, fill="both")

        self.criar_interface_ribbon()

        #  Definindo as páginas
        self.frames = {}
        paginas = (PaginaInicio, PaginaAlunos, PaginaProfessores, PaginaConfiguracoes, PaginaMaterias, PaginaCursos)

        for F in paginas:
            frame = F(self.container_conteudo, self)
            self.frames[F] = frame
            frame.place(relwidth=1, relheight=1)

        #  Iniciando
        self.mostrar_pagina(PaginaInicio)
        self.atualizar_estilo_treeview() # Aplica o estilo inicial do Treeview

    # Função para mostrar a página desejada
    def mostrar_pagina(self, page_class):
        frame = self.frames[page_class]
        frame.tkraise()

    # Função para criar a interface estilo Ribbon
    def criar_interface_ribbon(self):
        self.tab_bar = customtkinter.CTkFrame(self.ribbon_container, corner_radius=0)
        self.tab_bar.pack(side="top", fill="x", padx=5, pady=(5, 0))

        self.ribbon_content_area = customtkinter.CTkFrame(self.ribbon_container, height=110)
        self.ribbon_content_area.pack(side="top", fill="x")
        self.ribbon_content_area.pack_propagate(False)

        self.ribbon_frames = {}

        #  Abas da Esquerda 
        abas_esquerda = ["Cadastros", "Consultas", "Relatórios"]
        for aba_nome in abas_esquerda:
            frame = customtkinter.CTkFrame(self.ribbon_content_area)
            self.ribbon_frames[aba_nome] = frame
            frame.place(relwidth=1, relheight=1)
            # Usando a nova função para criar os botões das abas
            self.criar_botao_aba(self.tab_bar, aba_nome, None, lambda f=frame, name=aba_nome: self.ativar_aba(f, name))

        # --- Widgets da Direita ---
        # Os widgets são criados na ordem inversa em que aparecerão (de direita para esquerda)

        # Botão Sair
        self.criar_botao_utilitario(self.tab_bar, "Sair", "img/Sair.png", self.quit, width=80, fg_color="#D2042D", hover_color="#A50021")
        # Botão Configurações
        self.criar_botao_utilitario(self.tab_bar, "Configurações", "img/Config.png", lambda: self.mostrar_pagina(PaginaConfiguracoes), width=140)

        self.adicionar_botoes_ribbon()
        self.tab_buttons = {w.cget("text"): w for w in self.tab_bar.winfo_children() 
                            if isinstance(w, customtkinter.CTkButton) and w.cget("text") in abas_esquerda}

        # Define a aba ativa inicial
        self.ativar_aba(self.ribbon_frames["Cadastros"], "Cadastros")

    # Função para ativar uma aba específica
    def ativar_aba(self, frame_para_ativar, nome_aba):
        self.aba_ativa = nome_aba
        frame_para_ativar.tkraise()
        self.atualizar_estilo_abas()

    # Função para atualizar o estilo visual das abas (ativa/inativa)
    def atualizar_estilo_abas(self):
        for nome, botao in self.tab_buttons.items():
            if nome == self.aba_ativa:
                # Estilo para a aba ativa (com contorno)
                botao.configure(border_width=2)
            else:
                # Estilo para abas inativas (sem contorno)
                botao.configure(border_width=0)

    # Função para adicionar botões às abas do ribbon
    def adicionar_botoes_ribbon(self):
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Alunos", "img/Aluno.png", lambda: self.mostrar_pagina(PaginaAlunos))
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Professores", "img/Professor.png", lambda: self.mostrar_pagina(PaginaProfessores))
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Cursos", "img/Curso.png", lambda: self.mostrar_pagina(PaginaCursos))
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Matérias", "img/Materias.png", lambda: self.mostrar_pagina(PaginaMaterias))

    # Função para criar um botão de aba na barra superior (esquerda)
    def criar_botao_aba(self, parent, texto, caminho_icone, comando):
        # Lógica para carregar ícone (similar às outras funções)
        # Por enquanto, sem ícone, mas a estrutura está pronta.
        ctk_image = None 

        botao = customtkinter.CTkButton(parent, 
                                        text=texto, 
                                        command=comando,
                                        image=ctk_image,
                                        fg_color="transparent",
                                        border_width=0,
                                        text_color=("gray10", "gray90")) # Garante a cor correta da fonte em ambos os temas
        botao.pack(side="left", padx=2)
        return botao

    # Função para criar um botão utilitário na barra superior (direita)
    def criar_botao_utilitario(self, parent, texto, caminho_icone, comando, **kwargs):
        ctk_image = None
        try:
            if caminho_icone:
                script_dir = os.path.dirname(os.path.abspath(__file__))
                caminho_completo = os.path.join(script_dir, caminho_icone)
                ctk_image = customtkinter.CTkImage(
                    light_image=Image.open(caminho_completo),
                    dark_image=Image.open(caminho_completo),
                    size=(20, 20)
                )
        except FileNotFoundError:
            print(f"Aviso: Ícone não encontrado em '{caminho_icone}'.")

        botao = customtkinter.CTkButton(
            parent,
            text=texto,
            command=comando,
            image=ctk_image,
            **kwargs)
        botao.pack(side="right", padx=2)

    # Função para criar um botão de ação no ribbon
    def criar_botao_acao(self, parent, texto, caminho_icone, comando, pack_side="left"):
        ctk_image = None
        try:
            if caminho_icone:
                script_dir = os.path.dirname(os.path.abspath(__file__))
                caminho_completo = os.path.join(script_dir, caminho_icone)
                ctk_image = customtkinter.CTkImage(
                    light_image=Image.open(caminho_completo),
                    dark_image=Image.open(caminho_completo),
                    size=(56, 56)
                )
        except FileNotFoundError:
            print(f"Aviso: Ícone não encontrado em '{caminho_icone}'. Criando botão sem imagem.")

        botao = customtkinter.CTkButton(
            parent, 
            text=texto, 
            command=comando, 
            image=ctk_image, 
            compound="top", 
            font=customtkinter.CTkFont(size=14),
            fg_color="transparent",
            text_color=("gray10", "gray90"))
        botao.pack(side=pack_side, padx=1, pady=0)
        return botao
    
    # Função para trocar o tema do combo
    def trocar_tema_combobox(self, tema_em_portugues: str):
        novo_tema = self.mapa_temas[tema_em_portugues]
        customtkinter.set_appearance_mode(novo_tema)
        
        # Se o tema for 'system', precisamos descobrir qual tema o sistema está usando de fato.
        if novo_tema == "system":
            # _get_appearance_mode() retorna 'dark' ou 'light'
            self.tema_atual = customtkinter.get_appearance_mode().lower()
        else:
            self.tema_atual = novo_tema

        self.atualizar_estilo_treeview()

    # Função para atualizar o estilo do Treeview em todas as páginas de acordo com o tema atual
    def atualizar_estilo_treeview(self):
        if self.tema_atual.lower() == "dark":
            bg_color = "#2a2d2e"
            text_color = "white"
            field_bg_color = "#343638"
            header_bg = "#565b5e"
            selected_color = "#22559b"
            header_border_color = "#343638"
        else: # Tema claro
            bg_color = "#ebebeb"
            text_color = "black"
            field_bg_color = "#f2f2f2"
            header_bg = "#d6d6d6"
            selected_color = "#3a7ebf"
            header_border_color = "#c2c2c2"

        style = ttk.Style()
        style.configure("Treeview", background=bg_color, foreground=text_color, fieldbackground=field_bg_color, borderwidth=0)
        style.map('Treeview', background=[('selected', selected_color)])
        style.configure("Treeview.Heading", background=header_bg, foreground=text_color, relief="flat", borderwidth=1, bordercolor=header_border_color)
        style.map("Treeview.Heading", background=[('active', '#3484F0')])


if __name__ == "__main__":
    app = UniPimApp()
    app.mainloop()