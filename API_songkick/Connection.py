
import MySQLdb as mdb

con = mdb.connect("mysqlsrv.cs.tau.ac.il", "DbMysql03", "DbMysql03", "DbMysql03")

with con:
    cor = con.cursor()
    cor.execute("SHOW TABLES")
    for table in cor:
        print table

con.close()

