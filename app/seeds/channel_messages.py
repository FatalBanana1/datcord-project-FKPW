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
    cm3 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="I always use semicolons. There are two main reasons I do:",
    )
    cm4 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="- habit, the first languages I coded A LOT in were C and C++, my fingers just type semicolons without me even thinking about it",
    )
    cm5 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="- consistency, there are some cases where not having a semicolon can produce unexpected results, and I don't want to have to remember those edge cases",
    )
    cm6 = ChannelMessage(
        sender_id=2,
        channel_id=1,
        message="Yeah, same I think, but i didn't know about it behaving inconsistently",
    )
    cm7 = ChannelMessage(
        sender_id=2,
        channel_id=1,
        message="but good to know, and yes when i started learning a while ago, in uni since i did like 2 years of CS before switching to law, i learned some bit of C and Java, and picked that habit there",
    )
    cm8 = ChannelMessage(
        sender_id=2,
        channel_id=1,
        message="but that was like 8 years ago",
    )
    cm9 = ChannelMessage(
        sender_id=2,
        channel_id=1,
        message="but i did stick to my mind at the time, since errors haunt you lol",
    )
    cm10 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="Something you'll do regularly for production - code can become mangled if the minifier didn't guess properly where to insert your semicolons and you'll get to spend your weekend trying to figure out why your perfect code stops working on production.",
    )
    cm11 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="Oh it makes sense now",
    )
    cm12 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="so you basically tell the code where it breaks the line explicitly",
    )
    cm13 = ChannelMessage(
        sender_id=2,
        channel_id=1,
        message="Yeah, the line or statement. Having an explicit character say 'that's done' makes life much easier for the minifier. And, therefor, you.",
    )
    cm14 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="Yeah it make sense",
    )
    cm15 = ChannelMessage(
        sender_id=1,
        channel_id=1,
        message="thanks for the tips",
    )

    db.session.add_all(
        [
            one,
            two,
            cm3,
            cm4,
            cm5,
            cm6,
            cm7,
            cm8,
            cm9,
            cm10,
            cm11,
            cm12,
            cm13,
            cm14,
            cm15,
        ]
    )
    db.session.commit()


def undo_channel_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.channel_messages_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM channel_messages_table")

    db.session.commit()
