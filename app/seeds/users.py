from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():

    seedUsers = ['Demo','marnie','bobbie']
    foundUsers = []
    for user in seedUsers:
        try:
            oldUsers = User.query.filter_by(username=user).first()
            if oldUsers:
                foundUsers.append(oldUsers)
        except:
            pass

    if len(foundUsers) == 0:
        demo = User(
            username='Demo', firstName='Demo', lastName='User', email='demo@aa.io', image_url= 'https://upload.wikimedia.org/wikipedia/commons/d/df/Enzo_Fern%C3%A1ndez_WC2022.jpg', password='password')
        marnie = User(
            username='marnie', firstName='marnie', lastName='lasty', email='marnie@aa.io', image_url= 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Raheem_Sterling_2018.jpg/220px-Raheem_Sterling_2018.jpg', password='password')
        bobbie = User(
            username='bobbie', firstName='bobbie', lastName='lasterson', email='bobbie@aa.io', image_url= 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mauricio_Pochettino_2016_%28cropped%29.jpg/220px-Mauricio_Pochettino_2016_%28cropped%29.jpg', password='password')
        nicolasJ = User(
            username='NicolasJ', firstName='nicolas', lastName='Jackson', email='jackson@aa.io', image_url= 'https://cdn.vox-cdn.com/thumbor/s199G4prKvHQ8TIxFkN6_VnNP6A=/0x0:4271x2847/920x613/filters:focal(1839x692:2521x1374):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/73007281/1828545420.0.jpg', password='password')
        raheem = User(
            username='Raheemzz', firstName='Raheem', lastName='Sterling', email='raheem@aa.io', image_url= 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Raheem_Sterling_2018.jpg/220px-Raheem_Sterling_2018.jpg', password='password')
        cole = User(
            username='ColePalmerr', firstName='Cole', lastName='Palmer', email='cole@aa.io', image_url= 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Yokohama_F._Marinos_-_Manchester_City_%283-5%29_-_53075276869_%28Cole_Palmer%29.jpg/220px-Yokohama_F._Marinos_-_Manchester_City_%283-5%29_-_53075276869_%28Cole_Palmer%29.jpg', password='password')
        reece = User(
            username='ReeceX21', firstName='Reece', lastName='James', email='reece@aa.io', image_url= 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Reece_James_2021.jpg/220px-Reece_James_2021.jpg', password='password')

        db.session.add(demo)
        db.session.add(marnie)
        db.session.add(bobbie)
        db.session.add(nicolasJ)
        db.session.add(raheem)
        db.session.add(cole)
        db.session.add(reece)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
