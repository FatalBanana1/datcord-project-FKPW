from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()])
  icon_url = StringField("Image URL")
  description = StringField("Description", validators=[DataRequired()])
