import customtkinter as ctk
from PIL import Image, ImageTk

ctk.set_appearance_mode('dark')

def validar_login():
    usuario = campo_usuario.get()
    senha = campo_senha.get()
    if usuario == 'admin' and senha == 'admin123':
        resultado_login.configure(text='Login bem-sucedido!', text_color='green')
    else:
        resultado_login.configure(text='Usuário ou senha incorretos.', text_color='red')

app = ctk.CTk()
app.title('Plataforma de Registro Acadêmico Digital')
app.geometry('800x600')

imagem_logo = Image.open('Assets/logo.png')  # Substitua pelo nome correto do arquivo se necessário
imagem_logo = imagem_logo.resize((100, 100))  # Ajuste o tamanho conforme necessário
imagem_logo_ctk = ctk.CTkImage(dark_image=imagem_logo, light_image=imagem_logo, size=(144, 44))

# Adicionar a imagem no topo
label_logo = ctk.CTkLabel(app, image=imagem_logo_ctk, text='')  # text='' para não exibir texto junto
label_logo.pack(pady=(20, 10))  # Espaçamento superior

lbl_bemvindo = ctk.CTkLabel(app, text='Bem-vindo à Plataforma de Registro Acadêmico Digital', font=('Arial', 25, 'bold'))
lbl_bemvindo.pack(pady=10)

lbl_usuario = ctk.CTkLabel(app, text='Usuário:')
lbl_usuario.pack(pady=5)
campo_usuario = ctk.CTkEntry(app, placeholder_text='Digite seu usuário', font=('Arial', 14))
campo_usuario.pack(pady=10)


lbl_senha = ctk.CTkLabel(app, text='Senha:', font=('Arial', 14))
lbl_senha.pack(pady=5)
campo_senha = ctk.CTkEntry(app, placeholder_text='Digite sua senha', show='*')
campo_senha.pack(pady=10)

button_login = ctk.CTkButton(app, text='Login', command=validar_login)
button_login.pack(pady=10)

resultado_login = ctk.CTkLabel(app, text='')
resultado_login.pack(pady=10)

app.mainloop()