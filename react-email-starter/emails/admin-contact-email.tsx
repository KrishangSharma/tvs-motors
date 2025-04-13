import type { ContactEmailProps } from "@/types";
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
  Button,
} from "@react-email/components";
import { format } from "date-fns";

export const AdminContactEmail = ({
  name = "John Doe",
  email = "john.doe@example.com",
  phoneNumber = "1234567890",
  message = "This is a sample message.",
  requestId = "CONTACT-123456",
  requestDate = new Date(),
}: ContactEmailProps) => {
  const formattedDate = format(new Date(requestDate), "dd MMMM yyyy");
  const formattedTime = format(new Date(requestDate), "hh:mm a");

  return (
    <Html>
      <Head />
      <Preview>New Contact Form Submission - {requestId}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={adminHeader}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="Company Logo"
              style={logo}
            />
            <Text style={adminHeaderText}>ADMIN NOTIFICATION</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>New Contact Form Submission</Heading>

            <Text style={paragraph}>
              A new contact form has been submitted with the following details:
            </Text>

            {/* Request Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Submission Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Reference ID:</Column>
                <Column style={detailValue}>{requestId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Time:</Column>
                <Column style={detailValue}>{formattedTime}</Column>
              </Row>
            </Section>

            {/* Customer Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Customer Information
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
            </Section>

            {/* Message Content */}
            <Section style={messageSection}>
              <Heading as="h2" style={subheading}>
                Message
              </Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={divider} />

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Text style={actionText}>
                Please review this contact submission and take appropriate
                action:
              </Text>
              <Section style={buttonContainer}>
                <Button
                  href={`https://admin.tvsmotor.com/contacts/${requestId}`}
                  style={primaryButton}
                >
                  View Full Details
                </Button>
                <Button
                  href={`https://admin.tvsmotor.com/contacts/${requestId}/respond`}
                  style={secondaryButton}
                >
                  Respond to Customer
                </Button>
              </Section>
            </Section>

            <Text style={paragraph}>
              This is an automated notification. Please do not reply to this
              email.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} TVS Motor. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link href="https://admin.tvsmotor.com" style={footerLink}>
                Admin Portal
              </Link>{" "}
              •{" "}
              <Link
                href="https://admin.tvsmotor.com/settings"
                style={footerLink}
              >
                Notification Settings
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminContactEmail;

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

const adminHeader = {
  backgroundColor: "#1e293b", // Dark blue header for admin emails
  padding: "20px",
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  textAlign: "center" as const,
};

const adminHeaderText = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "10px 0 0",
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
  color: "#1e293b", // Dark blue for admin emails
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

const messageSection = {
  backgroundColor: "#f0f7ff",
  padding: "20px",
  borderRadius: "4px",
  margin: "20px 0",
  borderLeft: "4px solid #1e293b",
};

const messageText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#333333",
  margin: "10px 0",
  whiteSpace: "pre-line" as const,
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

const divider = {
  borderColor: "#eaeaea",
  margin: "30px 0",
};

const actionSection = {
  margin: "20px 0",
};

const actionText = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "0 0 15px",
  textAlign: "center" as const,
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "20px 0",
};

const primaryButton = {
  backgroundColor: "#1e293b",
  borderRadius: "4px",
  color: "#fff",
  fontWeight: "600",
  padding: "12px 20px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  margin: "0 10px 10px 0",
};

const secondaryButton = {
  backgroundColor: "#ffffff",
  borderRadius: "4px",
  color: "#1e293b",
  fontWeight: "600",
  padding: "12px 20px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  margin: "0 0 10px 10px",
  border: "1px solid #1e293b",
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
  color: "#1e293b",
  textDecoration: "none",
  margin: "0 5px",
};
