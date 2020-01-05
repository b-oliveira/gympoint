## Instalação

```
git clone https://github.com/b-oliveira/gympoint.git
```

### Backend

```bash
cd backend

# Instale as dependências
yarn install

# Configure o banco de dados
yarn sequelize db:migrate
yarn sequelize db:seed:all

# Execute o servidor
yarn dev
yarn queue

```

### Frontend

```bash
cd frontend

# Instale as dependências
yarn install

# Execute o servidor
yarn start
```

### Mobile

```bash
cd mobile

# Instale as dependências
yarn install

# Execute o servidor
react-native start

# Execute o aplicativo no emulador
react-native run-android
```
Obs.: O aplicativo somente foi testado no ambiente Android.
