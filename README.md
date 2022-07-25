# AppKu&trade; Origami
AppKu&trade; Origami is a fork of the popular open-sourced, BSD-2 licenses version of [Redash](https://github.com/getredash/redash)
specifically crafted to fit within the suite of tools within the AppKu&trade; system and to implement standardization,
enhancements, and fixes.

## Origami vs. Redash
AppKu&trade; Origami is specifically tailored to fit within the AppKu&trade; ecosystem, and may contain specific enhancements and 
changes not found in Redash. Notably, areas such as visualizations, authentication, look & feel, and technical
implementation may vary slightly (or extremely). If you are seeking a stand-alone visualization system, we recommend
you stick with [Redash](https://github.com/getredash/redash).

- Origami utilizes `npm` instead of `yarn`.
- `REDASH_VERSION_CHECK` is `false`.
- `REDASH_DATE_FORMAT` is `M/D/YYYY`.
- `REDASH_TIME_FORMAT` is `h:mm a`.

### FOSS Commitment
AppKu&trade; Origami will continue to be free and open-source software, available under the BSD-2-clause license, and, when
possible, will contribute back to the [Redash](https://github.com/getredash/redash) project while it remains available.

## Contributor Setup
The following instructions are used for setting up Origami on Rocky Linux 8 (RHEL/CentOS) for development purposes. 
More information may be available on the original [Redash documentation page](https://redash.io/help/open-source/dev-guide/setup).

### Quick Setup: Database & Redis
If you just need to get up and running quickly and locally, you can spin up a local postgres & redis docker container using
the following command:s
```sh
docker run --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```
Your `REDASH_DATABASE_URL` (setting) would then need to be set to `postgresql://postgres:mysecretpassword@localhost/postgres`.

```sh
docker run --name redis -p 6379:6379 -d redis
```

### Local Setup

1. Make sure dependencies are installed and ensure you are running at least `node.js` LTS.
    ```sh
    sudo dnf install python3 python3-devel python3-pip postgresql python3-psycopg2 libffi-devel
    ```
2. Ensure `pip` is aliased to `pip3` and `python` to `python3`.
    ```sh
    sudo ln -s "$(which python3)" /usr/bin/python
    sudo ln -s "$(which pip3)" /usr/bin/pip
    ```
3. Install python packages.
    ```sh
    pip install -r requirements.txt -r requirements_dev.txt
    ```
4. Install `node` packages and build viz-lib.
   ```sh
   npm i
   npm run build
   ```
5. Create your default configuration. For local testing, create a `.env` file and populate with appropriate settings.
   *Example*
   ```sh
   REDASH_COOKIE_SECRET=mysupercookiesecret
   REDASH_DATABASE_URL=postgresql://postgres
   ```
   See more on the original [Redash documentation page](https://redash.io/help/open-source/admin-guide/env-vars-settings).
6. Setup the database (requires postgres configured properly in last step).
   ```sh
   bin/run ./manage.py database create-tables
   ```
7. Add remote redash repository.
   ```sh
   git remote add redash git@github.com:getredash/redash.git
   ```

### Aligning with Redash FOSS
Origami tracks Redash `master` branch in the origami `redash` branch. To get the lastest, you can checkout the branch
and then pull from remote `master` into `redash`. From there you can merge changes as appropriate.
```sh
git checkout redash
git pull redash master:redash
```

### Running
To run Origami locally, you'll need to run multiple components at once. Be sure you have completed all the steps from
setup above before running.

*Ensure* your postgres and redis servers are up and running.

1. Start the webserver:
   ```sh
   bin/run ./manage.py runserver --debugger --reload
   ```
2. Start the worker:
   ```sh
   bin/run ./manage.py rq worker
   ```
3. Start the scheduler:
   ```sh
   bin/run ./manage.py rq scheduler
   ```
4. Start the webserver and watch for changes:
   ```sh
   npm run watch
   ```
5. Open your browser to the webpack dev server at [http://localhost:8080](http://localhost:8080).
   *Note* if there are style issues immediately, try running `npm run build` to generate files, or
   run `npx webpack-dev-server` directly without watching.