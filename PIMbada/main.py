import tkinter as tk
# Importa as classes de cada página dos seus respectivos arquivos
from pagina_inicio import PaginaInicio
from pagina_alunos import PaginaAlunos
from pagina_professores import PaginaProfessores
from pagina_configuracoes import PaginaConfiguracoes

# --- Configurações Globais ---
MENU_LARGURA = 150
ANIMATION_SPEED_MS = 10

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

class PimthonApp(tk.Tk):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.title("PIMthon")
        self.geometry("600x400")

        # --- Configurações de Estado ---
        self.menu_visivel = True
        self.lista_temas = list(temas.keys())
        self.tema_atual_index = 0

        # --- Estrutura Principal ---
        self.menu_lateral = tk.Frame(self, width=MENU_LARGURA)
        self.menu_lateral.pack(side="left", fill="y")

        # Container que irá abrigar as diferentes páginas (frames)
        self.container_conteudo = tk.Frame(self)
        self.container_conteudo.pack(side="right", expand=True, fill="both")
        self.container_conteudo.grid_rowconfigure(0, weight=1)
        self.container_conteudo.grid_columnconfigure(0, weight=1)

        # Botão para mostrar/esconder o menu
        self.btn_toggle = tk.Button(self, text="≡", command=self.toggle_menu, font=("Arial", 12), width=2)
        self.btn_toggle.place(in_=self.container_conteudo, x=5, y=5)

        # --- Criação dos Botões do Menu ---
        self.criar_botoes_menu()

        # --- Gerenciamento de Páginas ---
        self.frames = {}
        paginas = (PaginaInicio, PaginaAlunos, PaginaProfessores, PaginaConfiguracoes)

        for F in paginas:
            frame = F(self.container_conteudo, self)
            self.frames[F] = frame
            frame.grid(row=0, column=0, sticky="nsew")

        # --- Inicialização ---
        self.aplicar_tema_atual()
        self.mostrar_pagina(PaginaInicio)

    def mostrar_pagina(self, page_class):
        """Eleva o frame da página solicitada para o topo, tornando-o visível."""
        frame = self.frames[page_class]
        frame.tkraise()

    def criar_botoes_menu(self):
        # --- Botões Principais (no topo) ---
        botoes_principais = [
            ("Início", lambda: self.mostrar_pagina(PaginaInicio)),
            ("Alunos", lambda: self.mostrar_pagina(PaginaAlunos)),
            ("Professores", lambda: self.mostrar_pagina(PaginaProfessores))
        ]

        for texto, comando in botoes_principais:
            btn = tk.Button(self.menu_lateral, text=texto, command=comando, anchor="w")
            btn.pack(side="top", fill="x", pady=2, padx=5)

        # --- Botões Inferiores ---
        btn_trocar_tema = tk.Button(self.menu_lateral, text="Trocar Tema", command=self.trocar_tema, anchor="w")
        btn_trocar_tema.pack(side="bottom", fill="x", pady=(10, 5), padx=5)
        
        btn_configuracoes = tk.Button(self.menu_lateral, text="Configurações", command=lambda: self.mostrar_pagina(PaginaConfiguracoes), anchor="w")
        btn_configuracoes.pack(side="bottom", fill="x", pady=2, padx=5)

    # --- Funções de Tema e Animação  ---
    def aplicar_tema_atual(self):
        nome_tema = self.lista_temas[self.tema_atual_index]
        tema = temas[nome_tema]

        self.config(bg=tema["conteudo_bg"])
        self.menu_lateral.config(bg=tema["menu_bg"])
        self.container_conteudo.config(bg=tema["conteudo_bg"])
        self.btn_toggle.config(bg=tema["btn_bg"], fg=tema["btn_fg"], relief=tema["btn_relief"])

        for widget in self.menu_lateral.winfo_children():
            if isinstance(widget, tk.Button):
                widget.config(bg=tema["btn_bg"], fg=tema["btn_fg"], relief=tema["btn_relief"])
        
        # Pede para cada página atualizar seu próprio tema
        for frame in self.frames.values():
            if hasattr(frame, 'atualizar_tema'):
                frame.atualizar_tema(tema)

    def trocar_tema(self):
        self.tema_atual_index = (self.tema_atual_index + 1) % len(self.lista_temas)
        self.aplicar_tema_atual()

    def toggle_menu(self):
        if self.menu_visivel:
            self.animar_esconder(MENU_LARGURA)
        else:
            self.menu_lateral.pack(side="left", fill="y", before=self.container_conteudo)
            self.animar_mostrar(0)
        self.menu_visivel = not self.menu_visivel

    def animar_esconder(self, largura_atual):
        nova_largura = largura_atual - 25
        if nova_largura > 0:
            self.menu_lateral.config(width=nova_largura)
            self.after(ANIMATION_SPEED_MS, lambda: self.animar_esconder(nova_largura))
        else:
            self.menu_lateral.pack_forget()

    def animar_mostrar(self, largura_atual):
        nova_largura = largura_atual + 25
        if nova_largura < MENU_LARGURA:
            self.menu_lateral.config(width=nova_largura)
            self.after(ANIMATION_SPEED_MS, lambda: self.animar_mostrar(nova_largura))
        else:
            self.menu_lateral.config(width=MENU_LARGURA)

if __name__ == "__main__":
    app = PimthonApp()
    app.mainloop()