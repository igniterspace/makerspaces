# Prerequisites

* [nodejs latest runtime](https://nodejs.org/en/)
* npm package manager
* [git commandline tools](https://git-scm.com/)
* [google cloud CLI](https://cloud.google.com/sdk/)
* Angular 4+ CLI
* local mysql server and command line tools
* verify the installations through calling --version. You may need to add the executables in your system path.

        node --version
        npm --version
        git --version
        gcloud --version
        ng --version
        mysql --version

# Clone IgniterSpace Git repository

* Clone the latest code from 

        git clone https://github.com/igniterspace/makerspaces.git

* Change into the 'makerspaces' directory and install node dependencies

        cd makerspaces
        npm install

# Setup database locally

1. Setup local MySql server

    * Start the server 
    
        * On OS X

                cd /Library/LaunchDaemons
                sudo launchctl load -F com.oracle.oss.mysql.mysqld.plist

        * On Windows

                <TBD>

    * Use command line tools to connect to the server and verify

                mysql -u root -p --host 127.0.0.1
                mysql> show databases;

1. Create a local database
        
    * Ensure the mysql username and password are correct in ./server-config.js

                ...          
                HOST: '127.0.0.1', //local development setting
                DATABASE: 'makerspaces',
                MYSQL_USER: 'root',
                MYSQL_PASSWORD: '< your local user password >', 
                ...

    * Run the scripts to create and insert sample data. It will prompt you for the database credentials which is given as above.

                cd makerspaces
                npm run db-create
                npm run db-sample

    * Now on mysql client you can veryfy if the database exists

        * You will see a new database named 'makerspaces' now

                mysql> show databases;

        * View sample data

                mysql> use makerspaces;
                mysql> select * from users;

        * You can add sample data to the script ./server-modules/db_sample.js as required. Once sample data added, you will need to run 'npm run db-create' and 'npm run db-sample' commands to recreate the databases.

# Run the web application

1. Build the angular app

        ng build

1. Run rest api server using nodejs

        cd makerspaces
        npm start

1. Open the application in browser. Location query parameter is the location (makerspace) database id 

        (http://localhost:8080/home?location=1)
        Login to the application using Login button at right-top corner
        You will not be able to access any data because your user may not been granted rights. You can see the access denied messages to your API calls on the chrome console

3. Grant access to the user at https://manage.auth0.com/login. On the Auth0 console menu, users->select user-> app-metadata and insert the following configuration. Note that below configuration gives user the global admin rights.

        { "access": { "*": {"*": "write"} } }

4. Logout and login again to our application. User will be able to see the makerspace locations and navigate on the menu.



# Connecting to cloud database - production

Download and install the Cloud SQL Proxy. The Cloud SQL Proxy is used to connect to your Cloud SQL instance when running locally. See https://cloud.google.com/nodejs/getting-started/using-cloud-sql for steps
https://cloud.google.com/sql/docs/mysql/connect-admin-proxy#service-account

To start the sql cloud proxy
./cloud_sql_proxy -instances="makerspace-management-system:us-central1:ig-dev"=tcp:3306 -credential_file=key-file.json 
Use mysql client to connecct to the database through proxy

mysql -u root -p --host 127.0.0.1

1. npm install
2. npm run init-cloudsql


# Listen to the log trail on the cloud server  - production
gcloud app logs tail -s default | grep 'error'

#Deploy the app to Google Cloud  - production

        gcloud app deploy
