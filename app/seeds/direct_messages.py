from app.models import db, DirectMessage, environment, SCHEMA


def seed_direct_messages():
    d1 = DirectMessage(
        sender_id=3, friend_id=1, message="Hello! How are you doing?"
    )
    d2 = DirectMessage(
        sender_id=3, friend_id=2, message="Hello! How are you doing?"
    )
    d3 = DirectMessage(
        sender_id=3, friend_id=4, message="Hello! How are you doing?"
    )
    d4 = DirectMessage(
        sender_id=3, friend_id=5, message="Hello! How are you doing?"
    )

    db.session.add_all([d1, d2, d3, d4])
    db.session.commit()


def undo_direct_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.direct_messages_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM direct_messages_table")

    db.session.commit()
