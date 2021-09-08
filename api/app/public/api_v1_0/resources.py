from flask import request, jsonify, current_app
from flask_restful import Api, Resource , reqparse
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename

import os, json

from app.public.api_v1_0 import public_v1_0_bp
from .schemas import CategorySchema, ProductSchema, ImagesProductSchema
from ..models import Category, Product, ImageProduct

api = Api(public_v1_0_bp)

category_schema = CategorySchema()
product_schema = ProductSchema()
imageProduct_schema = ImagesProductSchema()

catProd = {}

class CategoryResource(Resource):
    # Get all categories
    def get(self):
        categories = Category.get_all()
        resp = category_schema.dump(categories, many=True)
        return resp, 200

    # Create Category
    def post(self):
        try:
            if request.json:
                category = request.get_json()
                cat_dic = category_schema.load(category)
                print("category_name")
                category_name = secure_filename(cat_dic["name"].lower()) # Get category name in lowercase and secure name
                print(category_name)
                print("category_name")
                if not Category().simple_filter(category_name):
                    category = Category(name=category_name)
                    category.save()
                    print("Category created")
                    category_dir = f'{current_app.config["MEDIA_DIR"]}/img/categories/{category.name}'
                    os.makedirs(category_dir, exist_ok=True)
                    resp = category_schema.dump(category)
                    return {"response": resp, "flag": True}
                else:
                    print("Category has already created")
                    return {
                        "response": f'The category {category_name} is already created.',
                        "flag": False
                        }
            else:
                return {"response": "No data", "flag": False}
        except Exception as e:
            print(e)
            return {"response": "Has been an error. Please try again.", "flag": False}

class ProductResource(Resource):

    # Get product by category
    def get(self, category_id):
        products = Product().get_by_category(category_id)
        resp = product_schema.dump(products, many=True)
        return resp, 200


    # Create product
    def post(self):
        if request.json:
            global catProd
            product = request.get_json()
            prod_dic = product_schema.load(product)
            product_name = secure_filename(prod_dic["name"].lower()) # Get the product name in lowercase and secure name
            if not Product().simple_filter(product_name):
                catProd["category_id"] = prod_dic["category_id"] # To get category id, to save product by category name
                product = Product(
                                name=secure_filename(prod_dic["name"].lower()),
                                price=prod_dic["price"],
                                description = prod_dic["description"],
                                category_id=catProd["category_id"])
                try:
                    product.save()
                    resp = product_schema.dump(product)
                    # To get the product id, and use it to save the images of product
                    catProd["product_id"] = resp["id"]
                    catProd["product_name"] = prod_dic["name"]
                    return {"response": f'The product {prod_dic["name"]} has created successfully.', "flag": True}, 200
                except:
                    return {"response": "Has ocurred an error. Please try again.", "flag": False}
            else:
                return {"response": f'The product {prod_dic["name"]} has already been created.', "flag": False}
        else:
            return {"response": "Without data. Please try again.", "flag": False}

class ProductImageResource(Resource):
    # Create images by product
    def post(self):
        try:
            # To get the category name
            category = Category.get_by_id(catProd["category_id"])

            parse = reqparse.RequestParser()
            images = []
            parse.add_argument('image1', type=FileStorage, location='files')
            parse.add_argument('image2', type=FileStorage, location='files')
            parse.add_argument('image3', type=FileStorage, location='files')
            parse.add_argument('image4', type=FileStorage, location='files')
            args = parse.parse_args()
            images.append(args['image1'])
            images.append(args['image2'])
            images.append(args['image3'])
            images.append(args['image4'])
            if images:
                # This create a directory of product
                images_dir = f'{current_app.config["MEDIA_DIR"]}/img/categories/{category.name}/{catProd["product_name"]}'
                os.makedirs(images_dir, exist_ok=True)
                # If images_dir has images, then they are deleted
                for image in os.listdir(images_dir):
                    if os.path.isfile(os.path.join(images_dir, image)):
                        file = os.path.join(images_dir, image)
                        os.remove(file)
                # Save the images
                for image in images:
                    if image.name:
                        image_name = secure_filename(image.filename)
                        file_path = os.path.join(images_dir, image_name)
                        # Save image in db
                        imageProduct = ImageProduct(imageName=image.filename,
                                                    pathName=f'{category.name}/{catProd["product_name"]}',
                                                    id_product=catProd["product_id"])
                        imageProduct.save()
                        # Save image in directory
                        image.save(file_path)
                return {
                        "response": f'Product {catProd["product_name"]} created',
                        "flag": True
                    }, 200
            else:
                return {
                        "response": "Has an problem with the images, please try again",
                        "flag": False
                    }
        except Exception as err:
            print(err)
            return {"response": "Has been ocurred an problem. Please try again.", "flag": False}

class GetImagesByProduct(Resource):
    # Get all images by product
    def post(self):
        all_images = []
        data = request.get_json()
        for id_product in data["payload"]:
            product = Product().get_by_id(id_product)
            images = ImageProduct().get_by_product(id_product)
            data = imageProduct_schema.dumps(images, many=True)
            all_images.append({
                "image1": json.loads(data)[0],
                "image2": json.loads(data)[1],
                "image3": json.loads(data)[2],
                "image4": json.loads(data)[3],
                "productId": id_product,
                "productName": product.name,
                "productDescription": product.description,
                "productPrice": product.price
                })

        return all_images, 200
        return {
            "product1": {
                "image1": json.loads(data)[0],
                "image2": json.loads(data)[1],
                "image3": json.loads(data)[2],
                "image4": json.loads(data)[3]
                }
            }, 200

cart_items = []
class HandleReduxState(Resource):
    def post(self):
        global cart_items
        data = request.get_json()
        cart_items.append(data["payload"])
        print(cart_items)
        print(len(cart_items))
        return cart_items, 200

api.add_resource(CategoryResource, "/api/v1.0/category/", endpoint="category_response")

api.add_resource(ProductResource, "/api/v1.0/product/", endpoint="product_response")
# Get product by category (GET):
api.add_resource(ProductResource, "/api/v1.0/product/<int:category_id>/", endpoint="get_products_by_category_response")

# Create images by product (POST):
api.add_resource(ProductImageResource, "/api/v1.0/product/images/", endpoint="create_product_images_response")
# Get images by product (GET):
api.add_resource(GetImagesByProduct, "/api/v1.0/images/product/", endpoint="get_images_by_product_response")

# Handle Redux State
api.add_resource(HandleReduxState, "/api/v1.0/handle/state/", endpoint="handle_state_redux_response")