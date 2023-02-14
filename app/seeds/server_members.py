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
    m14 = ServerMember(
        user_id = 1,
        server_id = 8,
        nickname = "Sir Demo",
        role = "member"
    )
    m15 = ServerMember(
        user_id = 2,
        server_id = 8,
        nickname = "Fatality",
        role = "member"
    )
    m16 = ServerMember(
        user_id = 3,
        server_id = 8,
        nickname = "FDA",
        role = "member"
    )
    m17 = ServerMember(
        user_id = 4,
        server_id = 8,
        nickname = "SadPanda",
        role = "member"
    )
    m18 = ServerMember(
        user_id = 5,
        server_id = 8,
        nickname = "K",
        role = "member"
    )
    m19 = ServerMember(
        user_id = 6,
        server_id = 8,
        nickname = "Jimothy",
        role = "member"
    )
    m20 = ServerMember(
        user_id = 7,
        server_id = 8,
        nickname = "Dwigt",
        role = "admin"
    )
    m21 = ServerMember(
        user_id = 8,
        server_id = 8,
        nickname = "thefireguy",
        role = "member"
    )
    m22 = ServerMember(
        user_id = 9,
        server_id = 8,
        nickname = "AgentScarn",
        role = "owner"
    )



    db.session.add_all([member1, member2, member3, member4, member5, member6, member7, member8, member9, member10, member11, member12, member13, m14, m15, m16, m17, m18, m19, m20, m21, m22])
    db.session.commit()


def undo_server_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.server_members_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM server_members_table")

    db.session.commit()
