from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model
import uuid


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_username(self, request, user):
        """
        Custom username generation for social accounts.
        Uses email prefix with fallback to UUID.
        """
        User = get_user_model()
        
        # Get email from the user
        email = getattr(user, 'email', None)
        
        if email and '@' in email:
            # Use email prefix as base
            base_username = email.split('@')[0]
            # Clean the username (remove special chars)
            base_username = ''.join(c for c in base_username if c.isalnum() or c in '-_')
            
            username = base_username
            counter = 1
            
            # Ensure uniqueness
            while User.objects.filter(username=username).exists():
                username = f"{base_username}_{counter}"
                counter += 1
                
            user.username = username
        else:
            # Fallback to UUID
            user.username = str(uuid.uuid4())[:8]
        
        return user.username 