# Prerequisites

* nodejs latest runtime
* npm package manager
* git commandline tools
* google cloud CLI
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
                mysql> show databases

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

                mysql> show databases

        * View sample data

                mysql> use makerspaces
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





# Connecting to cloud database - production

Download and install the Cloud SQL Proxy. The Cloud SQL Proxy is used to connect to your Cloud SQL instance when running locally. See https://cloud.google.com/nodejs/getting-started/using-cloud-sql for steps
https://cloud.google.com/sql/docs/mysql/connect-admin-proxy#service-account

To start the sql cloud proxy
./cloud_sql_proxy -instances="makerspace-management-system:us-central1:ig-dev"=tcp:3306 -credential_file=key-file.json 
Use mysql client to connecct to the database through proxy

mysql -u root -p --host 127.0.0.1

1. npm install
2. npm run init-cloudsql



# Creating the database and inserting sample data
Move to the folder where the project files are
npm run db-create
npm run db-sample

# Listen to the log trail
gcloud app logs tail -s default | grep 'error'

# 5 - Logging app events

This folder contains the sample code for the [Logging app events][step-5]
tutorial. Please refer to the tutorial for instructions on configuring, running,
and deploying this sample.

[step-5]: https://cloud.google.com/nodejs/getting-started/logging-application-events

# Simple instructions

1.  Install [Node.js](https://nodejs.org/en/).

    * Optional: Install [Yarn](https://yarnpkg.com/).

1.  Install [git](https://git-scm.com/).
1.  Create a [Google Cloud Platform project](https://console.cloud.google.com).
1.  Install the [Google Cloud SDK](https://cloud.google.com/sdk/).

    * After downloading the SDK, initialize it:

            gcloud init

1.  Acquire local credentials for authenticating with Google Cloud Platform
    services:

        gcloud beta auth application-default login

1.  Clone the repository:

        git clone https://github.com/GoogleCloudPlatform/nodejs-getting-started.git

1.  Change directory:

        cd nodejs-getting-started/5-logging

1.  Create a `config.json` file (copied from the `config-default.json` file):

        cp config-default.json config.json

    * Set `GCLOUD_PROJECT` in `config.json` to your Google Cloud Platform
      project ID.
    * Set `DATA_BACKEND` in `config.json` to one of `"datastore"`, `"cloudsql"`,
      or `"mongodb"`.
    * Set `CLOUD_BUCKET` in `config.json` to the name of your Google Cloud
      Storage bucket.
    * Set `OAUTH2_CLIENT_ID` in `config.json`.
    * Set `OAUTH2_CLIENT_SECRET` in `config.json`.

1.  Install dependencies using NPM or Yarn:

    * Using NPM:

            npm install

    * Using Yarn:

            yarn install

1.  Configure the backing store:

    * If `DATA_BACKEND` is set to `"cloudsql"`:

        1.  Create a Cloud SQL instance, and download and start the Cloud SQL
            proxy:

            Instructions for doing so: https://cloud.google.com/nodejs/getting-started/using-cloud-sql#creating_a_cloud_sql_instance
        1.  Set `MYSQL_USER` in `config.json`, e.g. `"my-cloudsql-username"`.
        1.  Set `MYSQL_PASSWORD` in `config.json`, e.g. `"my-cloudsql-password"`.
        1.  Set `INSTANCE_CONNECTION_NAME` in `config.json`, e.g. `"YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_ID"`.
        1.  Run the script to setup the table:

            * Using NPM:

                    npm run init-cloudsql

            * Using Yarn:

                    yarn run init-cloudsql

    * If `DATA_BACKEND` is set to `"mongodb"`:

        1.  Set `MONGO_URL` in `config.json`, e.g. `"mongodb://username:password@123.45.67.890:27017"`.

1.  Start the app using NPM or Yarn:

    * Using NPM:

            npm start

    * Using Yarn:

            yarn start

1.  View the app at [http://localhost:8080](http://localhost:8080).

1.  Stop the app by pressing `Ctrl+C`.

1.  Deploy the app:

        gcloud app deploy

1.  View the deployed app at [https://YOUR_PROJECT_ID.appspot.com](https://YOUR_PROJECT_ID.appspot.com).
