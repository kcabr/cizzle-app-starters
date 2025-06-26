# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack web application template using:
- **Frontend**: TanStack Start (React framework) with Shadcn UI components
- **Backend**: Django REST Framework with django-allauth for authentication
- **Python Package Manager**: uv (for backend)
- **Database**: SQLite (development), configurable for production

## Common Development Commands

### Backend (Django) - Run from `/backend` directory

```bash
# Install dependencies (including dev dependencies)
uv pip install -e .[dev]

# Run database migrations
uv run python manage.py migrate

# Create database migrations
uv run python manage.py makemigrations

# Start development server (runs on http://localhost:8000)
uv run python manage.py runserver

# Run tests
uv run python manage.py test

# Create superuser
uv run python manage.py createsuperuser

# Format code
uv run black .

# Lint code
uv run ruff check .
```

### Frontend (TanStack Start) - Run from `/frontend` directory

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Architecture Overview

### Backend Structure (`/backend`)
- **Django Project**: Located at `backend/project/`
- **API App**: `backend/api/` - Contains all API endpoints and business logic
- **Authentication**: Uses django-allauth for social auth (Google, GitHub) and djangorestframework-simplejwt for JWT tokens
- **CORS**: Configured to allow requests from frontend (default: http://localhost:3000)
- **Environment Variables**: Managed via `.env` file (see `.env.example`)

### Frontend Structure (`/frontend`)
- **TanStack Start**: File-based routing in `src/routes/`
- **State Management**: Redux Toolkit with slices in `src/store/slices/`
- **UI Components**: Shadcn components in `src/components/ui/`
- **API Client**: Uses redaxios for HTTP requests to Django backend
- **Authentication**: Session-based with HttpOnly cookies from Django

## Key API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/token/` - Login (returns JWT tokens)
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/user/` - Get current user (requires auth)

### Social Authentication
- `GET /accounts/google/login/` - Google OAuth login
- `GET /accounts/github/login/` - GitHub OAuth login
- `GET /accounts/logout/` - Logout

## Important Configuration Files

### Backend
- `backend/project/settings.py` - Django settings with allauth configuration
- `backend/.env` - Environment variables (SECRET_KEY, OAuth credentials)
- `backend/pyproject.toml` - Python dependencies

### Frontend
- `frontend/app.config.ts` - TanStack Start configuration
- `frontend/src/api.ts` - API client configuration
- `frontend/package.json` - Node dependencies
- `frontend/components.json` - Shadcn UI configuration

## Authentication Flow

1. Frontend displays "Sign in with Google/GitHub" link pointing to Django backend
2. User clicks link, redirected to OAuth provider
3. After authorization, user redirected back to Django callback URL
4. Django creates/updates user, sets session cookie
5. Django redirects to frontend with authenticated session
6. Frontend requests include session cookie for authentication

## Development Notes

- Frontend runs on port 3000, backend on port 8000
- CORS is configured for local development
- SQLite database file is at `backend/db.sqlite3`
- Static files served by Django in development
- TanStack Router generates route types automatically
- Shadcn components can be added via CLI tools

## Testing

- Backend: Uses pytest-django for testing
- Frontend: TanStack Start supports Vitest (configuration needed)
- Run backend tests with `uv run python manage.py test`

## Environment Variables

Backend requires these in `.env`:
- `SECRET_KEY` - Django secret key
- `DEBUG` - Debug mode (True/False)
- `GOOGLE_OAUTH_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_OAUTH_CLIENT_SECRET` - Google OAuth secret
- `GITHUB_OAUTH_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_OAUTH_CLIENT_SECRET` - GitHub OAuth secret