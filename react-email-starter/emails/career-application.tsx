import { CareerApplicationEmailProps } from "@/types";
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

export const CareerApplicationEmail = ({
  fullName = "John Doe",
  email = "john.doe@example.com",
  phone = "9876543210",
  interestedProfile = "Frontend Developer",
  applicationId = "APP-12345678",
  applicationDate = new Date(),
  hasCoverLetter = false,
}: CareerApplicationEmailProps) => {
  const parsedStartDate = new Date(applicationDate);
  const formattedDate = format(parsedStartDate, "dd MMMM yyyy");

  // Map profile values to human-readable names
  const profileNames: { [key: string]: string } = {
    frontend: "Frontend Developer",
    backend: "Backend Developer",
    fullstack: "Full Stack Developer",
    "ui-ux": "UI/UX Designer",
    product: "Product Manager",
    qa: "QA Engineer",
    devops: "DevOps Engineer",
    other: "Other Position",
  };

  const displayProfile = profileNames[interestedProfile] || interestedProfile;

  return (
    <Html>
      <Head />
      <Preview>Your Career Application Confirmation - {applicationId}</Preview>
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
            <Heading style={heading}>Application Received</Heading>

            <Text style={paragraph}>
              Dear <strong>{fullName}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for your interest in joining our team. We're excited to
              confirm that we've received your application for the{" "}
              <strong>{displayProfile}</strong> position.
            </Text>

            {/* Application Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Application Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Application ID:</Column>
                <Column style={detailValue}>{applicationId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Position:</Column>
                <Column style={detailValue}>{displayProfile}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Submission Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Received Materials:</Column>
                <Column style={detailValue}>
                  Resume{hasCoverLetter ? ", Cover Letter" : ""}
                </Column>
              </Row>
            </Section>

            {/* Next Steps */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                What Happens Next?
              </Heading>

              <Text style={listItem}>
                • Our HR team will review your application
              </Text>
              <Text style={listItem}>
                • If your skills and experience match our requirements, we'll
                contact you for an initial interview
              </Text>
              <Text style={listItem}>
                • The hiring process typically takes 2-3 weeks from application
                to offer
              </Text>
              <Text style={listItem}>
                • We'll keep you updated on your application status via email
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              If you have any questions about your application or would like to
              provide additional information, please contact our HR team:
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:careers@company.com" style={link}>
                careers@company.com
              </Link>
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={paragraph}>
              Thank you for considering our company for your career. We
              appreciate your interest and look forward to potentially working
              with you.
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              The HR Team
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
              <Link href="https://www.company.com/careers" style={footerLink}>
                Careers
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default CareerApplicationEmail;

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

const listItem = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "8px 0",
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
