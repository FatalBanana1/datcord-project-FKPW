from app.models import db, Server, environment, SCHEMA
from datetime import datetime


def seed_servers():
    python = Server(
        name="Python",
        owner_id=1,
        icon_url="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png",
        description="Server for Python.",
        created_at=datetime(2023, 1, 1),
        updated_at=datetime(2023, 1, 1),
    )
    javascript = Server(
        name="Javascript",
        owner_id=1,
        icon_url="https://vegibit.com/wp-content/uploads/2014/04/Javascript-JS.png",
        description="Server for Javascript.",
        created_at=datetime(2023, 1, 1),
        updated_at=datetime(2023, 1, 1),
    )

    server1 = Server(
        name = "App Academy",
        owner_id = 1,
        icon_url = "https://top10codingbootcamps.com/wp-content/uploads/2022/06/Untitled-design-21.png",
        description = "A place for App Academy Sept 2022 cohort students to connect!",
    )

    server2 = Server(
        name = "World Cup Fans",
        owner_id = 3,
        icon_url = "https://media.cnn.com/api/v1/images/stellar/prod/221219105607-messi-crowd-world-cup-121822.jpg?c=original&q=w_1376,c_fill",
        description = "Discuss all FIFA news and games here!",
    )

    server3 = Server(
        name = "FatalBanana's server",
        owner_id = 3,
        icon_url = "https://media.discordapp.net/attachments/1072278458589261954/1073677188693491762/fatalbanana_icon.png",
        description = "WE GONNA GO BANANA'S IN HERE",
    )

    server4 = Server(
        name = "MEOW MEOW",
        owner_id = 4,
        icon_url = "https://dk2dv4ezy246u.cloudfront.net/widgets/sSaZSlIgofq_large.jpg",
        description = "I meow, you meow, we all meow",
    )

    server5 = Server(
        name = "Milk Tea",
        owner_id = 5,
        icon_url = "https://pbs.twimg.com/media/EfnsfM2UMAATMyP.jpg",
        description = "A safe place for cow and boba lovers!",
    )

    db.session.add_all([server1, server2, server3, server4, server5])


    db.session.add(python)
    db.session.add(javascript)
    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM servers_table")

    db.session.commit()