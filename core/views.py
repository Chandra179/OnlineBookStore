from django.views.generic import TemplateView
<<<<<<< HEAD
from django.views.decorators.cache import never_cache
=======
>>>>>>> main

# Serve Single Page Application
index = TemplateView.as_view(template_name='index.html')
