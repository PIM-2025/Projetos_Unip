import customtkinter
from tkinter import ttk

class PaginaProfessores(customtkinter.CTkFrame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        self.label = customtkinter.CTkLabel(self, text="Gerenciamento de Professores", font=customtkinter.CTkFont(size=20, weight="bold"))
        self.label.pack(pady=10, padx=10)

        # CustomTkinter não tem Treeview, então usamos o do ttk e o estilizamos
        self.style = ttk.Style()
        self.style.theme_use("default")

        # Configuração de estilo para o Treeview
        self.style.configure("Treeview",
                             background="#2a2d2e",
                             foreground="white",
                             rowheight=25,
                             fieldbackground="#343638",
                             bordercolor="#343638",
                             borderwidth=0)
        self.style.map('Treeview', background=[('selected', '#22559b')])

        self.style.configure("Treeview.Heading",
                             background="#565b5e",
                             foreground="white",
                             relief="flat")
        self.style.map("Treeview.Heading",
                       background=[('active', '#3484F0')])

        colunas = ('id', 'nome', 'curso')
        self.tree = ttk.Treeview(self, columns=colunas, show='headings')
        
        self.tree.heading('id', text='ID')
        self.tree.heading('nome', text='Nome')
        self.tree.heading('curso', text='Curso')

        # Adicionando dados de exemplo
        alunos_exemplo = [
            (1, 'Junior Silveira', 'Análise e Des. de Sistemas'),
            (2, 'Eduardo Oliveira', 'Ciência da Computação'),
            (3, 'Cláudia Ferreira', 'Análise e Des. de Sistemas')
        ]
        #for aluno in alunos_exemplo:
            #self.tree.insert('', ttk.END, values=aluno)

        self.tree.pack(expand=True, fill='both', padx=10, pady=10)
