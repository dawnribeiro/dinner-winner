dotnet publish -c Release 

cp dockerfile ./bin/release/netcoreapp2.2/publish

docker build -t dinner-winner-image ./bin/release/netcoreapp2.2/publish

docker tag dinner-winner-image registry.heroku.com/dinner-winner/web

docker push registry.heroku.com/dinner-winner/web

heroku container:release web -a dinner-winner

# sudo chmod 755 deploy.sh
# ./deploy.sh