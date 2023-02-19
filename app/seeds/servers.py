from app.models import db, Server, environment, SCHEMA


def seed_servers():

    server1 = Server(
        name="App Academy",
        owner_id=1,
        icon_url="https://top10codingbootcamps.com/wp-content/uploads/2022/06/Untitled-design-21.png",
        description="A place for App Academy Sept 2022 cohort students to connect!",
    )

    server2 = Server(
        name="World Cup Fans",
        owner_id=3,
        icon_url="https://media.cnn.com/api/v1/images/stellar/prod/221219105607-messi-crowd-world-cup-121822.jpg?c=original&q=w_1376,c_fill",
        description="Discuss all FIFA news and games here!",
    )

    server3 = Server(
        name="FatalBanana's server",
        owner_id=2,
        icon_url="https://media.discordapp.net/attachments/1072278458589261954/1073677188693491762/fatalbanana_icon.png",
        description="WE GONNA GO BANANA'S IN HERE",
    )

    server4 = Server(
        name="MEOW MEOW",
        owner_id=4,
        icon_url="https://dk2dv4ezy246u.cloudfront.net/widgets/sSaZSlIgofq_large.jpg",
        description="I meow, you meow, we all meow",
    )

    server5 = Server(
        name="Milk Tea",
        owner_id=5,
        icon_url="https://pbs.twimg.com/media/EfnsfM2UMAATMyP.jpg",
        description="A safe place for cow and boba lovers!",
    )

    server6 = Server(
        name="Python",
        owner_id=1,
        icon_url="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png",
        description="Server for Python.",
    )

    server7 = Server(
        name="Javascript",
        owner_id=1,
        icon_url="https://vegibit.com/wp-content/uploads/2014/04/Javascript-JS.png",
        description="Server for Javascript.",
    )

    server8 = Server(
        name="Papertalk",
        owner_id=9,
        icon_url="https://s.hdnux.com/photos/01/26/52/72/22720133/4/1200x0.jpg",
        description="Talk paper to me.",
    )

    server9 = Server(
        name="Welcome to Datcord!",
        owner_id=17,
        icon_url="https://media.discordapp.net/attachments/1072663876040146944/1075539563784704060/favicon.png",
        description="Official Datcord Welcome Server",
    )

    server10 = Server(
        name="The Last Blockbuster",
        owner_id=5,
        icon_url="https://cdn.mos.cms.futurecdn.net/35af26903d70fb40e85933743adfb24d.jpg",
        description="Please support us!",
    )

    db.session.add_all(
        [
            server8,
            server2,
            server3,
            server4,
            server5,
            server6,
            server7,
            server1,
            server9,
            server10,
        ]
    )

    db.session.commit()


def undo_servers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.servers_table RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute("DELETE FROM servers_table")

    db.session.commit()
