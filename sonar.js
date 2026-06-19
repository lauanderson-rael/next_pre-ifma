require('dotenv').config();

const { execSync } = require('child_process');

try {
  execSync(
    `npx sonarqube-scanner \
    -Dsonar.host.url=${process.env.SONAR_HOST_URL} \
    -Dsonar.token=${process.env.SONAR_TOKEN}`,
    { stdio: 'inherit' }
  );
} catch (error) {
  console.error('❌ Erro ao executar análise Sonar');
  process.exit(1);
}