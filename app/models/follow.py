from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Follow(db.Model):
  __tablename__ = 'follows'

  # check if environment == production and sets schema
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, autoincrement=True, primary_key=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  # relationship
  following_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  followed_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

  follower = db.relationship('User', foreign_keys=[following_user_id], back_populates='following')
  followed = db.relationship('User', foreign_keys=[followed_user_id], back_populates='followed_by')

  def to_dict(self):
    return {
      'id': self.id,
      'following_user_id': self.following_user_id,
      'followed_user_id': self.followed_user_id,
      'created_at': self.created_at
    }
