import sys
import flask
from flask import redirect, request, Blueprint, jsonify
from DB.Quiz import Quiz

QuizRoutes = Blueprint('quiz-routes', __name__)

@QuizRoutes.route('/api/quiz', methods=['GET'])
def getQuizzes():
    userRef = request.args.get('userref')
    print("userRef", userRef)
    quizzes = Quiz.get(userRef)
    print('res', quizzes, file=sys.stdout)
    return quizzes


@QuizRoutes.route('/api/quiz/new', methods=['POST'])
def createQuiz():
    print("hola")
    req = request.json
    print(req)
    Quiz.create(req['userRef'], req['prompt'], req['question'])

