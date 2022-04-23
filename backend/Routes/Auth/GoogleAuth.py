import json

from flask import Flask, redirect, request, Blueprint, jsonify
import requests
from flask_login import current_user, login_user, logout_user, login_required, LoginManager
import Keys.dev as keys

from DB.User import User
from Keys.dev import GOOGLE_DISCOVERY_URL
from oauthlib.oauth2 import WebApplicationClient
from appinit import app

client = WebApplicationClient(keys.GOOGLE_CLIENT_ID)

login_manager = LoginManager()
login_manager.init_app(app)

GoogleRoutes = Blueprint('google-auth-routes', __name__)

def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()

def get_google_provider_cfg():
    return requests.get(keys.GOOGLE_DISCOVERY_URL).json()

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

@GoogleRoutes.route('/auth/login')
def login():
    print("test")
    google_provider_cfg = get_google_provider_cfg()
    authorization_endpoint = google_provider_cfg["authorization_endpoint"]

    request_uri = client.prepare_request_uri(
        authorization_endpoint, 
        redirect_uri=request.base_url + '/callback',
        scope=["openid", "email", "profile"]
    )
    return redirect(request_uri)

@GoogleRoutes.route("/auth/login/callback")
def callback():
    code = request.args.get("code")
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]

    token_url, head, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code
    )

    token_response = requests.post(
        token_url,
        headers=head,
        data=body,
        auth=(keys.GOOGLE_CLIENT_ID, keys.GOOGLE_CLIENT_SECRET)
    )

    client.parse_request_body_response(json.dumps(token_response.json()))

    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["given_name"]
    else:
        return "User email not available or not verified by Google.", 400

    user = User(
    id_=unique_id, name=users_name, email=users_email, profile_pic=picture
    )

    if User.get(unique_id)==None:
        User.create(unique_id, users_name, users_email, picture)

    login_user(user)
    print(current_user.is_authenticated)

    return redirect("/")

@GoogleRoutes.route("/auth/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")

@GoogleRoutes.route("/auth/current_user")
def get_user():
    if not current_user.is_authenticated:
        return json.dumps({})
    else:
        print("user:",current_user)
        return jsonify({
            'id': current_user.id,
            'name': current_user.name,
            'email': current_user.email,
            'profile_pic': current_user.profile_pic
        })
