from flask import Flask, render_template,request, url_for, redirect, jsonify
from db import get_db_connection


app = Flask(__name__)


@app.route("/home")
def home():
    search=request.args.get("search", "").strip()
    connection=get_db_connection()
    cursor=connection.cursor(dictionary=True)

    cursor.execute(""" SELECT COUNT(*) AS total FROM jobs""")
    total=cursor.fetchone()["total"]
    cursor.execute(""" SELECT COUNT(*) AS total FROM jobs WHERE status='Applied'""")
    applied=cursor.fetchone()["total"]
    cursor.execute(""" SELECT COUNT(*) AS total FROM jobs WHERE status='Interview'""")
    Interview=cursor.fetchone()["total"]
    cursor.execute(""" SELECT COUNT(*) AS total FROM jobs WHERE status='Selected'""")
    selected=cursor.fetchone()["total"]
    cursor.execute(""" SELECT COUNT(*) AS total FROM jobs WHERE status='Rejected'""")
    rejected=cursor.fetchone()["total"]
    print(rejected)
    if search:
        query=""" SELECT * FROM jobs
        WHERE company LIKE %s OR role LIKE %s
        ORDER BY id DESC """
        keyword=f"%{search}%"
        cursor.execute(query,(keyword, keyword))
    else:
        cursor.execute("SELECT * FROM jobs ORDER BY id DESC")
    jobs = cursor.fetchall()

    cursor.close()
    connection.close()

    return render_template('Dashboard.html', jobs=jobs,search=search,total=total,Applied=applied,Interview=Interview,Selected=selected,Rejected=rejected)
    # return jsonify(jobs)

@app.route("/job-stats")
def job_stats():
    connection=get_db_connection()
    cursor=connection.cursor(dictionary=True)
    
    statuses=['Applied', 'Interview', 'Selected', 'Rejected']
    result={}
    for status in statuses:
        cursor.execute("""SELECT COUNT(*) AS total FROM jobs WHERE status=%s""",(status,))
        result[status]=cursor.fetchone()["total"]
    print(result)
    cursor.close()
    connection.close()
    return jsonify(result)

# Add Job

@app.route("/addjob", methods=['GET','POST'])
def add_job():
    if request.method=="POST":
        connection=get_db_connection()
        cursor=connection.cursor()
        company=request.form["company"]
        role=request.form["role"]
        status=request.form["status"]
        location=request.form["location"]
        query="INSERT INTO jobs (company,role,location,status) VALUES(%s,%s,%s,%s)"
        cursor.execute(query,(company,role,location,status))
        connection.commit()
        cursor.close()
        connection.close()
        return redirect(url_for('home'))
    return render_template('add_job.html')


# Get all jobs
@app.route('/api/jobs')
def get_job():
    status=request.args.get("status","jobs").strip()
    connection=get_db_connection()
    cursor=connection.cursor(dictionary=True)
    if status and status != 'jobs':
        cursor.execute(""" SELECT * FROM jobs WHERE status=%s 
        ORDER BY id DESC""", (status,))
    else :
        cursor.execute("SELECT * FROM jobs ORDER BY id DESC")
    jobs=cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(jobs)


# Edit Job
@app.route('/editjob/<int:job_id>', methods=['GET', 'POST'])
def edit_job(job_id):
    connection=get_db_connection()
    cursor=connection.cursor(dictionary=True)


    if request.method=='POST':
        print("FORM DATA:", request.form)
        company=request.form['company']
        role=request.form['role']
        location=request.form['location']
        status=request.form['status']

        query='UPDATE jobs SET company = %s, role = %s, location=%s, status=%s WHERE id=%s'
        cursor.execute(query,(company,role,location,status,job_id))
        connection.commit()
        cursor.close()
        connection.close()
        return redirect(url_for('home'))
    cursor.execute('SELECT * FROM jobs WHERE id=%s',(job_id,))
    job=cursor.fetchone()
    cursor.close()
    connection.close()
    if job is None:
        return "Job application Not Found"
    return render_template('edit_job.html',job=job)

#  Delete job 
@app.route('/deletejob/<int:job_id>', methods=['POST'])   
def delete_job(job_id):
    connection=get_db_connection()
    cursor=connection.cursor()
    query='DELETE FROM jobs WHERE id=%s'
    cursor.execute(query,(job_id,))
    connection.commit()
    cursor.close()
    connection.close()
    return redirect(url_for('home'))



#  Dashboard route
@app.route('/')
def getindex():
    return render_template('index.html')

if __name__ == "__main__" :
    app.run(debug=True)

