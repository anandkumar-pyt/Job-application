from db import get_db_connection

try:
    connection=get_db_connection()
    print("Connection successfully")
    connection.close()
    print("Connection close")
except Exception as error:
    print("Database not connected",error)