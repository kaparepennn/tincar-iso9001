from flask import request, jsonify
from config import create_app, db
from models.user_model import User

app = create_app()

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify({"message": "Login exitoso"})
    return jsonify({"error": "Credenciales inválidas"}), 401


if __name__ == "__main__":
    app.run(debug=True, port=5000)
