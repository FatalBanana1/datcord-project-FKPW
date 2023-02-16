from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from ..forms.theme_form import ThemeForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def user_theme(id):
    res = request.get_json()
    user = User.query.get(id)
    form = ThemeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if (user == None):
        return {"error": ["User does not exist"]}, 404
    if form.validate_on_submit():
        user.theme = res["theme"]
        db.session.commit()
        return user.to_dict()
