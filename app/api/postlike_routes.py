from flask import Blueprint, jsonify, session, request, url_for, aobrt
from app.models import User, Post, PostImage, PostLike, db

from flask_login import current_user, login_required
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload

postlike_routes = Blueprint('postlikes', __name__)

# get postlike
@postlike_routes.route('/', methods=['GET'])
def get_all_postlikes():
  postlikes = PostLike.query.all()

  allPostLikes = []

  for postlike in postlikes:
    data = {
      'id': postlike.id,
      'user_id': postlike.user_id,
      'post_id': postlike.post_id
    }

    allPostLikes.append(data)

  return jsonify({"Postlikes": allPostLikes})


# create a post like
@postlike_routes.route('/<int:post_id>/likes', methods=['POST'])
@login_required
def create_post_like(post_id):
  post = Post.query.get(post_id)
  postlikes = PostLike.query.all()

  if not post:
    return jsonify({"message": f"Post not found."}), 404

  if post.user_id == current_user.id:
    return jsonify({"message": f"Post owner can't like your own."}), 403

  for postlike in postlikes:
    if postlike.user_id == current_user.id and postlike.post_id == post_id:
      return jsonify({"message": f"user liked this post already"}), 403

  new_postlike = PostLike(
    user_id = current_user.id,
    post_id = post_id
  )

  db.session.add(new_postlike)
  db.session.commit()

  return jsonify(new_postlike.to_dict())


# delete a post like
@postlike_routes.route('/<int:postlike_id>/likes', methods=['DELETE'])
@login_required
def delete_post_like(postlike_id):
  postlike = PostLike.query.get(postlike_id)

  if not postlike:
    return jsonify({"message": f"Postlike not found."}), 404

  if postlike.user_id == current_user.id:
    db.session.delete(postlike)
    db.session.commit()
    return jsonify({"message": "Post like deleted."}), 200

  return jsonify({'message': "forbidden"}), 403
