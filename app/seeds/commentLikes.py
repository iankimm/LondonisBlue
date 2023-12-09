from app.models import db, CommentLike, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.comment_like_data import comment_likes_data



# Adds a demo user, you can add other users here if you want
def seed_commentLikes():

    for like in comment_likes_data:
        seed_post = CommentLike(
            user_id = like['user_id'],
            comment_id = like['comment_id'],
        )
        db.session.add(seed_post)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_commentLikes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.commentLikes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM commentLikes"))

    db.session.commit()
