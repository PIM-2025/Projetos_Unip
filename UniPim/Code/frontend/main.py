import customtkinter
from tkinter import ttk
import os
from PIL import Image
from vsPadrao import PaginaInicio
from vsAlunos import PaginaAlunos
from vsProfessores import PaginaProfessores
from vsConfigs import PaginaConfiguracoes

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

        #  Criação do Menu de abas
        self.ribbon_container = customtkinter.CTkFrame(self, corner_radius=0)
        self.ribbon_container.pack(side="top", fill="x")

        # Criação do container de conteúdo (Onde ficam as páginas)
        self.container_conteudo = customtkinter.CTkFrame(self, corner_radius=0)
        self.container_conteudo.pack(side="top", expand=True, fill="both")

        self.criar_interface_ribbon()

        #  Definindo as páginas
        self.frames = {}
        paginas = (PaginaInicio, PaginaAlunos, PaginaProfessores, PaginaConfiguracoes)

        for F in paginas:
            frame = F(self.container_conteudo, self)
            self.frames[F] = frame
            frame.place(relwidth=1, relheight=1)

        #  Iniciando
        self.mostrar_pagina(PaginaInicio)

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
            tab_button = customtkinter.CTkButton(self.tab_bar, 
                                                 text=aba_nome, 
                                                 command=lambda f=frame, name=aba_nome: self.ativar_aba(f, name),
                                                 fg_color="transparent",
                                                 border_width=0)
            tab_button.pack(side="left", padx=2)

        #  Botões de Ação na Direita da Barra de Abas 
        btn_sair = customtkinter.CTkButton(self.tab_bar, text="Sair", width=80, fg_color="transparent", border_width=2, text_color=("gray10", "#DCE4EE"), command=self.quit)
        btn_sair.pack(side="right", padx=2)
        btn_config = customtkinter.CTkButton(self.tab_bar, text="Configurações", width=120, command=lambda: self.mostrar_pagina(PaginaConfiguracoes))
        btn_config.pack(side="right", padx=2)

        # Dicionário para mapear nome dos temas em português
        self.mapa_temas = {"Escuro": "dark", "Claro": "light", "Sistema": "system"}
        temas_disponiveis_pt = list(self.mapa_temas.keys())

        self.combo_tema = customtkinter.CTkComboBox(self.tab_bar, values=temas_disponiveis_pt, command=self.trocar_tema_combobox, width=110)
        tema_pt_atual = [k for k, v in self.mapa_temas.items() if v == self.tema_atual][0]
        self.combo_tema.set(tema_pt_atual)
        self.combo_tema.pack(side="right", padx=2)
        label_tema = customtkinter.CTkLabel(self.tab_bar, text="Tema:")
        label_tema.pack(side="right", padx=(10, 2))

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
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Curso", "img/Curso.png", lambda: self.mostrar_pagina(PaginaProfessores))
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Matérias", "img/Materias.png", lambda: self.mostrar_pagina(PaginaProfessores))

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
        self.tema_atual = novo_tema
        self.atualizar_estilo_treeview()

    # Função para atualizar o estilo do Treeview em todas as páginas de acordo com o tema atual
    def atualizar_estilo_treeview(self):
        if self.tema_atual == "dark":
            bg_color = "#2a2d2e"
            text_color = "white"
            field_bg_color = "#343638"
            header_bg = "#565b5e"
            selected_color = "#22559b"
        else: # Tema claro
            bg_color = "#ebebeb"
            text_color = "black"
            field_bg_color = "#f2f2f2"
            header_bg = "#d6d6d6"
            selected_color = "#3a7ebf"

        style = ttk.Style()
        style.configure("Treeview", background=bg_color, foreground=text_color, fieldbackground=field_bg_color, borderwidth=0)
        style.map('Treeview', background=[('selected', selected_color)])
        style.configure("Treeview.Heading", background=header_bg, foreground=text_color, relief="flat")
        style.map("Treeview.Heading", background=[('active', '#3484F0')])


if __name__ == "__main__":
    app = UniPimApp()
    app.mainloop()