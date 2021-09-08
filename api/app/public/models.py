from app.db import db, BaseModelMixin

class Category(db.Model, BaseModelMixin):
    # __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)

    # Relationship to Product
    product = db.relationship('Product', backref='category', lazy=True)

    @staticmethod
    def get_all():
        return Category.query.all()

class Product(db.Model, BaseModelMixin):
    # __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    price = db.Column(db.String(16), nullable=False)
    description = db.Column(db.String(128), nullable=False)

    # ForeignKey to Category
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)

    # Relationship to cartItem
    cart = db.relationship('CartItem', backref='product', lazy=True)
    image_product = db.relationship('ImageProduct', backref='product', lazy=True)

    # Get product by category
    @staticmethod
    def get_by_category(category_id):
        return Product.query.filter_by(category_id=category_id).all()


class ImageProduct(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    imageName = db.Column(db.String(128), nullable=False)
    pathName = db.Column(db.String(256), nullable=False)
    id_product = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

    # Get images by product
    @staticmethod
    def get_by_product(product_id):
        return ImageProduct.query.filter_by(id_product=product_id).all()