import tkinter as tk
import os # Adicionado para manipulação de caminhos de arquivo
# Importa as classes de cada página dos seus respectivos arquivos
from PIL import Image, ImageTk  # Importa para trabalhar com imagens
from pagina_inicio import PaginaInicio
from pagina_alunos import PaginaAlunos
from pagina_professores import PaginaProfessores
from pagina_configuracoes import PaginaConfiguracoes

# --- Dicionário de Temas ---
temas = {
    "dark": {
        "menu_bg": "#2c3e50", "conteudo_bg": "#34495e", "texto_fg": "white",
        "btn_bg": "#34495e", "btn_fg": "white", "btn_relief": "flat",
        "label_bg": "#34495e",
    },
    "light": {
        "menu_bg": "#ecf0f1", "conteudo_bg": "white", "texto_fg": "black",
        "btn_bg": "#bdc3c7", "btn_fg": "black", "btn_relief": "groove",
        "label_bg": "white",
    }
}

class UniPimApp(tk.Tk):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.state('zoomed') # Inicia a janela maximizada
        self.title("UniPim - Plataforma de registro acadêmico digital")

        # --- Configurações de Tema ---
        self.lista_temas = list(temas.keys())
        self.tema_atual_index = 0

        # --- Estrutura da Interface Ribbon ---
        # Container principal para a faixa de opções (abas + conteúdo da faixa)
        self.ribbon_container = tk.Frame(self)
        self.ribbon_container.pack(side="top", fill="x")

        # Container que irá abrigar as diferentes páginas (frames)
        self.container_conteudo = tk.Frame(self)
        self.container_conteudo.pack(side="top", expand=True, fill="both")

        self.criar_interface_ribbon()

        # --- Gerenciamento de Páginas ---
        self.frames = {}
        paginas = (PaginaInicio, PaginaAlunos, PaginaProfessores, PaginaConfiguracoes)

        for F in paginas:
            frame = F(self.container_conteudo, self)
            self.frames[F] = frame
            # Usar place para garantir que o conteúdo não afete o tamanho do container
            frame.place(relwidth=1, relheight=1)

        # --- Inicialização ---
        self.aplicar_tema_atual()
        self.mostrar_pagina(PaginaInicio)

    def mostrar_pagina(self, page_class):
        """Eleva o frame da página solicitada para o topo, tornando-o visível."""
        frame = self.frames[page_class]
        frame.tkraise() # Este comando traz o frame para frente

    def criar_interface_ribbon(self):
        """Cria a interface estilo Ribbon com abas e botões de ação."""
        # Frame para as abas
        self.tab_bar = tk.Frame(self.ribbon_container)
        self.tab_bar.pack(side="top", fill="x", padx=5, pady=(5, 0))

        # Frame para o conteúdo da faixa de opções (onde os botões de ação aparecem)
        self.ribbon_content_area = tk.Frame(self.ribbon_container, height=110)
        self.ribbon_content_area.pack(side="top", fill="x")
        self.ribbon_content_area.pack_propagate(False) # Impede que o frame encolha

        # Dicionário para armazenar os frames de conteúdo de cada aba
        self.ribbon_frames = {}

        # --- Abas da Esquerda ---
        abas_esquerda = ["Arquivo", "Cadastros", "Consultas", "Relatórios"]
        for aba_nome in abas_esquerda:
            frame = tk.Frame(self.ribbon_content_area)
            self.ribbon_frames[aba_nome] = frame
            frame.place(relwidth=1, relheight=1)
            # Adicionamos padx para espaçar as abas
            tab_button = tk.Button(self.tab_bar, text=aba_nome, command=lambda f=frame, name=aba_nome: self.ativar_aba(f, name))
            tab_button.pack(side="left", padx=2)

        # --- Botões de Ação na Direita da Barra de Abas ---
        # Criamos os botões diretamente na barra, sem a aba "Opções"
        btn_tema = tk.Button(self.tab_bar, text="Trocar Tema", command=self.trocar_tema)
        btn_tema.pack(side="right", padx=2)
        btn_config = tk.Button(self.tab_bar, text="Configurações", command=lambda: self.mostrar_pagina(PaginaConfiguracoes))
        btn_config.pack(side="right", padx=2)

        # --- Adiciona botões de ação a cada frame da faixa de opções ---
        self.adicionar_botoes_ribbon()
        self.tab_buttons = {w.cget("text"): w for w in self.tab_bar.winfo_children() if isinstance(w, tk.Button)}

        # Define a aba ativa inicial
        self.aba_ativa = "Cadastros"

        # Mostra a primeira aba por padrão
        self.ribbon_frames["Cadastros"].tkraise()

    def ativar_aba(self, frame_para_ativar, nome_aba):
        """Ativa uma aba da faixa de opções, elevando seu frame."""
        self.aba_ativa = nome_aba
        frame_para_ativar.tkraise()
        # Futuramente, podemos adicionar feedback visual aqui (ex: mudar cor da aba ativa)

    def adicionar_botoes_ribbon(self):
        """Popula cada aba da faixa de opções com seus respectivos botões de ação."""
        # --- Botões para a aba "Arquivo" ---
        self.criar_botao_acao(self.ribbon_frames["Arquivo"], "Início", "", lambda: self.mostrar_pagina(PaginaInicio))
        self.criar_botao_acao(self.ribbon_frames["Arquivo"], "Sair", "", self.quit)

        # --- Botões para a aba "Cadastros" ---
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Alunos", "img/Aluno.png", lambda: self.mostrar_pagina(PaginaAlunos))
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Professores", "img/Professor.png", lambda: self.mostrar_pagina(PaginaProfessores))
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Curso", "img/Curso.png", lambda: self.mostrar_pagina(PaginaProfessores))
        self.criar_botao_acao(self.ribbon_frames["Cadastros"], "Matérias", "img/Materias.png", lambda: self.mostrar_pagina(PaginaProfessores))

    def criar_botao_acao(self, parent, texto, caminho_icone, comando, pack_side="left"):
        """Cria um botão com ícone e texto para a faixa de opções."""
        photo = None
        try:
            if caminho_icone: # Só tenta carregar se um caminho for fornecido
                # Constrói o caminho absoluto para o ícone
                script_dir = os.path.dirname(os.path.abspath(__file__))
                caminho_completo = os.path.join(script_dir, caminho_icone)
                img = Image.open(caminho_completo)
                img = img.resize((64, 64), Image.Resampling.LANCZOS)
                photo = ImageTk.PhotoImage(img)
        except FileNotFoundError:
            # Se o arquivo não for encontrado, cria um botão apenas com texto
            print(f"Aviso: Ícone não encontrado em '{caminho_icone}'. Criando botão sem imagem.")

        botao = tk.Button(parent, text=texto, command=comando, image=photo, compound="top")
        botao.image = photo # Mantém uma referência para a imagem
        botao.pack(side=pack_side, padx=5, pady=5)
        return botao

    def aplicar_tema_atual(self):
        nome_tema = self.lista_temas[self.tema_atual_index]
        tema = temas[nome_tema]

        # O fundo da janela (atrás do container) e o container principal são atualizados
        self.config(bg=tema["menu_bg"]) # Fundo geral da janela
        self.ribbon_container.config(bg=tema["menu_bg"])
        self.tab_bar.config(bg=tema["menu_bg"])
        self.ribbon_content_area.config(bg=tema["menu_bg"])
        self.container_conteudo.config(bg=tema["conteudo_bg"])

        # Aplica tema aos widgets da interface Ribbon
        for widget in self.tab_bar.winfo_children():
            if isinstance(widget, tk.Button):
                widget.config(bg=tema["btn_bg"], fg=tema["btn_fg"], relief=tema["btn_relief"], borderwidth=0, highlightthickness=0)

        for frame in self.ribbon_frames.values():
            frame.config(bg=tema["menu_bg"])
            for widget in frame.winfo_children():
                if isinstance(widget, tk.Button):
                    widget.config(bg=tema["btn_bg"], fg=tema["btn_fg"], relief=tema["btn_relief"], compound="top", borderwidth=0, highlightthickness=0)

        # Pede para cada página atualizar seu próprio tema
        for frame in self.frames.values():
            if hasattr(frame, 'atualizar_tema'):
                frame.atualizar_tema(tema)

    def trocar_tema(self):
        self.tema_atual_index = (self.tema_atual_index + 1) % len(self.lista_temas)
        self.aplicar_tema_atual()

if __name__ == "__main__":
    app = UniPimApp()
    app.mainloop()