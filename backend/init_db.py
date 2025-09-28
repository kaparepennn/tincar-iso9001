import os
from config import create_app, db
from models.user_model import User

# Crear la app y el contexto
app = create_app()

with app.app_context():
    # Crear carpeta data si no existe
    if not os.path.exists("data"):
        os.makedirs("data")

    # Crear las tablas
    db.create_all()

    # Verificar si ya existe el usuario inicial
    if not User.query.filter_by(username="karen.palacios").first():
        user = User(username="karen.palacios")
        user.set_password("tincar123")  # la contraseña queda encriptada
        db.session.add(user)
        db.session.commit()
        print("✅ Usuario inicial creado: karen.palacios / tincar123")
    else:
        print("ℹ️ Usuario inicial ya existe")
