from app.models import db, DirectMessage, environment, SCHEMA


def seed_direct_messages():
    d1 = DirectMessage(sender_id=3, friend_id=1, message="Hello! How are you doing?")
    d2 = DirectMessage(sender_id=3, friend_id=2, message="Hello! How are you doing?")
    d3 = DirectMessage(sender_id=3, friend_id=4, message="Hello! How are you doing?")
    d4 = DirectMessage(sender_id=3, friend_id=5, message="Hello! How are you doing?")
    d5 = DirectMessage(sender_id=3, friend_id=5, message="Hello! How are you doing?")
    d6 = DirectMessage(sender_id=14, friend_id=3, message="Hey! I'm well. How are you?")
    d7 = DirectMessage(sender_id=14, friend_id=3, message="What have you been upto?")
    d8 = DirectMessage(
        sender_id=3,
        friend_id=14,
        message="Just working on getting the light theme on the site, what do you think?",
    )
    d9 = DirectMessage(
        sender_id=14,
        friend_id=3,
        message="OMG!!!! So bright, my eyes....why you do this to me? I thought we were friends?????....",
    )
    d10 = DirectMessage(
        sender_id=3,
        friend_id=14,
        message="Don't worry I burned my retinas too....now we can swap glasses... #glassesbuddies ;)",
    )
    d11 = DirectMessage(sender_id=3, friend_id=14, message="Hello! How are you doing?")

    db.session.add_all([d1, d2, d3, d4, d5, d11, d6, d7, d8, d9, d10])
    db.session.commit()


def undo_direct_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.direct_messages_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM direct_messages_table")

    db.session.commit()
