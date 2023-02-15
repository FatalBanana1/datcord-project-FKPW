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
    cm16 = ChannelMessage(
        sender_id=11,
        channel_id=2,
        message="Hey guys",
    )
    cm17 = ChannelMessage(
        sender_id=11,
        channel_id=2,
        message="How is everyone doing?",
    )
    cm18 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="ok lets run through this...",
    )
    cm19 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="Delivery guy comes in and says: I got a delivery for ya'.",
    )
    cm20 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="Leave it at reception",
    )
    cm21 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="Delivery guy: I'm supposed to deliver this one in person. [pulls out a gun and starts shooting at Scarn, who dodges dramatically]",
    )
    cm22 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="[pulls out two handguns and kills the man with an unnecessarily large amount of bullets] Clean up on aisle five. [Threat Level: Midnight titlescreen appears]",
    )
    cm23 = ChannelMessage(
        sender_id=21,
        channel_id=14,
        message="Michael Scarn, well that's an interesting story. He was once the best secret agent in the business. That was years ago.",
    )
    cm24 = ChannelMessage(
        sender_id=21,
        channel_id=14,
        message="Where is he now? Well, that's also an interesting story.",
    )
    cm25 = ChannelMessage(
        sender_id=20,
        channel_id=14,
        message="[enter dressed as a butler. Speak in slow, deep voice] Master Scarn",
    )
    cm26 = ChannelMessage(
        sender_id=20,
        channel_id=14,
        message=" [crashes cymbals by Scarn's ear]",
    )
    cm27 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="I'm up.",
    )
    cm28 = ChannelMessage(
        sender_id=20,
        channel_id=14,
        message="It's the president. He needs you for a mission.",
    )
    cm29 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="Tell him I'm retired.",
    )
    cm30 = ChannelMessage(
        sender_id=20,
        channel_id=14,
        message="It's Goldenface.",
    )
    cm31 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="Goldenface, this makes it personal.",
    )
    cm32 = ChannelMessage(
        sender_id=21,
        channel_id=14,
        message="It's your old enemy, Goldenface. He's after the NHL All Star Game.",
    )
    cm33 = ChannelMessage(
        sender_id=21,
        channel_id=14,
        message="He's hidden a bomb somewhere in the stadium. Scarn, this one is personal for me. I own the stadium. I can't see it blown up. It's my retirement plan.",
    )
    cm34 = ChannelMessage(
        sender_id=20,
        channel_id=14,
        message="We have to search the stadium.",
    )
    cm35 = ChannelMessage(
        sender_id=21,
        channel_id=14,
        message="Not so fast, Goldenface has taken all the concession stand workers hostage. Scarn, will you find these hostages, and save the game?",
    )
    cm36 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="[holding a quarter up] Heads I do it, tails I don't. Best out of seven. [flips the coin] Heads. [flips it again] Tails.",
    )
    cm37 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="...Heads...Tails...Heads...Tails. ",
    )
    cm38 = ChannelMessage(
        sender_id=22,
        channel_id=14,
        message="[flips one more time and the quarter spins around on the table. Scarn looks at it] Well, it looks like there's going to be a clean-up on aisle five.",
    )
    cm39 = ChannelMessage(
        sender_id=22,
        channel_id=13,
        message="Ryan the fire guy",
    )
    cm40 = ChannelMessage(
        sender_id=21,
        channel_id=15,
        message="Are we downsizing?",
    )
    cm41 = ChannelMessage(
        sender_id=21,
        channel_id=15,
        message="figures we would get downsized right before I ordered a stack of 100 personalized business cards...",
    )
    cm42 = ChannelMessage(
        sender_id=22,
        channel_id=15,
        message="We're a family, families don't downsize, but yes we are getting downsized...",
    )
    cm43 = ChannelMessage(
        sender_id=20,
        channel_id=13,
        message="I want to lodge a formal complaint against Jim. Where do I do this?",
    )
    cm44 = ChannelMessage(
        sender_id=19,
        channel_id=13,
        message="you would submit a report and send it to the manager, well the assistant to the manager",
    )
    cm45 = ChannelMessage(
        sender_id=20,
        channel_id=13,
        message="thats me!",
    )
    cm46 = ChannelMessage(
        sender_id=19,
        channel_id=13,
        message="yes you would need to submit that complaint asap, takes 2-3 weeks for it process",
    )
    cm57 = ChannelMessage(
        sender_id=23,
        channel_id=16,
        message="It's over Anakin. I have the high ground.",
    )
    cm58 = ChannelMessage(
        sender_id=24,
        channel_id=16,
        message="You underestimate my power!",
    )
    cm59 = ChannelMessage(
        sender_id=23,
        channel_id=16,
        message="Don't try it",
    )
    cm60 = ChannelMessage(
        sender_id=24,
        channel_id=16,
        message="*Attempts to jump to high ground*",
    )
    cm61 = ChannelMessage(
        sender_id=23,
        channel_id=16,
        message="*Cuts Anakin in half*",
    )
    cm62 = ChannelMessage(
        sender_id=23,
        channel_id=16,
        message="You were the Chosen One! It was said that you would destroy the Sith, not join them. Bring balance to the Force, not leave it in Darkness",
    )
    cm63 = ChannelMessage(
        sender_id=24,
        channel_id=16,
        message="I hate you!",
    )
    cm64 = ChannelMessage(
        sender_id=23,
        channel_id=16,
        message="You were my brother Anakin. I loved you.",
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
            cm16,
            cm17,
            cm18,
            cm19,
            cm20,
            cm21,
            cm22,
            cm23,
            cm24,
            cm25,
            cm26,
            cm27,
            cm28,
            cm29,
            cm30,
            cm31,
            cm32,
            cm33,
            cm34,
            cm35,
            cm36,
            cm37,
            cm38,
            cm39,
            cm40,
            cm41,
            cm42,
            cm43,
            cm44,
            cm45,
            cm46,
            cm57,
            cm58,
            cm59,
            cm60,
            cm61,
            cm62,
            cm63,
            cm64
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
