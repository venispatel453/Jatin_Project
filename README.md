# Setup Guide

Follow below steps for setting up the application and using Customer Success Portal:

## Local Setup ##

* Clone the repository in your local by using below command

```
git clone  https://github.com/Jatin-11022002/Promact_Customer_Success.git
```

## Backend Setup ##

* Step 1: Navigate to **Backend** folder by using below command in terminal (Assuming to be currently in root folder):

```
cd Backend
```

* Step 2: Now run below command for installing dependencies required by application:
  
```
npm install
```

* Step 3: In Backend folder you will find one file named as **.env.sample**, rename the file to **.env**. This step is necessary as all important URL and API key used by the application are stored in this file. You can also use your own values in the file for altering the behaviour of application.

* Step 4: run below command to start the backend server:

```
node server.js
```

Now you should be getting **server started** and **db started** message in console, denoting that backend server and database are connected and running successfully.

## Frontend Setup ##

* Step 1: Now open another terminal and use below command to navigate to Frontend folder (Assuming to be currently in root folder):

```
cd Frontend
```

* Step 2: Now run below command for installing dependencies required by application:

```
npm install
```


* Step 3: In Frontend folder you will find one file named as **.env.sample**, rename the file to **.env**. This step is necessary as all important URL and API key used by the application are stored in this file. You can also use your own values in the file for altering the behaviour of application.

* Step 4: run below command to start the frontend server:

```
npm start
```

You will be able to see the url on console, denoting that React server is running successfully. Navigate to that url in your browser

Now you will be able to use the application.
