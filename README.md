# Stears Article Platform with Authentication

A secure NextJS application featuring user authentication, protected article viewing, and responsive design.

## Features

- 🔐 Authentication
  - Email/Password sign in
  - Social authentication (Google, Facebook)
  - Protected routes
  - Form validation
  - Loading states

- 📱 Responsive Design
  - Mobile-first approach
  - Tailwind CSS styling
  - Optimized images

- 🧪 Testing
  - Jest and React Testing Library
  - Unit tests
  - Integration tests
  - Component testing

## Prerequisites

Before you begin, ensure you have:
- Node.js 16.x or later
- npm or yarn
- A Google Developer account (for OAuth)
- A Facebook Developer account (for OAuth)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/writeshittu/nextjs-auth.git

```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```env
# Auth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
FACEBOOK_ID=your-facebook-app-id
FACEBOOK_SECRET=your-facebook-app-secret

```

## OAuth Setup

### Google OAuth
1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Add authorized origins and redirect URIs
6. Copy the client ID and secret to your `.env.local`

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app or select an existing one
3. Add Facebook Login product
4. Set up OAuth redirect URIs
5. Copy the app ID and secret to your `.env.local`

## Development

Start the development server:
```bash
npm run dev
```
Visit http://localhost:3000

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Project Structure

```
├── components/          # Reusable components
│   ├── LoadingButton.tsx
│   └── ArticleGrid.tsx
├── pages/              # Next.js pages
│   ├── api/
│   │   └── auth/
│   ├── _app.tsx
│   ├── index.tsx
│   ├── signin.tsx
│   └── signup.tsx
├── lib/               # Utilities
│   └── validation.ts
├── styles/           # Global styles
│   └── globals.css
├── __tests__/        # Test files
│   └── pages/
└── public/           # Static files
```

## Authentication Flow

1. User accesses protected route
2. If not authenticated, redirected to sign in
3. User can:
   - Sign in with email/password
   - Use social authentication
   - Create new account
4. After successful authentication, redirected to original route

## Testing Strategy

### Unit Tests
- Validation functions
- Utility functions
- Individual components

### Integration Tests
- Authentication flow
- Protected routes
- Form submissions

### Component Tests
- Rendering
- User interactions
- Loading states
- Error states

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
