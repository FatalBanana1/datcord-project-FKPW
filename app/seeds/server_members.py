from app.models import db, ServerMember, environment, SCHEMA
from datetime import datetime


def seed_server_members():
    member1 = ServerMember(
        user_id = 1,
        server_id = 1,
        nickname = "Sir Demolition",
        role = "admin"
    )

    member2 = ServerMember(
        user_id = 2,
        server_id = 1,
        nickname = "Legen-Dairy",
        role = "member"
    )

    member3 = ServerMember(
        user_id = 3,
        server_id = 1,
        nickname = "Pasture-ized",
        role = "member"
    )

    member4 = ServerMember(
        user_id = 4,
        server_id = 1,
        nickname = "Udder Chaos",
        role = "member"
    )

    member5 = ServerMember(
        user_id = 5,
        server_id = 1,
        nickname = "Lawn Moo-er",
        role = "pending"
    )

    db.session.add_all([member1, member2, member3, member4, member5])
    db.session.commit()


def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.server_members_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_members_table")

    db.session.commit()
