import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import {
  button,
  buttonContainer,
  container,
  h1,
  link,
  main,
  text,
} from '@/emails/email-styles'

interface VerifyEmailProps {
  name: string
  verificationUrl: string
}

export const VerifyEmail = ({ name, verificationUrl }: VerifyEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verify your email</Heading>
        <Text style={text}>Hi {name},</Text>
        <Text style={text}>
          Please verify your email address by clicking the button below:
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={verificationUrl}>
            Verify Email
          </Button>
        </Section>
        <Text style={text}>Or copy and paste this URL into your browser:</Text>
        <Link href={verificationUrl} style={link}>
          {verificationUrl}
        </Link>
        <Text style={text}>
          {
            "This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email."
          }
        </Text>
      </Container>
    </Body>
  </Html>
)
