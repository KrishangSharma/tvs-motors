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

export interface TestRideConfirmationEmailProps {
  name: string;
  email: string;
  phone: string;
  vehicleName: string;
  variantName: string;
  bookingDate: Date;
  bookingTime: string;
  bookingReference: string;
}

export const TestRideConfirmationEmail = ({
  name,
  email,
  phone,
  vehicleName,
  variantName,
  bookingDate,
  bookingTime,
  bookingReference,
}: TestRideConfirmationEmailProps) => {
  const formattedDate = format(new Date(bookingDate), "dd MMMM yyyy");

  return (
    <Html>
      <Head />
      <Preview>Test Ride Confirmation - {bookingReference}</Preview>
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
            <Heading style={heading}>Test Ride Booked Successfully!</Heading>

            <Text style={paragraph}>
              Dear <strong>{name}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for booking a test ride with us. We are excited for you
              to experience the {vehicleName}!
            </Text>

            {/* Booking Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Booking Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Reference ID:</Column>
                <Column style={detailValue}>{bookingReference}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Booking Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Booking Time:</Column>
                <Column style={detailValue}>{bookingTime}</Column>
              </Row>
            </Section>

            {/* Vehicle Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Vehicle Information
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Vehicle:</Column>
                <Column style={detailValue}>{vehicleName}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Variant:</Column>
                <Column style={detailValue}>{variantName}</Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Next Steps */}
            <Text style={paragraph}>
              Please arrive at the dealership 15 minutes prior to your scheduled
              test ride.
            </Text>

            <Text style={paragraph}>
              If you have any questions, please contact our customer service
              team:
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
              Thank you for choosing TVS Motors. We look forward to seeing you!
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              TVS Motors Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} TVS Motors. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link
                href="https://www.tvsmotor.com/privacy-policy"
                style={footerLink}
              >
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link href="https://www.tvsmotor.com/terms" style={footerLink}>
                Terms & Conditions
              </Link>{" "}
              •{" "}
              <Link href="https://www.tvsmotor.com/contact" style={footerLink}>
                Contact Us
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

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
