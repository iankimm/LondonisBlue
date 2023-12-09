from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
  __tablename__ = "comments"

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)
  body = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  # relationship
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)

  user = db.relationship('user', back_populates='comments')

  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))

  posts = db.relationship('post', back_populates='comments')

  # relationship connection
  commentlikes = db.relationship('commentlike', back_populates='comment', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'body': self.body,
      'user_id': self.user_id,
      'post_id': self.post_id
    }
