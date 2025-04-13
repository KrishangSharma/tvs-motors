import type { SuggestionFeedbackEmailProps } from "@/types";
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

export const AdminSuggestionFeedbackEmail = ({
  name,
  email,
  subject,
  message,
  rating,
  feedbackId,
  submissionDate = new Date(),
}: SuggestionFeedbackEmailProps) => {
  const formattedDate = format(new Date(submissionDate), "dd MMMM yyyy");
  const formattedTime = format(new Date(submissionDate), "hh:mm a");

  // Generate stars for rating display
  const generateStars = (rating?: number) => {
    if (!rating || rating === 0) return "No rating provided";

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    return `${stars} (${rating}/5)`;
  };

  return (
    <Html>
      <Head />
      <Preview>
        New Feedback Received - {subject} - {feedbackId}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={adminHeader}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="TVS Motor Logo"
              style={logo}
            />
            <Text style={adminHeaderText}>ADMIN NOTIFICATION</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>New Customer Feedback Received</Heading>

            <Text style={paragraph}>
              A new customer feedback has been submitted with the following
              details:
            </Text>

            {/* Feedback Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Feedback Summary
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Reference ID:</Column>
                <Column style={detailValue}>{feedbackId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Time:</Column>
                <Column style={detailValue}>{formattedTime}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Subject:</Column>
                <Column style={detailValue}>{subject}</Column>
              </Row>

              {rating !== undefined && rating > 0 && (
                <Row style={detailRow}>
                  <Column style={detailLabel}>Rating:</Column>
                  <Column style={detailValue}>
                    <Text style={ratingText}>{generateStars(rating)}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Customer Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Customer Information
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Name:</Column>
                <Column style={detailValue}>{name || "Not provided"}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>{email || "Not provided"}</Column>
              </Row>
            </Section>

            {/* Message Content */}
            <Section style={messageSection}>
              <Heading as="h2" style={subheading}>
                Feedback Message
              </Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={divider} />

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Text style={actionText}>
                Please review this feedback and take appropriate action:
              </Text>
              <Section style={buttonContainer}>
                <Button
                  href={`https://admin.tvsmotor.com/feedback/${feedbackId}`}
                  style={primaryButton}
                >
                  View Full Details
                </Button>
                {email && (
                  <Button
                    href={`https://admin.tvsmotor.com/feedback/${feedbackId}/respond`}
                    style={secondaryButton}
                  >
                    Respond to Customer
                  </Button>
                )}
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

export default AdminSuggestionFeedbackEmail;

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

const ratingText = {
  color: "#ff9500",
  letterSpacing: "2px",
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
