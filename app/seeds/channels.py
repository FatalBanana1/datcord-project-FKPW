from app.models import db, Channel, environment, SCHEMA


def seed_channels():
    channel1 = Channel(
        name="help-desk", server_id=1, category="9/26 Cohort", is_private=False
    )

    channel2 = Channel(
        name="lionel messi", server_id=2, category="GOATS", is_private=False
    )

    channel3 = Channel(
        name="christiano ronaldo", server_id=2, category="GOATS", is_private=False
    )

    channel4 = Channel(name="banana's", server_id=3, category="Main", is_private=False)

    channel5 = Channel(
        name="cat pics", server_id=4, category="Cat Media", is_private=False
    )

    channel6 = Channel(
        name="deals", server_id=4, category="Cat Shopping", is_private=False
    )

    channel7 = Channel(
        name="boba shops", server_id=5, category="Recommendations", is_private=False
    )

    channel8 = Channel(name="general", server_id=1, category="Main", is_private=False)

    channel9 = Channel(name="general", server_id=2, category="Main", is_private=False)

    channel10 = Channel(name="general", server_id=3, category="Main", is_private=False)

    channel11 = Channel(name="general", server_id=4, category="Main", is_private=False)

    channel12 = Channel(name="general", server_id=5, category="Main", is_private=False)

    c13 = Channel(name="general", server_id=8, category="Main", is_private=False)

    c14 = Channel(
        name="threat-level-midnight",
        server_id=8,
        category="super-serial",
        is_private=False,
    )

    c15 = Channel(name="__mifflin", server_id=8, category="Main", is_private=False)

    c16 = Channel(
        name="Star Wars",
        server_id=2,
        category="Main",
        is_private=False,
    )

    db.session.add_all(
        [
            channel1,
            channel2,
            channel3,
            channel4,
            channel5,
            channel6,
            channel7,
            channel8,
            channel9,
            channel10,
            channel11,
            channel12,
            c13,
            c14,
            c15,
            c16
        ]
    )
    db.session.commit()


def undo_channels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channels_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM channels_table")

    db.session.commit()
