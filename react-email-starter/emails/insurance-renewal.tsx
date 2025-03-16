import { InsuranceRenewalEmailProps } from "@/types";
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

export const InsuranceRenewalEmail = ({
  customerName = "John Doe",
  contactNumber = "1234567890",
  emailId = "john.doe@example.com",
  model = "Honda City",
  registrationNumber = "MH02AB1234",
  registrationYear = "2023",
  previousInsuranceCompany = "ACME Insurance",
  requestId = "INS-12345678",
  requestDate = new Date(),
}: InsuranceRenewalEmailProps) => {
  const parsedRequestDate = new Date(requestDate);
  const formattedDate = format(parsedRequestDate, "dd MMMM yyyy");

  return (
    <Html>
      <Head />
      <Preview>Insurance Renewal Request Confirmation - {requestId}</Preview>
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
            <Heading style={heading}>
              Insurance Renewal Request Received
            </Heading>

            <Text style={paragraph}>
              Dear <strong>{customerName}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for submitting your insurance renewal request. We have
              received your information and will process your request promptly.
            </Text>

            {/* Request Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Request Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Request ID:</Column>
                <Column style={detailValue}>{requestId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Submission Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>
            </Section>

            {/* Vehicle Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Vehicle Information
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Vehicle Model:</Column>
                <Column style={detailValue}>{model}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Registration Number:</Column>
                <Column style={detailValue}>{registrationNumber}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Registration Year:</Column>
                <Column style={detailValue}>{registrationYear}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Previous Insurance:</Column>
                <Column style={detailValue}>{previousInsuranceCompany}</Column>
              </Row>
            </Section>

            {/* Next Steps */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                What Happens Next?
              </Heading>

              <Text style={listItem}>
                • Our insurance team will review your renewal request
              </Text>
              <Text style={listItem}>
                • We will calculate your renewal premium based on your vehicle
                details
              </Text>
              <Text style={listItem}>
                • You&apos;ll receive a quote within 2 business days
              </Text>
              <Text style={listItem}>
                • Once approved, we&apos;ll send payment instructions to
                complete the renewal
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              If you have any questions about your renewal request or need to
              provide additional information, please contact our customer
              service team:
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:insurance@company.com" style={link}>
                insurance@company.com
              </Link>
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={paragraph}>
              Thank you for choosing us for your insurance needs. We appreciate
              your business and look forward to continuing to serve you.
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              The Insurance Team
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
              <Link href="https://www.company.com/insurance" style={footerLink}>
                Insurance Services
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default InsuranceRenewalEmail;

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
