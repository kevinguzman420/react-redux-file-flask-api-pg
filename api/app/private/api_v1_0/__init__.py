from flask import Blueprint

private_v1_0_bp = Blueprint('client_v1_0_bp', __name__)

from . import resources