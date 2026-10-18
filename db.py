import mysql.connector

def get_db_connection():
    connction=mysql.connector.connect(
        host='localhost',
        user='root',
        password='ADmin#123',
        database='job_tracker'
    )
    return connction
