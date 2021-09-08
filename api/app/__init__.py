from flask import Flask
# from flask_login import LoginManager
from flask_restful import Api

from app.db import db
from .ext import ma, migrate, login_manager
from app.auth.api_v1_0 import auth_v1_0_bp
from app.public.api_v1_0 import public_v1_0_bp
from app.private.api_v1_0 import private_v1_0_bp

# login_manager = LoginManager()

def create_app(settings_module):
    app = Flask(__name__)
    app.config.from_object(settings_module)

    login_manager.init_app(app)
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)


    # Register blueprints
    app.register_blueprint(auth_v1_0_bp)
    app.register_blueprint(private_v1_0_bp)
    app.register_blueprint(public_v1_0_bp)

    return app