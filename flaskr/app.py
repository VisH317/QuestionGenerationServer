import os
from flask import Flask
from routes import Routes

app = Flask(__name__, instance_relative_config=True, static_url_path="", static_folder="../react-flask-app/build")
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite')
)

app.config['UPLOAD_FOLDER'] = 'static/'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

app.register_blueprint(Routes)

# if test_config is None:
#     app.config.from_pyfile('config.py', silent=True)
# else:
#     app.config.from_mapping(test_config)

# try:
#     os.makedirs(app.instance_path)
# except OSError:
#     pass