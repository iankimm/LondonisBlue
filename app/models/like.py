from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
  __tablename__ = "likes"

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)

  # relationships
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  user = db.relationship("User", back_populates="likes")

  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))

  post = db.relationship("Post", back_populates="likes")

  comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))

  comment = db.relationship("Comment", back_populates="likes")
