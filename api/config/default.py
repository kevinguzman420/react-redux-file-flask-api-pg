from os.path import abspath, dirname, join

# Define the application directory
BASE_DIR = dirname(dirname(dirname(abspath(__file__))))
MEDIA_DIR = join(BASE_DIR, 'src/media')


SECRET_KEY="123447a47f563e90fe2db0f56b1b17be62378e31b7cfd3adc776c59ca4c75e2fc512c15f69bb38307d11d5d17a41a7936789"

# Para propagar las excepciones y poder manejarlar a nivel de aplicacion
PROPAGATE_EXCEPTIONS = True

# Database configurations
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:kevinguzman@localhost:5432/reactflaskapidb'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SHOW_SLQALCHEMY_LOG_MESSAGES = False

# Deshabilita las sugerencias de otros endpoints relacionados con alguno que no exista (Flask-Restful)
ERROR_404_HELP = False
