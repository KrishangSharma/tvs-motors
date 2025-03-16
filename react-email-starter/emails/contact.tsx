import { ContactEmailProps } from "@/types";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Hr,
} from "@react-email/components";
import { format } from "date-fns";

export const ContactEmail = ({
  name = "John Doe",
  email = "john.doe@example.com",
  phoneNumber = "1234567890",
  message = "This is a sample message.",
  requestId = "CONTACT-123456",
  requestDate = new Date(),
}: ContactEmailProps) => {
  const formattedDate = format(new Date(requestDate), "dd MMMM yyyy");

  return (
    <Html>
      <Head />
      <Preview>Contact Form Submission - {requestId}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="Company Logo"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>Thank You for Contacting Us</Heading>

            <Text style={paragraph}>
              Dear <strong>{name}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for reaching out to us. We have received your message
              and will get back to you as soon as possible.
            </Text>

            {/* Request Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Contact Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Reference ID:</Column>
                <Column style={detailValue}>{requestId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Submission Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>
            </Section>

            {/* Message Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Your Message
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Name:</Column>
                <Column style={detailValue}>{name}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>{email}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Phone Number:</Column>
                <Column style={detailValue}>{phoneNumber}</Column>
              </Row>

              <Row style={messageRow}>
                <Column style={messageLabel}>Message:</Column>
              </Row>
              <Row style={messageRow}>
                <Column style={messageContent}>{message}</Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Next Steps */}
            <Text style={paragraph}>
              Our team will review your message and respond to you within 1-2
              business days. If your matter is urgent, please contact our
              customer service team directly:
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:support@company.com" style={link}>
                support@company.com
              </Link>
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={paragraph}>
              Thank you for choosing our services. We look forward to assisting
              you.
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              Customer Support Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link
                href="https://www.company.com/privacy-policy"
                style={footerLink}
              >
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link href="https://www.company.com/terms" style={footerLink}>
                Terms & Conditions
              </Link>{" "}
              •{" "}
              <Link href="https://www.company.com/contact" style={footerLink}>
                Contact Us
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmail;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  borderBottom: "1px solid #eaeaea",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px",
};

const heading = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#4F46E5", // Indigo color for a professional feel
  textAlign: "center" as const,
  margin: "0 0 30px",
};

const subheading = {
  fontSize: "18px",
  lineHeight: "1.3",
  fontWeight: "600",
  color: "#333333",
  margin: "20px 0 10px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "16px 0",
};

const detailsSection = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "4px",
  margin: "20px 0",
};

const detailRow = {
  margin: "8px 0",
};

const detailLabel = {
  width: "40%",
  fontSize: "14px",
  color: "#666666",
  fontWeight: "600",
};

const detailValue = {
  width: "60%",
  fontSize: "14px",
  color: "#333333",
};

const messageRow = {
  margin: "8px 0",
};

const messageLabel = {
  fontSize: "14px",
  color: "#666666",
  fontWeight: "600",
};

const messageContent = {
  fontSize: "14px",
  color: "#333333",
  padding: "10px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  border: "1px solid #eaeaea",
};

const divider = {
  borderColor: "#eaeaea",
  margin: "30px 0",
};

const contactInfo = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "8px 0",
};

const link = {
  color: "#4F46E5",
  textDecoration: "none",
};

const signature = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "30px 0 0",
};

const footer = {
  backgroundColor: "#f5f5f5",
  padding: "20px",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  borderTop: "1px solid #eaeaea",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#666666",
  margin: "8px 0",
};

const footerLinks = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#666666",
  margin: "8px 0",
};

const footerLink = {
  color: "#4F46E5",
  textDecoration: "none",
  margin: "0 5px",
};
