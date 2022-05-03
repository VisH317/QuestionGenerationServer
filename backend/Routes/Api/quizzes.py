from flask import redirect, request, Blueprint, jsonify
from DB.Quiz import Quiz

QuizRoutes = Blueprint('quiz-routes', __name__)

@QuizRoutes.route('/api/quiz', methods=['GET', 'POST'])
def getQuizzes():
    if(request.method=='GET'):
        userRef = request.args.get('userref')
        res = Quiz.get(userRef)
        return res
    if(request.method=='POST'):
        req = request.json
        Quiz.create(req.userRef, req.prompt, req.question)

