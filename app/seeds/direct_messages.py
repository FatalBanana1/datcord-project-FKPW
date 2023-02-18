from app.models import db, DirectMessage, environment, SCHEMA


def seed_direct_messages():
    d1 = DirectMessage(
        sender_id=3, friend_id=1, message="eeeeeeeeeeeeeeeeeyyyyyyyyyyyy, whats up?"
    )
    d2 = DirectMessage(sender_id=3, friend_id=2, message="Hello! How are you doing?")
    d3 = DirectMessage(sender_id=3, friend_id=4, message="Hello! How are you doing?")
    d4 = DirectMessage(sender_id=3, friend_id=5, message="Hello! How are you doing?")
    d5 = DirectMessage(sender_id=3, friend_id=5, message="Hello! How are you doing?")
    d6 = DirectMessage(sender_id=14, friend_id=3, message="Hey! I'm well. How are you?")
    d7 = DirectMessage(sender_id=14, friend_id=3, message="What have you been up to?")
    d8 = DirectMessage(
        sender_id=3,
        friend_id=14,
        message="Just working on getting the light theme on the site, what do you think?",
    )
    d9 = DirectMessage(
        sender_id=14,
        friend_id=3,
        message="omg my eyes......",
    )
    d10 = DirectMessage(
        sender_id=3,
        friend_id=14,
        message="rip xD",
    )
    d11 = DirectMessage(sender_id=3, friend_id=14, message="hey suppp")

    d12 = DirectMessage(sender_id=1, friend_id=3, message="nm, whats good bruh")
    d13 = DirectMessage(sender_id=1, friend_id=3, message="What have you been up to?")
    d14 = DirectMessage(
        sender_id=3,
        friend_id=1,
        message="Just working on getting the light theme on the site, what do you think?",
    )

    d15 = DirectMessage(
        sender_id=1,
        friend_id=3,
        message="where is it? how do I swap themes?",
    )
    d16 = DirectMessage(
        sender_id=3,
        friend_id=1,
        message="just click on the little ying yang icon next to your username on the bottom left side",
    )

    d17 = DirectMessage(
        sender_id=1,
        friend_id=3,
        message="OMG!!!! So bright, my eyes....why you do this to me? I thought we were friends?????....",
    )
    d18 = DirectMessage(
        sender_id=3,
        friend_id=1,
        message="Don't worry I burned my retinas too....now we can swap glasses... #glassesbuddies ;)",
    )
    d19 = DirectMessage(
        sender_id=3, friend_id=1, message="I did the same thing to choco hahahaha!!!"
    )
    d20 = DirectMessage(sender_id=1, friend_id=3, message="-_-")

    db.session.add_all(
        [
            d1,
            d2,
            d3,
            d4,
            d5,
            d11,
            d6,
            d7,
            d8,
            d9,
            d10,
            d11,
            d12,
            d13,
            d14,
            d15,
            d16,
            d17,
            d18,
            d19,
            d20,
        ]
    )
    db.session.commit()


def undo_direct_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.direct_messages_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM direct_messages_table")

    db.session.commit()
