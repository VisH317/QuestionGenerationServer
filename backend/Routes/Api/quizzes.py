import flask
from flask import redirect, request, Blueprint, jsonify
from DB.Quiz import Quiz

QuizRoutes = Blueprint('quiz-routes', __name__)

@QuizRoutes.route('/api/quiz', methods=['GET'])
def getQuizzes():
    userRef = request.args.get('userref')
    res = Quiz.get(userRef)
    return res


@QuizRoutes.route('/api/quiz/new', methods=['POST'])
def createQuiz():
    req = request.json
    Quiz.create(req.userRef, req.prompt, req.question)

