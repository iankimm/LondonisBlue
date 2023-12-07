# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
=======
# Choose Your Branch!

This repo contains different versions of the starter code for **aa19-python-group-project**,
with each version stored in a program-specific branch. To download or clone the
correct branch, choose a method (`tiged`, zip, or clone) and follow the
instructions for your specific program.

* [`tiged`](#tiged-the-branch)
* [Zip](#download-the-branch-as-a-zip)
* [Clone](#clone-the-branch)

## `tiged` the branch

This is the most straightforward way to clone the project into a folder named
**aa19-python-group-project**. In the directory where you want the project to appear, simply
run the following command for your program and preferred authentication method:

### Online Full-Time

To authenticate with a Personal Access Token over HTTPS, run

```sh
npx tiged https://github.com/appacademy/aa19-python-group-project#full-time aa19-python-group-project
```

To authenticate with SSH, run

```sh
npx tiged appacademy/aa19-python-group-project#full-time aa19-python-group-project
```

### Online Part-Time

To authenticate with a Personal Access Token over HTTPS, run

```sh
npx tiged https://github.com/appacademy/aa19-python-group-project#part-time aa19-python-group-project
```

To authenticate with SSH, run

```sh
npx tiged appacademy/aa19-python-group-project#part-time aa19-python-group-project
```

-----

> **Note:** The first time you run `npx tiged`, you will likely be asked if you
> want to install `tiged`. Go ahead and install it.

Unless you cloned the project into an already existing local git repo, run

```sh
cd aa19-python-group-project && git init
```

to initialize the project as a git repository that you can connect to a remote
repo in your personal GitHub account.

## Download the branch as a .zip

**READ THESE INSTRUCTIONS FULLY BEFORE IMPLEMENTING THEM AS YOU WILL LOSE ACCESS
TO THIS PAGE ONCE YOU SWITCH TO YOUR PROGRAM BRANCH.**

If you want to download your branch as a __.zip__ file, click on the branch
button to the upper-left of the file list above--the button should currently
read "main"--and select your program from the resulting dropdown menu. This will
take you to your program's branch. Once there, click the green "Code" button and
select "Download ZIP" from the bottom of the menu. Move the __.zip__ to your
desired location and unzip!

Unless you unzipped the project in an already existing local git repo, run

```sh
cd aa19-python-group-project && git init
```

to initialize the project as a git repository that you can connect to a remote
repo in your personal GitHub account.

(To return to this page in your browser, simply select the "main" branch again.)

## Clone the branch

To clone the branch, open a terminal and cd into the directory where you want
the repo to go. Then run the command specified below for your program and
preferred authentication method:

### Online Full-Time

To authenticate with a Personal Access Token over HTTPS, run

```sh
git clone --branch full-time --single-branch https://github.com/appacademy/aa19-python-group-project.git
```

To authenticate with SSH, run

```sh
git clone --branch full-time --single-branch git@github.com:appacademy/aa19-python-group-project.git
```

### Online Part-Time

To authenticate with a Personal Access Token over HTTPS, run

```sh
git clone --branch part-time --single-branch https://github.com/appacademy/aa19-python-group-project.git
```

To authenticate with SSH, run

```sh
git clone --branch part-time --single-branch git@github.com:appacademy/aa19-python-group-project.git
```

When you clone a repo, the cloned repo's remote `origin` will still point to the
original repo.

To reassign the clone to your personal GitHub account (so you can `push` and
`pull` changes), create a remote `aa19-python-group-project` repo at `https://github.com`.
Then, back in your local terminal, `cd` into the cloned repo and run the
following commands to link the cloned repo to your newly created remote and push
up the current code (replace <YOUR-GH-USERNAME> with your actual GitHub username):

```sh
git remote set-url origin https://github.com/<YOUR-GH-USERNAME>/aa19-python-group-project
git push -u origin
```

 > **Note:** The first command differs from the command GitHub tells you to use
 > to connect an existing repo: you should run `git remote set-url` (as above)
 > rather than `git remote add` (as GitHub recommends).

 If you instead clone the project into a folder already initialized as a local
 git repo, you just need to remove the clone's remote connection to the original
 repo. `cd` into the cloned repo and run

 ```sh
 rm -rf .git
 ```

**WARNING:** `rm -rf` is a dangerous command that will delete the specified
directory--here, __.git__--and all of the directory's subfolders without any
verification. **Make sure you are in the cloned repo when you run this
command.**
