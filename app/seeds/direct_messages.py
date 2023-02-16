from app.models import db, DirectMessage, environment, SCHEMA


def seed_users():
    d1 = DirectMessage(sender_id=3, friendship_id=1, message="Hello! How are you?")
    d2 = DirectMessage(sender_id=3, friendship_id=2, message="Hello! How are you?")
    d3 = DirectMessage(sender_id=3, friendship_id=3, message="Hello! How are you?")
    d4 = DirectMessage(sender_id=3, friendship_id=4, message="Hello! How are you?")

    db.session.add_all([d1, d2, d3, d4])
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.direct_messages_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM direct_messages_table")

    db.session.commit()
