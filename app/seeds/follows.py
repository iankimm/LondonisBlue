from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.follow_data import follows_data



# Adds a demo user, you can add other users here if you want
def seed_follows():

    for follow in follows_data:
        seed_post = Follow(
            following_user_id = follow['following_user_id'],
            followed_user_id = follow['followed_user_id']
        )
        db.session.add(seed_post)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
