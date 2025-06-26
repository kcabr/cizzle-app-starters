# Django Backend

This is the Django backend for the project, providing authentication and API services.

## Setup

1. **Install dependencies:**
   ```bash
   uv pip install -e .[dev]
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Run database migrations:**
   ```bash
   uv run python manage.py migrate
   ```

4. **Start the development server:**
   ```bash
   uv run python manage.py runserver
   ```

The server will be available at `http://localhost:8000`.

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/token/` - Login (get JWT tokens)
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/user/` - Get current user info (requires authentication)

### Social Authentication
- `GET /accounts/google/login/` - Google OAuth login
- `GET /accounts/github/login/` - GitHub OAuth login
- `GET /accounts/logout/` - Logout

## OAuth Setup

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:8000/accounts/google/login/callback/`
6. Update `.env` file with your client ID and secret

### GitHub OAuth
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:8000/accounts/github/login/callback/`
4. Update `.env` file with your client ID and secret

## Development Commands

- **Run tests:** `uv run python manage.py test`
- **Create superuser:** `uv run python manage.py createsuperuser`
- **Make migrations:** `uv run python manage.py makemigrations`
- **Format code:** `uv run black .`
- **Lint code:** `uv run ruff check .`