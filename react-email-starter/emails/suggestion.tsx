import { SuggestionFeedbackEmailProps } from "@/types";
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

export const SuggestionFeedbackEmail = ({
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
        Feedback Confirmation - {subject} - {feedbackId}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="TVS Motor Logo"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>Thank You for Your Feedback</Heading>

            {name && (
              <Text style={paragraph}>
                Dear <strong>{name}</strong>,
              </Text>
            )}

            <Text style={paragraph}>
              We greatly appreciate you taking the time to share your thoughts
              with us. Your feedback is valuable and will help us improve our
              products and services.
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

            {/* Message Content */}
            <Section style={messageSection}>
              <Heading as="h2" style={subheading}>
                Your Message
              </Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={divider} />

            {/* Next Steps */}
            <Section>
              <Heading as="h2" style={subheading}>
                What Happens Next?
              </Heading>
              <Text style={paragraph}>
                Our team reviews all feedback carefully.
                {email
                  ? " Since you've provided your email address, we may reach out to you if we need additional information or to share how we've addressed your feedback."
                  : " As you've chosen not to provide contact information, we won't be able to follow up directly, but rest assured your input is still valuable to us."}
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              If you have any additional thoughts or questions, please don't
              hesitate to contact us:
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:feedback@tvsmotor.com" style={link}>
                feedback@tvsmotor.com
              </Link>
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              The Customer Experience Team
              <br />
              TVS Motor
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} TVS Motor. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link
                href="https://www.tvsmotor.com/privacy-policy"
                style={footerLink}
              >
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link
                href="https://www.tvsmotor.com/terms-of-service"
                style={footerLink}
              >
                Terms of Service
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SuggestionFeedbackEmail;

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
  color: "#0066cc",
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
  borderLeft: "4px solid #0066cc",
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

const contactInfo = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "8px 0",
};

const link = {
  color: "#0066cc",
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
  color: "#0066cc",
  textDecoration: "none",
  margin: "0 5px",
};
