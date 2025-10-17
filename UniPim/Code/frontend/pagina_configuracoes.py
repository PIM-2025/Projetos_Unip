import tkinter as tk

class PaginaConfiguracoes(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.label = tk.Label(self, text="Página de Configurações")
        self.label.pack(pady=20, padx=20)

    def atualizar_tema(self, tema):
        self.config(bg=tema["conteudo_bg"])
        self.label.config(bg=tema["label_bg"], fg=tema["texto_fg"])
