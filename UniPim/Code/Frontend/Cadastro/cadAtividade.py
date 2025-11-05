import customtkinter

class JanelaCadastroAtividade(customtkinter.CTkToplevel):
    def __init__(self, master, atividade_data=None):
        super().__init__(master)
        self.master = master
        self.atividade_data = atividade_data

        self.title("Cadastro de Atividade")
        self.geometry("400x300")
        self.transient(master) # Faz com que a janela de cadastro fique acima da janela principal
        self.grab_set() # Bloqueia interações com a janela principal

        label = customtkinter.CTkLabel(self, text="Formulário de Cadastro de Atividade")
        label.pack(pady=20)

        # TODO: Adicionar campos de entrada e botões para salvar/cancelar
        # Exemplo: customtkinter.CTkEntry(self, placeholder_text="Nome da Atividade").pack()
