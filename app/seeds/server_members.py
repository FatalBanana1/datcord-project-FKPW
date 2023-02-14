from app.models import db, ServerMember, environment, SCHEMA


def seed_server_members():
    member1 = ServerMember(
        user_id = 1,
        server_id = 1,
        nickname = "Sir Demolition",
        role = "owner"
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
        nickname = "Dragon-Lord",
        role = "admin"
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

    member6 = ServerMember(
        user_id = 3,
        server_id = 2,
        nickname = "Dhaaaaf",
        role = "owner"
    )

    member7 = ServerMember(
        user_id = 2,
        server_id = 3,
        nickname = "FatalBanana",
        role = "owner"
    )

    member8 = ServerMember(
        user_id = 4,
        server_id = 4,
        nickname = "Meow Meow",
        role = "owner"
    )

    member9 = ServerMember(
        user_id = 5,
        server_id = 5,
        nickname = "Boba",
        role = "owner"
    )

    member10 = ServerMember(
        user_id = 1,
        server_id = 7,
        nickname = "Demo",
        role = "owner"
    )

    member11 = ServerMember(
        user_id = 1,
        server_id = 2,
        nickname = "Demo King",
        role = "member"
    )

    member12 = ServerMember(
        user_id = 2,
        server_id = 2,
        nickname = "Fatal",
        role = "member"
    )

    member13 = ServerMember(
        user_id = 1,
        server_id = 6,
        nickname = "Demo",
        role = "owner"
    )



    db.session.add_all([member1, member2, member3, member4, member5, member6, member7, member8, member9, member10, member11, member12, member13])
    db.session.commit()


def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.server_members_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_members_table")

    db.session.commit()
