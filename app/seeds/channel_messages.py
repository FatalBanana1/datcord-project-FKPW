from app.models import db, ChannelMessage, environment, SCHEMA


def seed_channel_messages():
    one = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="hey thanks for the info",
    )
    two = ChannelMessage(
        sender_id=2,
        channel_id=1,
        message="sure no problem!",
    )

    db.session.add(one)
    db.session.add(two)
    db.session.commit()


def undo_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM channel_messages_table")

    db.session.commit()
