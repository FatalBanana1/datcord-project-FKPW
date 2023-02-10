from flask import Blueprint
from flask_login import login_required
from .server_routes import server_routes
from app.models import Server

#  url_prefix="/api/sms

server_member_routes = Blueprint("server_members", __name__)
