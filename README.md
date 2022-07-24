# AppKu/Origami
AppKu/Origami is a fork of the popular open-sourced, BSD-2 licenses version of [Redash](https://github.com/getredash/redash)
specifically crafted to fit within the suite of tools within the AppKu system and to implement standardization,
enhancements, and fixes.

## Differences
AppKu/Origami is specifically tailored to fit within the AppKu ecosystem, and may contain specific enhancements and 
changes not found in Redash. Notably, areas such as visualizations, authentication, look & feel, and technical
implementation may vary slightly (or extremely). If you are seeking a stand-alone visualization system, we recommend
you stick with [Redash](https://github.com/getredash/redash).

- AppKu/Origami utilizes `npm` instead of `yarn`.

### FOSS Commitment
AppKu/Origami will continue to be free and open-source software, available under the BSD-2-clause license, and, when
possible, will contribute back to the [Redash](https://github.com/getredash/redash) project while it remains available.

## Constributor Setup
The following instructions are used for setting up Origami on Rocky Linux 8 (RHEL/CentOS) for development purposes. 
More information may be available on the original [Redash documentation page](https://redash.io/help/open-source/dev-guide/setup).

1. Make sure dependencies are installed and ensure you are running at least `node.js` LTS.
    ```sh
    sudo dnf install python3 python3-devel python3-pip postgresql python3-psycopg2 libffi-devel
    ```
2. Ensure `pip` is aliased to `pip3`.
    ```sh
    alias pip=pip3 >> ~/.bash_aliases
    ```
3. Install python packages.
    ```sh
    pip install -r requirements.txt -r requirements_dev.txt
    ```
4. Install `node` packages and build viz-lib.
   ```sh
   npm i
   ```
5. Create your default configuration.
6. Setup the database.
   ```sh
   ./manage.py database create_tables
   ```
