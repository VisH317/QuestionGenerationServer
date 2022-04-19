import psycopg2
from .dbconfig import config
from flask import current_app, Blueprint

def get_db():
    params = config()
    conn = psycopg2.connect(**params)
    return conn

def init_db():
    try:
        params = config()

        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        with current_app.open_resource("DB/Schemas/GoogleSchema.sql") as f:
            cur.execute(f.read().decode("utf8"))
        conn.commit()
        cur.close()
        conn.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

# def print_db_details():

#     print("PostgreSQL database version:")
#     cur.execute("SELECT version()")

#     db_version = cur.fetchone()
#     print(db_version)
#     cur.close()

# if __name__=='__main__':
#     conn = get_db()
#     print_db_details(conn)
#     close_db(conn)