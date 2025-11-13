import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import {
  button,
  buttonContainer,
  container,
  h1,
  main,
  text,
} from '@/emails/email-styles'

interface WelcomeEmailProps {
  name: string
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to our platform!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome {name}! 🎉</Heading>
        <Text style={text}>
          {"Thanks for joining us. We're excited to have you on board!"}
        </Text>
        <Text style={text}>
          If you have any questions, feel free to reach out to our support team.
        </Text>
        <Section style={buttonContainer}>
          <Button
            style={button}
            href={`${process.env.BETTER_AUTH_URL}/dashboard`}
          >
            Get Started
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail
