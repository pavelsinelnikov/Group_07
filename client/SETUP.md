# Steps to Startup

## IMPORTANT INFORMATION FOR MAINTAINING THIS PROJECT

1. Make sure to pull any code before you start to make changes
2. You can commit any code as long as it does not contain error messages, **_DO NOT PUSH CODE THAT DOES NOT COMPILE!!!_**
3. Push all code to the master branch

## What you need before the setup

- node.js installed
- git cli/gui installed
- yarn - to install it type "npm install --global yarn"

## Steps for inital startup

1. Create a directory where you wish to clone the repo
2. Enter the directory
3. Type "git clone https://github.com/SenecaCollegeBTSProjects/Group_07.git" **This may not work since it is a private repo, in that case you have to set up access keys to access the repo. This information is available on Google**
4. Enter the directory through a terminal
5. Type "yarn install"
6. Done!

## Steps for starting the server

1. Inside the Group_07 folder type "yarn run serve"
2. Done!

## Steps for setting up the .env file to store your personal API keys

1. Create the .env file inside the Group_07 directory
2. Enter your api keys in the format:

```
VUE_APP_NEWS_API=APIKEY
VUE_APP_GOOGLE_API=APIKEY
```

3. Done!

## Steps for setting up the database and Database management software

1. Download Docker
2. Download Dbeaver (or any other mySQL management software such as mySQL Workbench)
3. Go to your console and type:

```
docker run --name mysql-bts -p 3306:3306 -e MYSQL_ROOT_PASSWORD=mypassword -d mysql:latest
docker exec -it mysql-bts bash
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'mypassword';
```

The first line initializes the docker container with mysql, the second and third line converts the password to a 'legacy' version so that you can use it within the server

4. Start Dbeaver (or other mySQL management software) and create a new connection using the credentials:

**Host** - localhost  
**Port** - 3306  
**Name** - blank  
**Username** - root  
**Password** - mypassword

5. Done!

If you need additional clarification on any items, send me a message. I will be happy to help :)
