import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# ==============================================================================
# 1. COLETA DE DADOS
# ==============================================================================
# Definimos o ticker (ex: PETR4.SA para Petrobras) e o período histórico.
ticker = 'PETR4.SA'  # Ação da Petrobras na B3
print(f"Baixando dados para {ticker}...")
dados = yf.download(ticker, start='2022-01-01', end='2024-01-01')

# Vamos trabalhar apenas com a coluna 'Close' (Preço de Fechamento)
df = dados[['Close']].copy()
# Removemos o MultiIndex caso o yfinance retorne (comum nas versões novas)
if isinstance(df.columns, pd.MultiIndex):
    df.columns = df.columns.droplevel(1)

# ==============================================================================
# 2. CÁLCULO DE INDICADORES TÉCNICOS (Features)
# ==============================================================================
print("Calculando Indicadores Técnicos...")

# a) Médias Móveis (SMA - Simple Moving Average)
df['SMA_20'] = df['Close'].rolling(window=20).mean() # Média curta
df['SMA_50'] = df['Close'].rolling(window=50).mean() # Média longa

# b) MACD (Moving Average Convergence Divergence)
# Calculado pela diferença entre a Média Exponencial de 12 e 26 dias
ema_12 = df['Close'].ewm(span=12, adjust=False).mean()
ema_26 = df['Close'].ewm(span=26, adjust=False).mean()
df['MACD'] = ema_12 - ema_26

# c) RSI (Relative Strength Index - Índice de Força Relativa)
# Mede a velocidade e a mudança dos movimentos de preços (janela padrão de 14 dias)
delta = df['Close'].diff()
ganho = (delta.where(delta > 0, 0)).rolling(window=14).mean()
perda = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
rs = ganho / perda
df['RSI'] = 100 - (100 / (1 + rs))

# ==============================================================================
# 3. PREPARAÇÃO PARA O APRENDIZADO DE MÁQUINA (Regressão Analítica)
# ==============================================================================
# Nosso objetivo (Target) é prever o preço de fechamento do dia seguinte.
# Para isso, deslocamos a coluna 'Close' em -1.
df['Target'] = df['Close'].shift(-1)

# Ao calcularmos médias e shifts, geramos valores nulos (NaN). Precisamos removê-los.
df = df.dropna()

# Definimos nossas variáveis independentes (X) e a variável dependente (y)
X = df[['SMA_20', 'SMA_50', 'MACD', 'RSI']]
y = df['Target']

# Dividimos os dados em treino (80%) e teste (20%) mantendo a ordem cronológica
X_treino, X_teste, y_treino, y_teste = train_test_split(X, y, test_size=0.2, shuffle=False)

# Criamos e treinamos o modelo de Regressão Linear
modelo = LinearRegression()
modelo.fit(X_treino, y_treino)

# Realizamos as previsões nos dados de teste
previsoes = modelo.predict(X_teste)

# ==============================================================================
# 4. RETRAÇÕES DE FIBONACCI (Níveis de Suporte e Resistência)
# ==============================================================================
# Baseado no período de teste para ver os níveis atuais relevantes
preco_max = df['Close'].loc[X_teste.index].max()
preco_min = df['Close'].loc[X_teste.index].min()
diferenca = preco_max - preco_min

# Níveis clássicos de Fibonacci (0%, 23.6%, 38.2%, 50%, 61.8%, 100%)
fib_niveis = {
    '100.0% (Mínima)': preco_min,
    '61.8%': preco_max - 0.618 * diferenca,
    '50.0%': preco_max - 0.5 * diferenca,
    '38.2%': preco_max - 0.382 * diferenca,
    '23.6%': preco_max - 0.236 * diferenca,
    '0.0% (Máxima)': preco_max
}

# ==============================================================================
# 5. VISUALIZAÇÃO DE DADOS PARA TOMADA DE DECISÃO
# ==============================================================================
print("Gerando visualização de dados...")
plt.figure(figsize=(14, 7))

# 1. Plotamos os preços reais do período de teste
plt.plot(y_teste.index, y_teste.values, label='Preço Real', color='blue', linewidth=2)

# 2. Plotamos as previsões do nosso modelo de ML
plt.plot(y_teste.index, previsoes, label='Previsão (Regressão Linear)', color='red', linestyle='--')

# 3. Adicionamos as linhas de Fibonacci (Suporte/Resistência)
cores_fib = ['gray', 'orange', 'green', 'purple', 'brown', 'black']
for (nome, valor), cor in zip(fib_niveis.items(), cores_fib):
    plt.axhline(y=valor, color=cor, linestyle=':', alpha=0.7, label=f'Fib {nome}')

# Configurações do Gráfico
plt.title(f'Previsão de Preços e Níveis de Fibonacci - {ticker}', fontsize=16)
plt.xlabel('Data')
plt.ylabel('Preço (R$)')
plt.legend(loc='upper left', bbox_to_anchor=(1, 1)) # Coloca a legenda fora do gráfico
plt.grid(True, alpha=0.3)
plt.tight_layout()

# Exibe o gráfico final
plt.show()

# Resumo de performance do modelo
erro_quadratico = mean_squared_error(y_teste, previsoes)
print(f"\n[INFO] Erro Quadrático Médio do modelo: {erro_quadratico:.4f}")
print("Previsão concluída. O gráfico fornece o cruzamento da predição com os limites de Suporte (Fibonacci).")
