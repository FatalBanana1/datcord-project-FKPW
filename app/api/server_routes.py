from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Server
from app.forms import ServerForm


#  url_prefix="/api/servers
server_routes = Blueprint("servers", __name__)

# /api/servers/:servers/channel

# GET ALL SERVERS
@server_routes.route("/")
@login_required
def servers():
    servers = Server.query.all()
    return {"servers": [server.to_dict() for server in servers]}

# GET SERVERS BY USER ID
@server_routes.route('/')
@login_required
def users_servers():
    servers = Server.query.filter(Server.server_members.any(id=current_user.id)).all()
    return {"servers": [server.to_dict() for server in servers]}


# CREATE SERVER
@server_routes.route("/", methods=['POST'])
@login_required
def create_server():
    form = ServerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        server = Server(
            name = form.data["name"],
            owner_id = int(current_user.id),
            icon_url = form.data["icon_url"],
            description = form.data["description"]
        )
        db.session.add(server)
        db.session.commit()
        return {"server": server.to_dict()}

# UPDATE SERVER
@server_routes.route("/<int:id>", methods=['PUT'])
@login_required
def update_server(id):
    pass

# DELETE SERVER
@server_routes.route("<int:id>", methods=['DELETE'])
@login_required
def delete_server(id):
    pass

# @server_routes.route("/<int:id>")
# @login_required
# def server(id):
#     data = Server.query.get(id)
#     return data.to_dict()
