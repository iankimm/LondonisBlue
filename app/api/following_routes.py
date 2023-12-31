from flask import Blueprint, jsonify, session, request, url_for
from app.models import User, Post, Follow, db

from flask_login import current_user, login_required
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload

following_route = Blueprint('followings', __name__)

# get follows
@following_route.route('/', methods=['GET'])
def get_all_follows():
  follows = Follow.query.all()

  allFollows = []

  for follow in follows:
    data = {
      'id': follow.id,
      'following_user_id': follow.following_user_id,
      'followed_user_id': follow.followed_user_id,
      'created_at': follow.created_at
    }

    allFollows.append(data)

  return jsonify({"Follows": allFollows})

# create a following
@following_route.route('/<int:following_user_id>/following', methods=['POST'])
@login_required
def create_following(followed_user_id):

  following_user_id = current_user.id

  following = Follow.query.filter_by(followed_user_id, following_user_id)

  if following:
    return jsonify({"message": f"follow already exist."}), 404

  new_follow = Follow(
    followed_user_id,
    following_user_id
  )

  db.session.add(new_follow)
  db.session.commit()

  return jsonify(new_follow.to_dict())


# delete a following
@following_route.route('/<int:followId>/following', methods=['DELETE'])
# @login_required
def delete_following(followId):
  following = Follow.query.get(followId)

  if not following:
    return jsonify({"message": f"Follow not found."}), 404

  db.session.delete(following)
  db.session.commit()

  return jsonify({"message": "Following deleted."}), 200
