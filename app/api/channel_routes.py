from flask import Blueprint
from flask_login import login_required
from .server_routes import server_routes
from app.models import Server

#  url_prefix="/api/channels
channel_routes = Blueprint("channels", __name__)


# TODO: fix route - only as example
# /api/servers/:servers/channel
@server_routes.route("/channel")
@login_required
def create_channel():
    # data = Server.query.all()
    # return {"servers": [el.to_dict() for el in data]}
    pass
