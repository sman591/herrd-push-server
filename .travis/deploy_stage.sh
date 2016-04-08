eval "$(ssh-agent -s)" # start the ssh agent
openssl aes-256-cbc -K $encrypted_892a6c2690c6_key -iv $encrypted_892a6c2690c6_iv -in marketing_rsa.enc -out marketing_rsa -d
chmod 600 .travis/marketing_rsa # this key should have push access
ssh-add .travis/marketing_rsa
git remote add deploy dokku@csh-cloud.oweb.co:herrd-push-server-stage
git push --force deploy develop:master
