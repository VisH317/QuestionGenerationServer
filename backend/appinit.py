from flask import Flask

app = Flask(__name__, instance_relative_config=True, static_url_path="", static_folder="../react-flask-app/build")