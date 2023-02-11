from flask import Blueprint
from flask_login import login_required
from .server_routes import server_routes
from app.models import Server

#  url_prefix="/api/sms

server_member_routes = Blueprint("server_members", __name__)

@server_routes.route("/<int:server_id>/members")
@login_required
def all_server_members(server_id):
    server = Server.query.get(server_id)
    members = [member.to_dict() for member in server.server_members]
    return {'server_members': members}
