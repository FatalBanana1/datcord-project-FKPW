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
        sender_id=27,
        channel_id=16,
        message="I hate you!",
    )
    cm64 = ChannelMessage(
        sender_id=23,
        channel_id=16,
        message="You were my brother Anakin. I loved you.",
    )
    cm65 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="Welcome to Datcord!",
    )
    cm66 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="I'm John Wick, and I'm thrilled to have you here.",
    )
    cm67 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="Whether you're a fan of my movies, a fellow professional killer, or just someone who loves a good action-packed adventure, you'll find a community of like-minded individuals here who share your passion.",
    )
    cm68 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="In this server, we'll be discussing all things related to the world of assassins, from the latest techniques and gadgets to the best places to stash your weapons.",
    )
    cm69 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="You'll have a chance to connect with other members, share your own tips and experiences, and even collaborate on missions if you're feeling up to it.",
    )
    cm70 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="But most importantly, this is a safe and welcoming space where you can be yourself and have fun. We have a zero-tolerance policy for bullying, hate speech, or any other behavior that goes against our community guidelines.",
    )
    cm71 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="So please be respectful to each other and remember that we're all here to have a good time.",
    )
    cm72 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="Once again, welcome to Datcord! Feel free to browse our server collection via the compass icon in the icon list on the left.",
    )
    cm73 = ChannelMessage(
        sender_id=77,
        channel_id=19,
        message="If you have an information related to the whereabouts of my dog, please report to the DogSighting channel in this server!",
    )

    cm74 = ChannelMessage(
        sender_id=77,
        channel_id=20,
        message="Breaking these rules will result in an instant Kick or Ban from the server.  By verifying your email with OpenBot you agree to following the rules and the consequences for not adhering to the rules.",
    )

    cm75 = ChannelMessage(
        sender_id=77,
        channel_id=20,
        message="No discrimination. This includes using racist terms/slang, sexist remarks, or making others feel bad for their race, gender, sexuality or disability. See more in our community guidelines below.",
    )
    cm76 = ChannelMessage(
        sender_id=77,
        channel_id=20,
        message="No promo spam or fundraising links. No advertising yours or others youtube, twitch, discord or social media. Doing so will lead to a kick for the first offense and a ban on the second offense.",
    )
    cm77 = ChannelMessage(
        sender_id=77,
        channel_id=20,
        message="No illegal discussions or activity. This includes any discussion about illegal drugs or activities, as well as hacking and/or piracy.",
    )
    cm78 = ChannelMessage(
        sender_id=77,
        channel_id=20,
        message="Be kind to each other. Be a positive person that gives people the benefit of the doubt. See the best in people. Embrace diversity: of backgrounds, of perspective, of those things we can choose, and those we can’t.",
    )
    cm79 = ChannelMessage(
        sender_id=77,
        channel_id=20,
        message="No spamming. Avoid sending the same message multiple times within the span of a few minutes.",
    )
    cm80 = ChannelMessage(
        sender_id=77,
        channel_id=23,
        message="Can't go wrong with your own basement!",
    )
    cm81 = ChannelMessage(
        sender_id=65,
        channel_id=23,
        message="Real men use a cave.",
    )
    cm82 = ChannelMessage(
        sender_id=66,
        channel_id=23,
        message="*real men use their fists",
    )
    cm83 = ChannelMessage(
        sender_id=87,
        channel_id=23,
        message="Always carry it on me! You never know when danger strikes.",
    )
    cm84 = ChannelMessage(
        sender_id=88,
        channel_id=23,
        message="doesnt the force tell you when danger strikes???",
    )
    cm85 = ChannelMessage(
        sender_id=88,
        channel_id=23,
        message="ive lost more light sabers than I can count",
    )
    cm86 = ChannelMessage(
        sender_id=87,
        channel_id=23,
        message="a real jedi needs to take better care of his weapon",
    )
    cm87 = ChannelMessage(
        sender_id=88,
        channel_id=23,
        message="then why did I find yours in the pit in Utapau...",
    )
    cm88 = ChannelMessage(
        sender_id=65,
        channel_id=21,
        message="Checked my cave, wasnt there...sorry!",
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
        ]
    )
    db.session.commit()

    db.session.add_all(
        [
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
            cm64,
            cm65,
            cm66,
            cm67,
            cm68,
            cm69,
            cm70,
            cm71,
            cm72,
            cm73,
            cm74,
            cm75,
            cm76,
            cm77,
            cm78,
            cm79,
            cm80,
            cm81,
            cm82,
            cm83,
            cm84,
            cm85,
        ]
    )
    db.session.commit()

    db.session.add_all(
        [
            cm86,
            cm87,
            cm88,
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
