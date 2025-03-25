Follow the following steps exactly as described. I want you to really ultrathink about your response before answering. Use coding best practices and use a moderate amount of comments to explain what's going on.

1. Add Stripe to my current app. Use the below working example to model off of for stripe integration. 
2. Use these keys for initial setup:
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51XYZabcdefghijklmnopqrstuvwxyz
VITE_STRIPE_SECRET_KEY=sk_test_51XYZabcdefghijklmnopqrstuvwxyz
VITE_STRIPE_WEBHOOK_SECRET=whsec_51XYZabcdefghijklmnopqrstuvwxyz
VITE_STRIPE_CLIENT_SECRET=cs_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z

The below is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
File Summary
================================================================

Purpose:
--------
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

File Format:
------------
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A separator line (================)
  b. The file path (File: path/to/file)
  c. Another separator line
  d. The full contents of the file
  e. A blank line

Usage Guidelines:
-----------------
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

Notes:
------
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/components/ui/**, **/.docs/**, **/.support/**, **/*.md, **/routeTree.gen.ts, **/obj/**
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded

Additional Info:
----------------

================================================================
Directory Structure
================================================================
.gitignore
.instructions/stripe_frontend.js
.repomix/bundles.json
eslint.config.js
index.html
package.json
public/vite.svg
react-cizzle-template-2025.client.esproj
src/api/stripe.ts
src/App.css
src/App.tsx
src/assets/react.svg
src/components/Layout.tsx
src/components/StripeProvider.tsx
src/components/SubscriptionPlans.tsx
src/components/SubscriptionSuccess.tsx
src/context/SubscriptionContext.tsx
src/index.css
src/main.tsx
src/pages/About.tsx
src/pages/Home.tsx
src/pages/Test.tsx
src/router.tsx
src/styles/About.css
src/styles/Home.css
src/styles/Layout.css
src/vite-env.d.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts

================================================================
Files
================================================================

================
File: .gitignore
================
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

================
File: .instructions/stripe_frontend.js
================
import React, { useState, useEffect } from 'react';
import './App.css';

const ProductDisplay = () => (

  <section>
    <div className="product">
      <Logo />
      <div className="description">
        <h3>Starter plan</h3>
        <h5>$20.00 / month</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      {/* Add a hidden field with the lookup_key of your Price */}
      <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const SuccessDisplay = ({ sessionId }) => {
return (
<section>
<div className="product Box-root">
<Logo />
<div className="description Box-root">
<h3>Subscription to starter plan successful!</h3>
</div>
</div>
<form action="/create-portal-session" method="POST">
<input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
<button id="checkout-and-portal-button" type="submit">
Manage your billing information
</button>
</form>
</section>
);
};

const Message = ({ message }) => (

  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
let [message, setMessage] = useState('');
let [success, setSuccess] = useState(false);
let [sessionId, setSessionId] = useState('');

useEffect(() => {
// Check to see if this is a redirect back from Checkout
const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }

}, [sessionId]);

if (!success && message === '') {
return <ProductDisplay />;
} else if (success && sessionId !== '') {
return <SuccessDisplay sessionId={sessionId} />;
} else {
return <Message message={message} />;
}
}

const Logo = () => (
<svg
xmlns="http://www.w3.org/2000/svg"
xmlnsXlink="http://www.w3.org/1999/xlink"
width="14px"
height="16px"
viewBox="0 0 14 16"
version="1.1"

>

    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>

  </svg>
);

================
File: .repomix/bundles.json
================
{
  "bundles": {}
}

================
File: eslint.config.js
================
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)

================
File: index.html
================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

================
File: package.json
================
{
  "name": "react-cizzle-template-2025.client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@clerk/clerk-react": "^5.24.1",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.4.7",
    "@mui/material": "^6.4.7",
    "@stripe/react-stripe-js": "^3.3.0",
    "@stripe/stripe-js": "^5.10.0",
    "@tanstack/react-router": "^1.112.18",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/node": "^20",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.24.1",
    "vite": "^6.2.0"
  }
}

================
File: public/vite.svg
================
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>

================
File: react-cizzle-template-2025.client.esproj
================
<Project Sdk="Microsoft.VisualStudio.JavaScript.Sdk/1.0.2191419">
  <PropertyGroup>
    <StartupCommand>npm run dev</StartupCommand>
    <JavaScriptTestRoot>src\</JavaScriptTestRoot>
    <JavaScriptTestFramework>Vitest</JavaScriptTestFramework>
    <!-- Allows the build (or compile) script located on package.json to run on Build -->
    <ShouldRunBuildScript>false</ShouldRunBuildScript>
    <!-- Folder where production build objects will be placed -->
    <BuildOutputFolder>$(MSBuildProjectDirectory)\dist</BuildOutputFolder>
  </PropertyGroup>
</Project>

================
File: src/api/stripe.ts
================
/**
 * Stripe API client for handling subscription operations
 */

/**
 * Creates a Stripe checkout session for subscription
 * @param priceId The Stripe Price ID for the subscription
 * @param customerId The customer ID (from Clerk)
 * @param customerEmail The customer's email address
 * @param token The authentication token from Clerk
 * @returns The checkout session URL
 */
export async function createCheckoutSession(
  priceId: string,
  customerId: string,
  customerEmail: string | null | undefined,
  token: string
): Promise<string> {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      priceId,
      customerId,
      customerEmail,
      successUrl: `${window.location.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/subscription?canceled=true`,
    }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || "Failed to create checkout session");
  }

  const { url } = await response.json();
  return url;
}

/**
 * Creates a Stripe customer portal session for subscription management
 * @param customerId The customer ID (from Clerk)
 * @param token The authentication token from Clerk
 * @returns The customer portal URL
 */
export async function createPortalSession(
  customerId: string,
  token: string
): Promise<string> {
  const response = await fetch("/api/create-portal-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      customerId,
      returnUrl: `${window.location.origin}/subscription`,
    }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || "Failed to create portal session");
  }

  const { url } = await response.json();
  return url;
}

/**
 * Fetches subscription details by session ID
 * @param sessionId The Stripe Checkout Session ID
 * @param token The authentication token from Clerk
 * @returns The subscription details
 */
export async function getSubscriptionDetails(
  sessionId: string,
  token: string
): Promise<{
  planName: string;
  nextBillingDate: string;
  subscriptionId: string;
}> {
  const response = await fetch(
    `/api/subscription-details?session_id=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      errorData.message || "Failed to fetch subscription details"
    );
  }

  return await response.json();
}

/**
 * Checks if the current user has an active subscription
 * @param userId The user ID (from Clerk)
 * @param token The authentication token from Clerk
 * @returns Whether the user has an active subscription
 */
export async function checkSubscriptionStatus(
  userId: string,
  token: string
): Promise<{
  isActive: boolean;
  planId?: string;
  planName?: string;
}> {
  const response = await fetch(`/api/subscription-status?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || "Failed to check subscription status");
  }

  return await response.json();
}

================
File: src/App.css
================
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

th,
td {
  padding-left: 1rem;
  padding-right: 1rem;
}

.weather-container {
  max-width: 900px;
  margin: 0 auto;
}

.weather-container h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.weather-container p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.weather-table-container {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.weather-table {
  width: 100%;
  border-collapse: collapse;
}

.weather-table th {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1rem;
  text-align: left;
}

.weather-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.weather-table tr:last-child td {
  border-bottom: none;
}

.weather-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.weather-table tr:hover {
  background-color: #f5f5f5;
}

.loading-message {
  padding: 2rem;
  text-align: center;
  color: #7f8c8d;
}

================
File: src/App.tsx
================
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Forecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

function App() {
  const [forecasts, setForecasts] = useState<Forecast[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    populateWeatherData();
  }, []);

  async function populateWeatherData() {
    try {
      const response = await fetch("weatherforecast");
      if (response.ok) {
        const data = await response.json();
        setForecasts(data);
      } else {
        setError(true);
      }
    } catch {
      // Ignore the specific error but set error state to true
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error || !forecasts) {
      return (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="body1" color="error">
            <em>
              Loading... Please refresh once the ASP.NET backend has started.
              See{" "}
              <Link href="https://aka.ms/jspsintegrationreact" target="_blank">
                https://aka.ms/jspsintegrationreact
              </Link>{" "}
              for more details.
            </em>
          </Typography>
        </Box>
      );
    }

    return (
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-labelledby="tableLabel">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Temp. (C)</TableCell>
              <TableCell>Temp. (F)</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecasts.map((forecast) => (
              <TableRow
                key={forecast.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {forecast.date}
                </TableCell>
                <TableCell>{forecast.temperatureC}</TableCell>
                <TableCell>{forecast.temperatureF}</TableCell>
                <TableCell>{forecast.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          Weather Forecast
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          This component demonstrates fetching data from the server.
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;

================
File: src/assets/react.svg
================
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>

================
File: src/components/Layout.tsx
================
import { useState } from "react";
import { Link as RouterLink, Outlet } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import InfoIcon from "@mui/icons-material/Info";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { EmergencyOutlined } from "@mui/icons-material";

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { text: "Home", path: "/", icon: <HomeIcon /> },
  { text: "Weather", path: "/weather", icon: <WbSunnyIcon /> },
  { text: "Subscription", path: "/subscription", icon: <CardMembershipIcon /> },
  { text: "About", path: "/about", icon: <InfoIcon /> },
  { text: "Test", path: "/test", icon: <EmergencyOutlined /> },
];

const drawerWidth = 240;

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Weather App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                textAlign: "center",
                "&.active": {
                  backgroundColor: "rgba(25, 118, 210, 0.12)",
                },
              }}
            >
              <Box sx={{ mr: 1 }}>{item.icon}</Box>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="static" sx={{ width: "100%" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: "block" }}
            >
              React Weather App
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    "&.active": {
                      backgroundColor: "rgba(255, 255, 255, 0.12)",
                    },
                  }}
                >
                  {item.icon}
                  {item.text}
                </Button>
              ))}
            </Box>
            <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ borderRadius: 2 }}
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ mt: 3, mb: 3, flexGrow: 1, px: { xs: 2, sm: 3 } }}
      >
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            &copy; {new Date().getFullYear()} React Weather App
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

================
File: src/components/StripeProvider.tsx
================
import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load the Stripe publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface StripeProviderProps {
  children: ReactNode;
}

export function StripeProvider({ children }: StripeProviderProps) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

================
File: src/components/SubscriptionPlans.tsx
================
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useUser, useAuth } from "@clerk/clerk-react";
import { createCheckoutSession, checkSubscriptionStatus } from "../api/stripe";

// Define the subscription plans
const PLANS = [
  {
    id: "monthly",
    name: "Monthly Plan",
    description: "Perfect for individuals",
    price: "$9.99",
    period: "month",
    features: [
      "Full access to all features",
      "Priority support",
      "Regular updates",
      "Cancel anytime",
    ],
    priceId: "price_monthly", // This would be your actual Stripe price ID
  },
  {
    id: "annual",
    name: "Annual Plan",
    description: "Best value for committed users",
    price: "$99.99",
    period: "year",
    features: [
      "Everything in Monthly Plan",
      "2 months free",
      "Premium support",
      "Early access to new features",
    ],
    priceId: "price_annual", // This would be your actual Stripe price ID
    isBestValue: true,
  },
];

export function SubscriptionPlans() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<{
    isActive: boolean;
    planId?: string;
    planName?: string;
  } | null>(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);

  // Check if the user is on a canceled page redirect
  const isCanceled =
    new URLSearchParams(window.location.search).get("canceled") === "true";

  // Check subscription status when the component mounts
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!isSignedIn || !user) return;

      try {
        setIsCheckingSubscription(true);
        const token = (await getToken({ template: "default" })) || "";
        if (!token) {
          console.error("Failed to get auth token");
          return;
        }

        const status = await checkSubscriptionStatus(user.id, token);
        setActiveSubscription(status);
      } catch (err) {
        console.error("Error checking subscription status:", err);
        // Don't show an error, just assume no active subscription
      } finally {
        setIsCheckingSubscription(false);
      }
    };

    fetchSubscriptionStatus();
  }, [isSignedIn, user, getToken]);

  // Function to handle subscription checkout
  const handleSubscribe = async (priceId: string, planId: string) => {
    if (!isSignedIn || !user) {
      setError("You must be logged in to subscribe");
      return;
    }

    try {
      setIsLoading({ ...isLoading, [planId]: true });
      setError(null);

      // Get the authentication token from Clerk
      const token = (await getToken({ template: "default" })) || "";
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      const email = user.primaryEmailAddress?.emailAddress || "";

      // Create a checkout session using our API utility
      const url = await createCheckoutSession(priceId, user.id, email, token);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading({ ...isLoading, [planId]: false });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Select the subscription that best fits your needs
        </Typography>

        {!isSignedIn && (
          <Alert severity="info" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            Please sign in to purchase a subscription
          </Alert>
        )}

        {isCanceled && (
          <Alert severity="info" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            Your checkout was canceled. You can try again when you're ready.
          </Alert>
        )}

        {activeSubscription?.isActive && (
          <Alert severity="success" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            You already have an active subscription to the{" "}
            {activeSubscription.planName} plan.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            {error}
          </Alert>
        )}
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {PLANS.map((plan) => {
          const isActivePlan =
            activeSubscription?.isActive &&
            activeSubscription.planId === plan.priceId;

          return (
            <Grid item xs={12} sm={6} md={5} key={plan.id}>
              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRadius: 2,
                  overflow: "visible",
                  ...(plan.isBestValue
                    ? {
                        borderTop: "4px solid #1976d2",
                      }
                    : {}),
                  ...(isActivePlan
                    ? {
                        border: "2px solid #4caf50",
                      }
                    : {}),
                }}
              >
                {plan.isBestValue && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: 20,
                      bgcolor: "#1976d2",
                      color: "white",
                      py: 0.5,
                      px: 2,
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Best Value
                  </Paper>
                )}

                {isActivePlan && (
                  <Chip
                    label="Current Plan"
                    color="success"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  />
                )}

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    {plan.description}
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Typography variant="h3" component="p" color="primary">
                      {plan.price}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ ml: 1 }}
                      >
                        / {plan.period}
                      </Typography>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} disableGutters sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    color={plan.isBestValue ? "primary" : "inherit"}
                    disabled={
                      !isSignedIn ||
                      isLoading[plan.id] ||
                      isCheckingSubscription ||
                      isActivePlan
                    }
                    onClick={() => handleSubscribe(plan.priceId, plan.id)}
                    sx={{ py: 1.5 }}
                  >
                    {isLoading[plan.id]
                      ? "Processing..."
                      : isActivePlan
                      ? "Current Plan"
                      : "Subscribe"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

================
File: src/components/SubscriptionSuccess.tsx
================
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export function SubscriptionSuccess() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    planName: string;
    nextBillingDate: string;
    subscriptionId: string;
  } | null>(null);

  useEffect(() => {
    // Get the session_id from URL parameters
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId && isSignedIn) {
      fetchSubscriptionDetails(sessionId);
    } else if (!isSignedIn) {
      setError("You need to be signed in to view subscription details");
      setLoading(false);
    } else {
      setError("No subscription information found");
      setLoading(false);
    }
  }, [isSignedIn]);

  const fetchSubscriptionDetails = async (sessionId: string) => {
    try {
      const token = await getToken();

      const response = await fetch(
        `/api/subscription-details?session_id=${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subscription details");
      }

      const data = await response.json();
      setSubscriptionDetails(data);
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      setError("Could not load subscription details");
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    if (!isSignedIn) {
      setError("You must be logged in to manage your subscription");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error("Error creating portal session:", err);
      setError("Could not access billing portal");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading subscription details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button component={Link} to="/" variant="contained" color="primary">
          Return to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{ bgcolor: "primary.main", py: 3, px: 2, textAlign: "center" }}
        >
          <CheckCircleIcon sx={{ fontSize: 60, color: "white" }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "white", mt: 2 }}
          >
            Subscription Successful!
          </Typography>
        </Box>

        <CardContent sx={{ py: 4, px: 3 }}>
          {subscriptionDetails ? (
            <>
              <Typography variant="h6" gutterBottom>
                Thank you for subscribing to our {subscriptionDetails.planName}{" "}
                plan!
              </Typography>
              <Typography variant="body1" paragraph>
                Your subscription is now active. You have access to all the
                premium features included in your plan.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Next billing date: {subscriptionDetails.nextBillingDate}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Subscription ID: {subscriptionDetails.subscriptionId}
              </Typography>

              <Box
                sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
              >
                <Button component={Link} to="/" variant="outlined">
                  Return to Home
                </Button>
                <Button
                  variant="contained"
                  onClick={handleManageBilling}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Manage Billing"}
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">
              Subscription information not available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

================
File: src/context/SubscriptionContext.tsx
================
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { checkSubscriptionStatus } from "../api/stripe";

interface SubscriptionContextType {
  isActive: boolean;
  planId: string | undefined;
  planName: string | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const defaultContext: SubscriptionContextType = {
  isActive: false,
  planId: undefined,
  planName: undefined,
  isLoading: true,
  refetch: async () => {},
};

const SubscriptionContext =
  createContext<SubscriptionContextType>(defaultContext);

export const useSubscription = () => useContext(SubscriptionContext);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [planId, setPlanId] = useState<string | undefined>(undefined);
  const [planName, setPlanName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscriptionStatus = async () => {
    if (!isSignedIn || !user) {
      setIsActive(false);
      setPlanId(undefined);
      setPlanName(undefined);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const token = (await getToken({ template: "default" })) || "";

      if (!token) {
        console.error("Failed to get auth token");
        setIsLoading(false);
        return;
      }

      const status = await checkSubscriptionStatus(user.id, token);

      setIsActive(status.isActive);
      setPlanId(status.planId);
      setPlanName(status.planName);
    } catch (err) {
      console.error("Error fetching subscription status:", err);
      setIsActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [isSignedIn, user]);

  const value: SubscriptionContextType = {
    isActive,
    planId,
    planName,
    isLoading,
    refetch: fetchSubscriptionStatus,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

================
File: src/index.css
================
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

================
File: src/main.tsx
================
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ClerkProvider } from "@clerk/clerk-react";
import { StripeProvider } from "./components/StripeProvider";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { router } from "./router";
import "./index.css";

// Get the Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

// Initialize the router
void router.load();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <StripeProvider>
        <SubscriptionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* @ts-expect-error - Type compatibility between router versions */}
            <RouterProvider router={router} />
          </ThemeProvider>
        </SubscriptionProvider>
      </StripeProvider>
    </ClerkProvider>
  </StrictMode>
);

================
File: src/pages/About.tsx
================
import {
  Box,
  Card,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";

export function AboutPage() {
  const technologies = [
    "React 19",
    "TypeScript",
    "TanStack Router",
    "Material UI",
    "Vite",
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
        >
          About This Application
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Stack spacing={4}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <InfoIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2" color="primary">
                  Project Overview
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                This weather forecasting application is a demonstration of
                modern React development techniques, including the use of
                TanStack Router for client-side routing and Material UI for the
                user interface. The application fetches weather forecast data
                from a backend API and presents it in a clean, user-friendly
                interface.
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CodeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2" color="primary">
                  Technologies Used
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
                {technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="primary"
                    variant="outlined"
                    size="medium"
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <StorageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2" color="primary">
                  Data Source
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Weather data is sourced from the project's backend API, which
                provides sample weather forecasts for demonstration purposes.
                The data is fetched asynchronously and displayed in a tabular
                format on the Weather page.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Card sx={{ p: 3, backgroundColor: "#f5f9ff" }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            This project was created as a demonstration of integrating TanStack
            Router with Material UI in a React application. It showcases a
            responsive design with multiple page routes and data fetching
            capabilities.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}

================
File: src/pages/Home.tsx
================
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import DevicesIcon from "@mui/icons-material/Devices";
import BarChartIcon from "@mui/icons-material/BarChart";

export function HomePage() {
  const theme = useTheme();

  const features = [
    {
      title: "Real-time Data",
      description:
        "View up-to-date weather information fetched from a backend API.",
      icon: <CloudIcon fontSize="large" color="primary" />,
    },
    {
      title: "Clean UI",
      description:
        "Experience a clean and responsive user interface built with React and Material UI.",
      icon: <DevicesIcon fontSize="large" color="primary" />,
    },
    {
      title: "Modern Routing",
      description: "Navigate seamlessly between pages with TanStack Router.",
      icon: <BarChartIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          color="primary"
          sx={{
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Welcome to the Weather App
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          This is a simple weather application that demonstrates the use of
          TanStack Router with React and Material UI. Check out the Weather tab
          to see current weather forecasts.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
                elevation={3}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

================
File: src/pages/Test.tsx
================
import {
  Box,
  Card,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import { useSession } from "@clerk/clerk-react";

export function TestPage() {
  const { isLoaded, session, isSignedIn } = useSession();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
        >
          TEST PAGE
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          {isSignedIn ? "Signed in" : "Signed out"}
        </Paper>

        {/* <Card sx={{ p: 3, backgroundColor: "#f5f9ff" }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            This project was created as a demonstration of integrating TanStack
            Router with Material UI in a React application. It showcases a
            responsive design with multiple page routes and data fetching
            capabilities.
          </Typography>
        </Card> */}
      </Box>
    </Box>
  );
}

================
File: src/router.tsx
================
import {
  createRoute,
  RootRoute,
  createRouter,
  createRootRoute,
} from "@tanstack/react-router";
import App from "./App";
import { AboutPage } from "./pages/About";
import { HomePage } from "./pages/Home";
import { Layout } from "./components/Layout";
import { SubscriptionPlans } from "./components/SubscriptionPlans";
import { SubscriptionSuccess } from "./components/SubscriptionSuccess";
import { TestPage } from "./pages/Test";

// Define the root route with a layout component
const rootRoute = createRootRoute({
  component: Layout,
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const weatherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/weather",
  component: App, // Use the existing App component with Weather logic
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/test",
  component: TestPage,
});

// Add subscription routes
const subscriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subscription",
  component: SubscriptionPlans,
});

const subscriptionSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subscription/success",
  component: SubscriptionSuccess,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  weatherRoute,
  aboutRoute,
  subscriptionRoute,
  subscriptionSuccessRoute,
  testRoute,
]);

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

================
File: src/styles/About.css
================
.about-page {
  max-width: 800px;
  margin: 0 auto;
}

.about-page h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
}

.about-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.about-section {
  margin-bottom: 2rem;
}

.about-section:last-child {
  margin-bottom: 0;
}

.about-section h2 {
  color: #3498db;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.about-section p {
  line-height: 1.6;
  color: #34495e;
}

.tech-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  padding-left: 1.5rem;
}

.tech-list li {
  color: #34495e;
  padding: 0.25rem 0;
}

================
File: src/styles/Home.css
================
.home-page {
  max-width: 900px;
  margin: 0 auto;
}

.home-page h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
}

.home-page > p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #34495e;
  margin-bottom: 2.5rem;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  color: #3498db;
  margin-bottom: 0.75rem;
  font-size: 1.4rem;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.5;
}

================
File: src/styles/Layout.css
================
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
}

.nav a:hover {
  color: #3498db;
}

.nav a.active {
  color: #3498db;
}

.nav a.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3498db;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

================
File: src/vite-env.d.ts
================
/// <reference types="vite/client" />

================
File: tsconfig.app.json
================
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

================
File: tsconfig.json
================
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

================
File: tsconfig.node.json
================
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

================
File: vite.config.ts
================
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "react-cizzle-template-2025.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        throw new Error("Could not create certificate.");
    }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7254';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/weatherforecast': {
                target,
                secure: false
            }
        },
        port: parseInt(env.DEV_SERVER_PORT || '63621'),
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})



================================================================
End of Codebase
================================================================
