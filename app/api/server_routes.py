from flask import Blueprint
from flask_login import login_required
from app.models import Server


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


# CREATE SERVER
@server_routes.route("/", methods=['POST'])
@login_required
def create_server():
    pass

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
