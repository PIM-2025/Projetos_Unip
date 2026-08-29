import 'package:flutter/material.dart';
import '../components/custom_text_field.dart'; // Importando o seu componente

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final senhaController = TextEditingController();

  void realizarLogin() {
    if (emailController.text.isEmpty || senhaController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Preencha todos os campos.')),
      );
      return;
    }
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Login realizado com sucesso!')),
    );
  }

  @override
  void dispose() {
    // Boa prática: limpa os controladores da memória ao destruir a tela
    emailController.dispose();
    senhaController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(25),
        child: SingleChildScrollView( // Evita erro de teclado cobrindo a tela
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 40), // Espaçamento inicial
              const Icon(Icons.account_circle, size: 100),
              const SizedBox(height: 30),
              
              // Seu campo de E-mail usando o componente
              CustomTextField(
                label: 'E-mail',
                icon: Icons.email,
                controller: emailController,
              ),
              const SizedBox(height: 20),
              
              // Seu campo de Senha usando o componente
              CustomTextField(
                label: 'Senha',
                icon: Icons.lock,
                controller: senhaController,
                isPassword: true,
              ),
              const SizedBox(height: 25),
              
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: realizarLogin,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFFFC107), // Mude para a cor que desejar
                    foregroundColor: const Color(0xFFFFFFFF), 
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    elevation: 2
                  ),
                  child: const Text(
                    'Entrar',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold
                    ),
                  )
                  
                ),
              ),
              TextButton(
                onPressed: () {},
                style: TextButton.styleFrom(
                  
                ),
                child: const Text('Esqueci minha senha'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
