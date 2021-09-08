# from app.public.models import Product
from app.db import db, BaseModelMixin

class Cart(db.Model, BaseModelMixin):
    # __tablename__ = 'cart'

    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.String(24), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    state = db.Column(db.Boolean, default=True)

    # Foreignkey to client table
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    # Relationship to cart item
    cart = db.relationship('CartItem', backref='cart', lazy=True)

class CartItem(db.Model):
    # __tablename__ = 'cartItem'

    id = db.Column(db.Integer, primary_key=True)
    quatity = db.Column(db.String(8), nullable=False)
    subtotal = db.Column(db.String(16), nullable=False)

    # Foreignkey to cart table
    id_cart = db.Column(db.Integer, db.ForeignKey('cart.id'), nullable=False)
    id_product = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
