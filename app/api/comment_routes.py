from flask import Blueprint, jsonify, session, request, url_for
from app.models import User, Post, Comment, PostImage, db

from flask_login import current_user, login_required
from sqlalchemy import func, desc
from sqlalchemy.orm import joinedload

comment_routes = Blueprint('comments', __name__)

# get all comments
@comment_routes.route('/', methods=['GET'])
def get_all_comments():
  comments = Comment.query.all()

  comments_data = []

  for comment in comments:
    comment_data = {
      'id' : comment.id,
      'body' : comment.body,
      'user_id' : comment.user_id,
      'post_id' : comment.post_id,
      'created_at' : comment.created_at,
      'updated_at' : comment.updated_at
    }
    comments_data.append(comment_data)

  return jsonify({
    "Comments": comments_data
  })

# get comments on post id
@comment_routes.route('/<int:post_id>', methods=['GET'])
def get_comments_by_post_id(post_id):
  comments = Comment.query.filter(Comment.post_id == post_id).all()

  comments_data = []

  for comment in comments:
    comment_data = {
      'id' : comment.id,
      'body' : comment.body,
      'user_id' : comment.user_id,
      'post_id' : comment.post_id,
      'created_at' : comment.created_at,
      'updated_at' : comment.updated_at
    }
    comments_data.append(comment_data)

  return jsonify({
    "Comments": comments_data
  })

# create a new comment
@comment_routes.route('/<int:post_id>/comments', methods=['POST'])
@login_required
def create_post_comment(post_id):
  try:
    post_to_comment = (Post.query.options(
      joinedload(Post.comments)).get(post_id))

    if post_to_comment:
      comments_for_post = [comment.to_dict() for comment in post_to_comment.comments]

  except Exception as e:
    return ({"message": "Post not found."}), 404

  if post_to_comment.user_id == current_user.id:
    return jsonify({"message": "Forbidden"}), 403

  for comment in comments_for_post:
    if comment['user_id'] == current_user.id:
      return jsonify({"message": "User already has a comment for this post"}), 403

  requestData = request.get_json()

  new_comment = Comment(
    body = requestData.get('body'),
    user_id = current_user.id,
    post_id = post_id,
  )

  db.session.add(new_comment)
  db.session.commit()

  return new_comment.to_dict()

# update a comment
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment_by_id(comment_id):
  comment = Comment.query.get(comment_id)

  if not comment:
    return jsonify({"message": "Comment not found."}), 404

  if comment.user_id == current_user.id:
    user_changes = request.get_json()

    for [key, item] in user_changes.items():
      setattr(comment, key, item)

    db.session.commit()

    return comment.to_dict()

  else:
    return jsonify({'message': "forbidden"}), 403

# delete a comment

@comment_routes.route('/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment_by_id(comment_id):
  current_comment = Comment.query.get(comment_id)

  if not current_comment:
    return jsonify({"message": "Comment not found."}), 404

  if current_user.id == current_comment.user_id:
    db.session.delete(current_comment)
    db.session.commit()

    return jsonify({"message": "Comment deleted."}), 200

  else:
    return jsonify({"message": "current user does not own this comment"}), 403
