TO RUN THE APP:
export FLASK_APP=main.py
. venv/bin/activate

If running locally: 
export SETTINGS=local_settings.cfg
On a different terminal open the ssh tunnel (you will be asked for password, replace 'somer' with your username)
ssh -L 127.0.0.1:3306:mysqlsrv.cs.tau.ac.il:3306 somer@nova.cs.tau.ac.il -N

Note!
we chose connection via ssh this way so as not to hardcode our university passwords anywhere. 
We are well aware there are alternatives where the ssh connection is done via python and chose this.

If on production:
export SETTINGS=production_settings.cfg

finally run:
python -m flask run

Link to postman collection:
https://www.getpostman.com/collections/dfe3d8a11fc7e88bd7ae




When done: 
deactivate
