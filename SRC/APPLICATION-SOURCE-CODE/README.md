To run app:
export FLASK_APP=main.py
. venv/bin/activate
python -m flask run

If running locally: 
On a different terminal open the ssh tunnel (you will be asked for password, replace 'somer' with your username)
ssh -L 127.0.0.1:3306:mysqlsrv.cs.tau.ac.il:3306 somer@nova.cs.tau.ac.il -N


Link to postman collection:
https://www.getpostman.com/collections/dfe3d8a11fc7e88bd7ae

When done: 
deactivate
