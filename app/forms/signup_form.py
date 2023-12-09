from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_format(form, field):
    # Checking to see if the email inputted is in the reequested format
    email = field.data
    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
    if not re.match(email_pattern, email):
        raise ValidationError("Not a valid email.")

def password_length(form, field):
    # Checking if password length is at least 6 characters long
    password = field.data
    if len(password) < 6:
        raise ValidationError('Must be at least 6 characters.')

def starting_with_spaces(form, field):
    if (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')



class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, starting_with_spaces])
    email = StringField('email', validators=[DataRequired(), user_exists])
    firstName = StringField('firstName', validators=[DataRequired(), starting_with_spaces])
    lastName = StringField('lastName', validators=[DataRequired(), starting_with_spaces])
    profileImageUrl = StringField('profileImageUrl', validators=[starting_with_spaces])
    password = StringField('password', validators=[DataRequired()])
