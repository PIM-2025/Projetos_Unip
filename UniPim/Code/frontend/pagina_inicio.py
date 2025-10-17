import tkinter as tk

class PaginaInicio(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        self.label = tk.Label(self, text="Bem-vindo ao PIMthon!", font=("Arial", 18))
        self.label.pack(pady=50, padx=20)

    def atualizar_tema(self, tema):
        """Aplica o tema aos widgets desta página."""
        self.config(bg=tema["conteudo_bg"])
        self.label.config(bg=tema["label_bg"], fg=tema["texto_fg"])
