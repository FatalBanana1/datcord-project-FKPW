from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .server_members import seed_server_members, undo_server_members
from .channel_messages import seed_channel_messages, undo_channel_messages
from .friendships import seed_friendships, undo_friendships
from .direct_messages import seed_direct_messages, undo_direct_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_direct_messages()
        # undo_friendships()
        undo_channel_messages()
        undo_server_members()
        undo_channels()
        undo_servers()
        undo_users()
    # Add other seed functions here
    seed_users()
    seed_servers()
    seed_channels()
    seed_server_members()
    seed_channel_messages()
    seed_friendships()
    seed_direct_messages()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    # Add other undo functions here
    undo_direct_messages()
    undo_friendships()
    undo_channel_messages()
    undo_server_members()
    undo_channels()
    undo_servers()
    undo_users()
