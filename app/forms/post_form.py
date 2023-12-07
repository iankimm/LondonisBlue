from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError

def starting_with_spaces(form, field):
    if (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')

class PostForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), starting_with_spaces])
  body = TextAreaField('body', validators=[DataRequired()])
  imageUrl = StringField('imageUrl')
