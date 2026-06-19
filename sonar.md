# Análise de Código com SonarQube

Antes de executar a análise, configure as variáveis de ambiente do SonarQube no arquivo `.env`:

```env
SONAR_HOST_URL=https://seu-servidor-sonar.com
SONAR_TOKEN=seu_token_de_acesso
```
## Executando a análise

Execute o comando abaixo na raiz do projeto:

```bash
npm run sonar
```
