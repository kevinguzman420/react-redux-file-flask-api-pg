from flask import request, Blueprint
from flask_restful import Api, Resource
from flask_login import current_user, login_user, logout_user
from app.ext import login_manager

from app.auth.api_v1_0 import auth_v1_0_bp
from .schemas import ClientSchema
from ..models import Client

api = Api(auth_v1_0_bp)

client_schema = ClientSchema()

class SignupResource(Resource):
    # Create an user
	def post(self):
		try:
			client = Client.get_by_email(request.json["email"])
			if client is not None:
				return False
			data = request.get_json()
			client_dict = client_schema.load(data)
			client = Client(name=client_dict['name'],
							lastname=client_dict['lastname'],
							email=client_dict['email'])
			client.hash_password(client_dict['password'])
			client.save()
			resp = client_schema.dump(client)
			return resp, 201
		except:
			return {}

class ClientLoggedResource(Resource):
	def get(self):
		try:
			if current_user:
				resp = client_schema.dump(current_user)
				return resp, 200
			else:
				return {}
		except Exception as e:
			print(e)

class AuthResource(Resource):
	# Logout User
	def get(self):
		try:
			logout_user()
			return True
		except:
			return False

	# Login User
	def post(self):
		client = Client.get_by_email(request.json["email"])
		if client is not None and client.check_password(request.json["password"]):
			login_user(client, remember=True)
			resp = client_schema.dump(client)
			return resp, 200
		return {}


@login_manager.user_loader
def load_user(user_id):
	return Client.get_by_id(user_id)


api.add_resource(SignupResource, "/api/v1.0/signup/", endpoint="signup_resource")
api.add_resource(ClientLoggedResource, "/api/v1.0/logged/", endpoint="client_list_resource")
api.add_resource(AuthResource, "/api/v1.0/auth/", endpoint="login_resource")


