from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configuration for the app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Sqlamr@localhost/project_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Import blueprints and register them
    from .routes import api
    app.register_blueprint(api, url_prefix='/api')

    return app
