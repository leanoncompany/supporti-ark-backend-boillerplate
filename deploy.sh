export PATH=$PATH:/root/.nvm/versions/node/v18.12.1/bin
export NVM_DIR=/root/.nvm
export JAVA_HOME=/opt/java/openjdk

echo 'npm install'
npm install

echo 'build'
npm run build

echo 'pm2 start'

# 원하는 PM2 프로세스의 아이디
PM2_PROCESS_ID=0

# PM2 프로세스 목록 가져오기
PM2_LIST=$(pm2 list)

# 원하는 아이디가 있는지 확인
if echo "$PM2_LIST" | grep -qE "(\s|^)$PM2_PROCESS_ID(\s|$)"; then
  echo "restart"
  pm2 restart "$PM2_PROCESS_ID"
else
  echo "deploy"
  npm run start
fi

pm2 save