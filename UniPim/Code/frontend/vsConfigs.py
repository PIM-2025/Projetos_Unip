import customtkinter

class PaginaConfiguracoes(customtkinter.CTkFrame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.label = customtkinter.CTkLabel(self, text="Página de Configurações", font=customtkinter.CTkFont(size=18))
        self.label.pack(pady=20, padx=20)
