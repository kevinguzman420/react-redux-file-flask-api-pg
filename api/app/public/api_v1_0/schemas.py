from marshmallow import fields

from app.ext import ma


class CategorySchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    product = fields.Nested('ProductSchema')

class ProductSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    price = fields.String()
    description = fields.String()
    category_id = fields.Integer()
    image_product = fields.Nested('ImagesProductSchema', many=True)

class ImagesProductSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    imageName = fields.String()
    pathName = fields.String()
    id_product = fields.Integer()