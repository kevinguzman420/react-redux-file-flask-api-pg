from flask import Blueprint

auth_v1_0_bp = Blueprint('auth_v1_0_bp', __name__)

from . import resources

