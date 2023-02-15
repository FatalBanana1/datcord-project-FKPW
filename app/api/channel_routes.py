from flask import Blueprint, request
from flask_login import login_required, current_user
from .server_routes import server_routes
from app.models import Server, Channel, db, ServerMember
from ..forms.channel_form import ChannelForm

#  url_prefix="/api/channels
channel_routes = Blueprint("channels", __name__)


# get all channels
@server_routes.route("/<int:serverId>/channels")
@login_required
def get_all_channels(serverId):
    server = Server.query.get(serverId)
    print("server:", server)

    if server == None:
        return {"error": ["Server does not exist"]}, 404

    channels = [channel.to_dict() for channel in server.channels]

    if len(channels) == 0:
        return {"channels": "Server has no channels"}, 200

    return {"channels": channels, "server": server.to_dict()}, 200


# get channel members
# if role != pending, then can view private
@server_routes.route("/<int:server_id>/channels/<int:channel_id>/members")
@login_required
def get_channel_members(server_id, channel_id):
    server = Server.query.get(server_id)
    # channel = Channel.query.get(channel_id)
    channel = Channel.query.filter(
        Channel.server_id == server_id, Channel.id == channel_id
    ).first()

    if channel == None:
        return {"error": ["Channel does not exist"]}, 404

    channel_members = [
        member.to_dict()
        for member in channel.server.server_members
        if member.role != "pending"
    ]

    if len(channel_members) == 0:
        return {"error": ["Channel has no members"]}, 200

    return {"channel_members": channel_members}, 200

    # if (server):
    #     if (channel):
    #         if (channel.server_id == serverId):
    #             channel_members = [ member.to_dict() for member in server.server_members if member.role != "pending" ]
    #             print("channel_members:", channel_members)

    #             if (len(channel_members) > 0):
    #                 return { "channel_members": channel_members }, 200
    #             else:
    #                 return { "error": ["Channel has no members"] }, 400
    #         else:
    #             return { "error": ["Channel does not belong to this server"] }
    #     else:
    #         return { "error": ["Channel does not exist"] }, 404
    # else:
    #     return { "error": ["Server does not exist"] }, 404


# create a channel
@server_routes.route("/<int:serverId>/channels", methods=["POST"])
@login_required
def create_channel(serverId):
    # check if user_id != server.owner_id
    user_id = int(current_user.id)
    res = request.get_json()
    server = Server.query.get(serverId)
    # print("res =====", res)

    form = ChannelForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if server == None:
        return {"error": ["Server does not exist"]}, 404
    role = res["role"]
    # if user_id != server.owner_id:
    if role == "pending" and role == "member":
        return {"error": ["You do not have permission to create a channel"]}, 403

    if form.validate_on_submit():
        if not res.get("category"):
            channel = Channel(
                name=res["name"],
                server_id=serverId,
                category="Main",
                is_private=res["is_private"],
            )

            db.session.add(channel)
            db.session.commit()
            return {"channel": channel.to_dict()}, 201
        else:
            channel = Channel(
                name=res["name"],
                server_id=serverId,
                category=res["category"],
                is_private=res["is_private"],
            )
            db.session.add(channel)
            db.session.commit()
            return {"channel": channel.to_dict()}, 201
    else:
        return form.errors


# make sure only server owner/admin can edit
# EDIT CHANNEL /api/servers/:serverId/channels/channelId
@server_routes.route("/<int:serverId>/channels/<int:channel_id>", methods=["PUT"])
@login_required
def edit_channel(serverId, channel_id):
    user = current_user
    channel = Channel.query.filter(
        Channel.server_id == serverId, Channel.id == channel_id
    ).first()
    print("### CHANNEL:", channel)

    res = request.get_json()
    form = ChannelForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if user == None:
        return {"error": ["User does not exist"]}, 404

    if channel == None:
        return {"error": ["Channel does not exist in this server"]}, 404

    user_memberships = user.server_memberships

    if len(user_memberships) == 0:
        return {"error": ["User did not join any servers"]}

    server_ids = [membership.server.id for membership in user_memberships]

    if serverId not in server_ids:
        return {"error": ["User is not part of this server"]}

    # server_role = [
    #     membership.role
    #     for membership in user_memberships
    #     if membership.server_id == serverId
    # ]
    # if user.id != channel.server.owner_id or server_role != "admin":
    #     return {"error": ["You do not have permission to edit this channel"]}

    if form.validate_on_submit():
        channel.name = res["name"]
        channel.category = res["category"]
        channel.is_private = res["is_private"]
        db.session.commit()
        return {"channel": channel.to_dict()}, 200

    return form.errors


# make sure only server owner/admin can edit
@server_routes.route("/<int:server_id>/channels/<int:channel_id>", methods=["DELETE"])
@login_required
def delete_channel(server_id, channel_id):
    user = current_user
    channel = Channel.query.filter(
        Channel.server_id == server_id, Channel.id == channel_id
    ).first()

    if user == None:
        return {"error": ["User does not exist"]}, 404

    if channel == None:
        return {"error": ["Channel does not exist in this server"]}, 404

    user_memberships = user.server_memberships

    if len(user_memberships) == 0:
        return {"error": ["User did not join any servers"]}

    server_ids = [membership.server.id for membership in user_memberships]

    if server_id not in server_ids:
        return {"error": ["User is not part of this server"]}

    server_role = [
        membership.role
        for membership in user_memberships
        if membership.server_id == server_id
    ]

    if user.id != channel.server.owner_id and server_role != "admin":
        return {"error": ["You do not have permission to delete this channel"]}

    db.session.delete(channel)
    db.session.commit()

    return {"Channel": "Successfully deleted"}


# TODO: fix route - only as example
# /api/servers/:servers/channel
# @server_routes.route("/channel")
# @login_required
# def create_channel():
#     # data = Server.query.all()
#     # return {"servers": [el.to_dict() for el in data]}
#     pass
