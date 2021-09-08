from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from app.private.models import Cart
from app.db import db, BaseModelMixin

class Client(db.Model, BaseModelMixin, UserMixin):
    # __tablename__ = 'client'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    lastname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=True)

    # Relationship to cart table
    cart = db.relationship('Cart', backref='client', lazy='dynamic', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<{self.name} {self.lastname}>'

    def hash_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @staticmethod
    def get_by_email(email):
        return Client.query.filter_by(email=email).first()