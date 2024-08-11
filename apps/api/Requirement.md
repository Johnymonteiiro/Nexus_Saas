USER

[RF001] O sistema deve poder cadastrar um usuário;
[RF002] O sistema deve permitir a autenticação do usuário com email e senha;
[RF003] O sistema deve permitir que o usuário recupere a sua senha;
[RF004] O sistema deve permitir que o usuário atualize o seu perfil;
[RF005] O sistema deve implementar uma política de autorização;
[RF006] O sistema deve permitir a gestão dos usuários cadastrados no sistema;

CLIENT

[RF001]: O sistema deve poder criar um cliente;
[RF002]: O sistema deve listar todos os clentes com informações detalhadas;
[RF003]: Deve ser possível associar um cliente a um ou mais projetos;
[RF004]: O sistema deve permitir que o cliente atualize o seu perfil;
[RF005]: O sistema deve fornecer opções para buscar e visualizar informações sobre clientes existentes;
[RF006]: Deve existir a capacidade de inativar ou excluir um cliente;
[RF007]: O sistema deve manter um histórico detalhado dos projetos anteriores realizados para cada cliente, registrando datas, escopo, orçamentos e resultados alcançados;

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    },
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
