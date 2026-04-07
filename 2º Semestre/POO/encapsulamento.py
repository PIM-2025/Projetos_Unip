class ContaBancaria:
    def __init__(self, titular, saldo):
        self._titular = titular
        self._saldo = saldo

    def get_saldo(self):
        return self._saldo

    def depositar(self, valor):
        if valor > 0:
            self._saldo += valor
            print(f"Depósito de R${valor} realizado com sucesso.")


conta1 = ContaBancaria("Ramon", 1000)
print(f"Saldo inicial: R${conta1.get_saldo()}")
conta1.depositar(500)
print(f"Saldo após depósito: R${conta1.get_saldo()}")


