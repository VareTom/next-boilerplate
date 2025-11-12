# Boilerplate

A modern, full-stack Next.js application with authentication, internationalization, and email capabilities.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Email Service:** [Resend](https://resend.com/)
- **Email Templates:** [React Email](https://react.email/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (v8 or higher)
- A PostgreSQL database (or your preferred database)

## 🔐 Authentication

This project uses **Better Auth** for authentication, supporting:

- ✅ Email/Password authentication
- ✅ Google OAuth (social login)
- ✅ Session management
- ✅ Protected routes
- ✅ Email verification (via Resend)

### Authentication Flow

1. **Sign Up:** Users can register with email/password or Google
2. **Sign In:** Email/password or Google sign-in
3. **Session:** Automatic session management with cookies
4. **Protected Routes:** Middleware protects authenticated routes

## 🌍 Internationalization

The app supports multiple languages using **next-intl**:

- English (en)
- French (fr)

### Adding a New Language

1. Create a new translation file in `messages/`:

```bash
touch messages/es.json
```

2. Update the i18n configuration in `i18n/config.ts`:

```typescript
export const locales = ['en', 'fr', 'es'] as const
```

3. Add translations in `messages/es.json`

## 📧 Email Templates

Email templates are built with **React Email** and sent via **Resend**.

### Creating a New Email Template

1. Create a new file in `emails/`:

```typescript
// emails/welcome-email.tsx
import { Html, Button } from '@react-email/components'

export default function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <h1>Welcome, {name}!</h1>
      <Button href="https://example.com">Get Started</Button>
    </Html>
  )
}
```

2. Send the email using Resend:

```typescript
import { Resend } from 'resend'
import WelcomeEmail from '@/emails/welcome-email'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: user.email,
  subject: 'Welcome!',
  react: WelcomeEmail({ name: user.name }),
})
```

## 🗃️ Database

The project uses **Prisma** as the ORM with PostgreSQL (configurable).

### Common Prisma Commands

```bash
# Generate Prisma Client
pnpm prisma generate

# Create a migration
pnpm prisma migrate dev --name your_migration_name

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Reset database
pnpm prisma migrate reset

# Deploy migrations to production
pnpm prisma migrate deploy
```

## 📝 Form Validation

Forms use **React Hook Form** with **Zod** for type-safe validation:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Better Auth](https://www.better-auth.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Email](https://react.email/)
- [Resend](https://resend.com/)

---

Built with ❤️ using Next.js and modern web technologies.
