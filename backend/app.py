from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash
import secrets
import logging
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure JWT secret key
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'MySecretKey')  # Use an environment variable for better security

# Initialize JWT Manager
jwt = JWTManager(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

# Initialize Flask-Mail
mail = Mail(app)

# Configure MongoDB
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
# Initialize MongoDB client
client = MongoClient(MONGO_URI)

db = client['userData']  # Access your database

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Print the incoming data for debugging
    print("Received data:", data)




    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "email and password are required"}), 400

    # Check if email already exists
    existing_user = db.users.find_one({'email': email})
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    # Insert new user into the database
    try:
        db.users.insert_one({
            "email": email,
            "password": password  # Make sure to hash passwords in a real application
        })
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        print(f"Error inserting user: {e}")
        return jsonify({"message": "An error occurred while creating user"}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Validate email and password
    if not email or not password:
        return jsonify({'msg': 'email and password are required'}), 400

    # Fetch user from the database
    user = db.users.find_one({'email': email})

    # Check if user exists and password is correct (you may want to hash passwords in production)
    if user and user['password'] == password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'msg': 'Invalid email or password'}), 401




@app.route('/forgot-password', methods=['POST']) 
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email')

        # Check if user with that email exists
        user = db['users'].find_one({'email': email})
        if not user:
            return jsonify({"error": "Email not found"}), 404

        # Generate a secure token
        reset_token = secrets.token_urlsafe(20)

        # Store the token in the database with an expiration (optional)
        db['users'].update_one({'email': email}, {'$set': {'reset_token': reset_token}})

        # Send email with reset link
        reset_url = f"http://localhost:3000/reset-password?token={reset_token}"
        msg = Message("Password Reset Request", sender=app.config['MAIL_USERNAME'], recipients=[email])  # Ensure sender is set
        msg.body = f"Click the following link to reset your password: {reset_url}"
        mail.send(msg)

        return jsonify({"message": "Password reset email sent"}), 200
    except Exception as e:
        logging.error("Error sending email: %s", str(e))
        return jsonify({"error": "Failed to send email"}), 500




@app.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.get_json()
        reset_token = data.get('token')
        new_password = data.get('new_password')

        # Find the user with the reset token
        user = db['users'].find_one({'reset_token': reset_token})
        if not user:
            return jsonify({"error": "Invalid or expired reset token"}), 404

        # Update the user's password
        db['users'].update_one({'_id': user['_id']}, {'$set': {'password': new_password, 'reset_token': None}})

        return jsonify({"message": "Password changed successfully"}), 200
    except Exception as e:
        logging.error("Error resetting password: %s", str(e))
        return jsonify({"error": "Failed to reset password"}), 500


if __name__ == '__main__':
    app.run(debug=True)