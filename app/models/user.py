from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .follow import Follow


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profileImageUrl = db.Column(db.String(255), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # relationship
    posts = db.relationship("Post", back_populates="user", cascade='all, delete-orphan')
    comments = db.relationship("Comment", back_populates='user', cascade='all, delete-orphan')
    following = db.relationship(
        'Follow',
        foreign_keys=[Follow.following_user_id],
        back_populates='follower',
    )

    # Relationship for users following the current user
    followed_by = db.relationship(
        'Follow',
        foreign_keys=[Follow.followed_user_id],
        back_populates='followed',
    )
    commentLikes = db.relationship("CommentLike", back_populates='user', cascade='all, delete-orphan')
    postLikes = db.relationship("PostLike", back_populates='user', cascade='all, delete-orphan')
    postImages = db.relationship("PostImage", back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'profileImageUrl': self.profileImageUrl,
            'created_at': self.created_at,
        }
