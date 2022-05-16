from asyncio import QueueEmpty

from flask import jsonify
from DB.dbinit import get_db

class Quiz():
    def __init__(self, userRef, prompt, question):
        self.userRef = userRef
        self.prompt = prompt
        self.question = question
    
    @staticmethod
    def get(userRef):
        conn = get_db()
        query = f"SELECT * FROM quizzes WHERE userRef = CAST({userRef} AS varchar)"
        cur = conn.cursor()
        cur.execute(query)
        quizzes = cur.fetchall()
        if len(quizzes)==0:
            return jsonify({})
        
        res = []
        for quiz in quizzes:
            res.append({"userRef": quiz[0], "prompt": quiz[1], "question": quiz[2]})

        cur.close()
        conn.close()
        return res
    
    @staticmethod
    def create(userRef, prompt, question):
        conn = get_db()
        cur = conn.cursor()
        query = f"""INSERT INTO quizzes (userRef, prompt, question)
                VALUES(CAST({userRef} AS varchar), {prompt}, {question})"""
        cur.execute(query)
        conn.commit()
        cur.close()
        conn.close()
