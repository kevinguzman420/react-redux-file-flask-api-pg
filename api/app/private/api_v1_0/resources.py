from flask import request
from flask_restful import Api, Resource

# Cart
from app.private.api_v1_0 import private_v1_0_bp
from .schemas import CartSchema, CartItemSchema
from ..models import Cart, CartItem
from app.public.models import Product

api = Api(private_v1_0_bp)

# Cart
cart_schema = CartSchema()
cartItem_schema = CartItemSchema()

class AddCartSave(Resource):
    def post(self):
        data = request.get_json()
        total = 0
        for item in data["cartItems"]:
            product = Product().get_by_id(item[0])
            print(product.category_id)
            total += int(item[2]) # Price or subtotal by item product
        print(total)
        return "HOLA MUNDO FROM ADDCARTSAVE", 200


api.add_resource(AddCartSave, "/api/v1.0/cart/", endpoint="add_cart_resource")