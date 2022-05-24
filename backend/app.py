import os
from flask import Flask
from DB.dbinit import init_db
from flask_login import LoginManager, current_user
from oauthlib.oauth2 import WebApplicationClient
import Keys.dev as keys
import logging
from appinit import app
#from Routes import routes

if os.environ["ENV"]=="dev":
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1' 
    logging.basicConfig(level=logging.DEBUG)

# routes
#import Routes.routes as otherRoutes
from Routes.Auth.GoogleAuth import GoogleRoutes
from Routes.Api.quizzes import QuizRoutes

app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
)

app.config['UPLOAD_FOLDER'] = 'static/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

with app.app_context():
    init_db()

#app.register_blueprint(routes.Routes)
app.register_blueprint(GoogleRoutes)
app.register_blueprint(QuizRoutes)

# test routes
@app.route('/auth/test')
def test():
    return("hola como estas")

if __name__=='__main__':
    app.debug=True
    app.run()
