from flask import Blueprint, request
from flask_login import login_required, current_user
from .server_routes import server_routes
from app.models import db, Server, ServerMember

server_member_routes = Blueprint("server_members", __name__)


# GET SERVER MEMBERS
@server_routes.route("/<int:server_id>/members")
@login_required
def all_server_members(server_id):
    server = Server.query.get(server_id)
    if (not server):
        return {"errors": ["Server does not exist"]}, 404

    members = [member.to_dict() for member in server.server_members]
    if (len(members) > 0):
        return {'server_members': members}
    else:
        return {"server_members": 'No current members in this server'}


# ADD SERVER MEMBER
@server_routes.route("/<int:server_id>/members", methods=['POST'])
@login_required
def add_server_member(server_id):
    userId = int(current_user.id)
    server = Server.query.get(server_id)
    role = request.json['role']
    if (not server):
        return {"errors": ["Server does not exist"]}, 404

    memberIds = [member.user_id for member in server.server_members]
    if userId in memberIds:
        return {"errors": ["This user is already in the server"]}, 403
    else:
        new_user = ServerMember(
            user_id=userId,
            server_id=server_id,
            nickname = current_user.username,
            role = role
            )
        db.session.add(new_user)
        db.session.commit()
        return {'server_member': new_user.to_dict()}


# EDIT SERVER MEMBER
@server_routes.route("/<int:server_id>/membership/<int:member_id>", methods=['PUT'])
@login_required
def edit_server_member(server_id, member_id):
    nickname = request.json['nickname']
    role = request.json['role']
    userId = int(current_user.id)
    server = Server.query.get(server_id)
    membership = ServerMember.query.get(member_id)
    if (membership == None):
        return {"errors": ["Membership does not exist"]}, 404

    if ( not server):
        return {"errors": ["Server does not exist"]}, 404

    if membership not in server.server_members:
        return {"errors": ["This membership doesn't belong to this server"]}, 403

    if userId != server.owner_id and userId != membership.user_id:
        return {"errors": ["User doesn't have the required permissions"]}, 403

    else:
        membership.nickname = nickname
        membership.role = role
        db.session.commit()
        return {"server_member": membership.to_dict()}


# DELETE MEMBER
@server_routes.route("/<int:server_id>/membership/<int:member_id>", methods=['DELETE'])
@login_required
def delete_server_member(server_id, member_id):
    userId = int(current_user.id)
    server = Server.query.get(server_id)
    membership = ServerMember.query.get(member_id)
    permission = request.json['permission']
    if (membership == None):
        return {"errors": ["Membership does not exist"]}, 404
    if (not server):
        return {"errors": ["Server does not exist"]}, 404
    if membership not in server.server_members:
        return {"errors": ["This membership doesn't belong to this server"]}, 403
    if permission == False:
        return {"errors": ["User doesn't have the required permissions"]}, 403
    else:
        db.session.delete(membership)
        db.session.commit()
        return {"server_member": membership.to_dict()}
