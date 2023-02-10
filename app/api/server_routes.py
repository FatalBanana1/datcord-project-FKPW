from flask import Blueprint
from flask_login import login_required
from app.models import Server


#  url_prefix="/api/servers
server_routes = Blueprint("servers", __name__)

# /api/servers/:servers/channel

@server_routes.route("/")
@login_required
def servers():
    data = Server.query.all()
    return {"servers": [el.to_dict() for el in data]}


# @server_routes.route("/<int:id>")
# @login_required
# def server(id):
#     data = Server.query.get(id)
#     return data.to_dict()
