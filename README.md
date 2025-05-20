
# Cripto César - Aplicação de Criptografia e Autenticação

## Descrição

Projeto frontend e backend para criptografar e descriptografar mensagens utilizando a cifra de César. Também inclui funcionalidades de cadastro e login de usuários.

- Frontend em React + TypeScript
- Backend em Node.js + Express + MySQL
- Uso de UUID para identificação única das mensagens
- Middleware para criptografia/descriptografia no backend
- Sistema básico de autenticação

---

## Tecnologias utilizadas

- React  
- TypeScript  
- Express  
- MySQL  
- Lucide React (ícones)  
- UUID  
- Cors  

---

## Estrutura do projeto

```
/
├── backend/
│   ├── db/
│   │   └── db.ts               # Configuração da conexão com MySQL
│   ├── middleware/
│   │   ├── cesarMiddleware.ts  # Middleware para criptografia
│   │   └── decifraCesarMiddleware.ts  # Middleware para descriptografia
│   ├── server.ts               # Servidor Express com rotas
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.tsx        # Componente principal com criptografia
│   │   │   ├── Login.tsx       # Tela de login
│   │   │   ├── Register.tsx    # Tela de cadastro
│   │   └── styles.module.css   # Arquivo CSS modularizado para estilos
│   └── package.json
└── README.md
```

---

## Funcionalidades

### Frontend

- **Home**  
  - Inserir mensagem e passo para criptografar com cifra de César  
  - Exibir lista de mensagens criptografadas com hash e status  
  - Decriptografar mensagens usando hash e mensagem criptografada  
  - Mensagens podem ser marcadas como usadas para evitar reutilização do hash  

- **Login**  
  - Tela simples de login com inputs para usuário e senha  
  - Navegação para tela de registro

- **Register**  
  - Tela para criar uma nova conta com validação simples  
  - Comunicação com backend para cadastrar usuário  
  - Exibe mensagens de erro e loading

### Backend

- Rotas para criptografar e descriptografar mensagens (middleware faz o trabalho)  
- Cadastro e login de usuário com verificação no banco de dados  
- Busca mensagens do usuário pelo ID  
- Middleware para aplicar cifra de César na mensagem

---

## Como executar

### Backend

1. Configure o banco MySQL e crie as tabelas necessárias para `usuarios` e `mensagens`.
2. Configure as credenciais no arquivo `db/db.ts`.
3. Instale dependências e rode o servidor:

```bash
cd backend
npm install
npm run dev
```

### Frontend

1. Instale dependências:

```bash
cd frontend
npm install
```

2. Rode a aplicação React:

```bash
npm start
```

Acesse em `http://localhost:3000`


## Observações

- Senhas estão sendo salvas em texto simples no banco (para fins didáticos). Em produção, utilize hashing seguro (ex: bcrypt).
- O hash das mensagens é gerado com UUID para garantir unicidade.
- Middleware no backend aplica e reverte a cifra de César.
- Frontend é modularizado e usa CSS Modules para isolamento de estilos.

---

Se quiser posso ajudar a gerar scripts SQL para as tabelas ou melhorar a segurança do sistema. Quer que eu faça?
