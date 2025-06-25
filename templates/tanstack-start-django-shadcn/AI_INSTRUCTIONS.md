**Objective:** Your task is to build a new Django backend for this project and integrate it with the existing frontend. 
The frontend is located in the `/frontend` directory. 
The current stack is Tanstack Start - Clerk - Prisma ORM - Supabase - Shadcn. 
You will replace Clerk, Supabase with the new self-hosted django backend. 
The final stack will be **Tanstack Start (Frontend)** and **Django (Backend)**, using **uv** for Python package and environment management.

Execute the following steps in order.

**Phase 1: Backend Implementation**

1.  **Create a new directory** at the project root named `backend`. All subsequent backend work will be done inside this directory.
2.  **Initialize the Python project and define dependencies.** Inside `/backend`, create a `pyproject.toml` file with the following content. This file defines the project metadata and dependencies for `uv` to use.
    ```toml
    [project]
    name = "backend"
    version = "0.1.0"
    description = "Django backend for the project."
    dependencies = [
        "django",
        "djangorestframework",
        "django-environ",
        "djangorestframework-simplejwt",
        "django-cors-headers",
    ]

    [project.optional-dependencies]
    dev = [
        "pytest",
        "pytest-django",
        "black",
        "ruff",
    ]
    ```
3.  **Create a virtual environment and install dependencies.** Inside the `/backend` directory, run the following command: `uv pip install -e .[dev]`. This will create a `.venv` directory, install all production and development packages, and install the project in editable mode.
4.  **Create the Django project and a dedicated `api` app.** Use `uv run` to execute the commands within the managed environment:
    *   `uv run django-admin startproject project .`
    *   `uv run python manage.py startapp api`
5.  **Configure `project/settings.py`:**
    *   Integrate `django-environ` to load secrets and settings from a `.env` file.
    *   Add `rest_framework`, `rest_framework_simplejwt`, `corsheaders`, and `api` to `INSTALLED_APPS`.
    *   Configure `django-cors-headers` to allow requests from the frontend. **Before you write this, ask me for the exact frontend development URL (e.g., `http://localhost:5173`). If I don't provide one, use `http://localhost:5173` as a default.**
    *   Set Django Rest Framework's default authentication to use `rest_framework_simplejwt`.
6.  **Implement Authentication in the `api` app:**
    *   Create serializers and views for user registration.
    *   Set up URL patterns for the following endpoints:
        *   `api/auth/register/` (Your custom registration view)
        *   `api/auth/token/` (Login - use SimpleJWT's `TokenObtainPairView`)
        *   `api/auth/token/refresh/` (Refresh token - use SimpleJWT's `TokenRefreshView`)
        *   `api/auth/user/` (A protected endpoint requiring a valid token to retrieve the current user's details).
7.  **Create necessary documentation and example files:**
    *   In the `/backend` root, create a `.env.example` file with placeholders for `SECRET_KEY` and `DEBUG`.
    *   In the `/backend` root, create a `README.md` with instructions:
        1.  Setup: `uv pip install -e .[dev]`
        2.  Run Migrations: `uv run python manage.py migrate`
        3.  Start Server: `uv run python manage.py runserver`
8.  **Finalize Backend Setup:** Run the initial database migrations: `uv run python manage.py makemigrations` and `uv run python manage.py migrate`.

**Phase 2: Frontend Integration (in `/frontend`)**

1.  **Navigate into the `/frontend` directory.**
2.  **Remove BaaS dependencies:** Edit `package.json` to remove all packages related to Clerk and Supabase. Run your package manager's install command to update the lockfile.
3.  **Clean up the codebase:** Perform a global search within `/frontend` to find and delete all code related to Clerk and Supabase (e.g., providers, hooks, client initializations) and their corresponding environment variables.
4.  **Implement new authentication logic:**
    *   Create or update an API client to interact with the Django backend at `http://localhost:8000`.
    *	Objective: I want to completely bypass django local username/password management and delegate all authentication to trusted third parties like Google, Microsoft, GitHub, Okta, etc.

---
### How to Implement SSO with `django-allauth`

Here is a step-by-step guide to integrating Google Sign-In, which is a great starting point. The process is nearly identical for other providers.

#### Step 1: Install `django-allauth`

```bash
# Inside your /backend directory
uv pip install django-allauth
```

#### Step 2: Configure Django Settings (`project/settings.py`)

This is the most involved step. You need to tell Django to use `allauth`.

```python
# project/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites', # Required by allauth

    # Your apps
    'rest_framework',
    'api',

    # Allauth apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # Add the providers you want to support
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.github', # Example
]

# Required by allauth for building callback URLs
SITE_ID = 1

# Add allauth to your authentication backends
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

# --- Allauth Specific Settings ---

# Tell allauth that email is the primary identifier
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'optional' # or 'mandatory'

# What to do after login/logout
LOGIN_REDIRECT_URL = 'http://localhost:5173/dashboard' # URL on your frontend
LOGOUT_REDIRECT_URL = 'http://localhost:5173/login' # URL on your frontend

# Provider-specific settings (e.g., for Google)
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        # These are the permissions you ask from the user
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        # The app you will create in Google Cloud Console
        'APP': {
            'client_id': env('GOOGLE_OAUTH_CLIENT_ID'),
            'secret': env('GOOGLE_OAUTH_CLIENT_SECRET'),
            'key': '' # Not needed for Google
        }
    }
}
```
*Note: I've used `env(...)` to show that you must store your Client ID and Secret in your `.env` file, not in your code.*

#### Step 3: Add URLs (`project/urls.py`)

`django-allauth` comes with all the necessary views and URLs built-in. You just need to include them.

```python
# project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

    # Add this line for allauth
    path('accounts/', include('allauth.urls')),
]
```
This single line gives you access to endpoints like `/accounts/google/login/`, `/accounts/logout/`, etc.

#### Step 4: Run Migrations

`allauth` needs to create its own tables in the database to link social accounts to your users.

```bash
uv run python manage.py migrate
```

#### Step 5: The Frontend Flow

This is the beautifully simple part. Your React frontend **does not need any special SDKs** like the Google Sign-In library.

1.  **Create a Login Button:** In your React login page, the "Sign in with Google" button is just a regular link (`<a>` tag) pointing directly to your Django backend's login URL.

    ```jsx
    // Your LoginPage.tsx component
    function LoginPage() {
      return (
        <div>
          <h1>Login</h1>
          <a href="http://localhost:8000/accounts/google/login/">
            Sign in with Google
          </a>
        </div>
      );
    }
    ```

2.  **The User Experience:**
    *   The user clicks the link.
    *   They are taken to your Django backend at `/accounts/google/login/`.
    *   `django-allauth` immediately redirects them to the official Google consent screen.
    *   The user approves.
    *   Google redirects the user back to your Django backend with an authorization code.
    *   `django-allauth` transparently handles the callback, creates/updates the user, and establishes a session by setting a secure, `HttpOnly` session cookie.
    *   Finally, Django redirects the user to the `LOGIN_REDIRECT_URL` you defined in your settings (e.g., `http://localhost:5173/dashboard`).

3.  **Staying Logged In:** Because Django set a session cookie, any subsequent requests your frontend makes to the Django API (e.g., `fetch('/api/user')`) will automatically be authenticated. Your `fetch` calls just need to include `credentials: 'include'`.

This session-based approach is secure and simple. If you absolutely need JWTs, you can customize the `allauth` flow to issue a JWT upon successful login, but for most web apps, standard sessions are perfectly fine and often more secure.

