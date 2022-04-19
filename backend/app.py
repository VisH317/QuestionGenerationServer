import os
from flask import Flask
from DB.dbinit import init_db
from flask_login import LoginManager, current_user
from oauthlib.oauth2 import WebApplicationClient
import Keys.dev as keys
from appinit import app

if os.environ["ENV"]=="dev":
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# routes
#import Routes.routes as otherRoutes
from Routes.Auth.GoogleAuth import GoogleRoutes


app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
)

app.config['UPLOAD_FOLDER'] = 'static/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

with app.app_context():
    init_db()

#app.register_blueprints(otherRoutes.Routes)
app.register_blueprint(GoogleRoutes)

@app.route("/")
def index():
    if current_user.is_authenticated:
        return (
            "<p>Hello, {}! You're logged in! Email: {}</p>"
            "<div><p>Google Profile Picture:</p>"
            '<img src="{}" alt="Google profile pic"></img></div>'
            '<a class="button" href="/logout">Logout</a>'.format(
                current_user.name, current_user.email, current_user.profile_pic
            )
        )
    else:
        return '<a class="button" href="/login">Google Login</a>'

if __name__=='__main__':
    app.debug=True
    app.run()
