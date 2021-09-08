from marshmallow import fields

from app.ext import ma

class ClientSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    lastname = fields.String()
    email = fields.String()
    password = fields.String()
    is_admin = fields.Boolean()
    cart = fields.Nested('CartSchema',)

