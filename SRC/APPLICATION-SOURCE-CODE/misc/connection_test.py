from flask import Flask,jsonify,json
from logging.config import dictConfig
# from flaskext.mysql import MySQL
import pymysql
import sshtunnel
app = Flask(__name__)

with sshtunnel.SSHTunnelForwarder(
        (_host, _ssh_port),
        ssh_username="somer",
        ssh_password="123Pi123",
        remote_bind_address=("nova.cs.tau.ac.il", _remote_mysql_port),
        local_bind_address=(_local_bind_address, _local_mysql_port)
) as tunnel:
    connection = mysql.connector.connect(
        user=_db_user,
        password=_db_password,
        host=_local_bind_address,
        database=_db_name,
        port=_local_mysql_port)
