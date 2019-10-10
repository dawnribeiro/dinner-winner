docker build -t dinner-winner-image .

docker tag dinner-winner-image registry.heroku.com/dinner-winner/web

docker push registry.heroku.com/dinner-winner/web

heroku container:release web -a dinner-winner

# sudo chmod 755 deploy.sh
# ./deploy.sh