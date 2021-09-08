from marshmallow import fields

from app.ext import ma

class CartSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    total = fields.String()
    date = fields.String()
    state = fields.String()
    cartItem = fields.Nested('CartItem')


class CartItemSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    quantity = fields.String()
    subtotal = fields.String()
    product = fields.Nested('Product')