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

interface TestRideConfirmationEmailProps {
  name: string;
  email: string;
  phone: string;
  vehicleName: string;
  variantName: string;
  dealerName: string;
  dealerAddress?: string;
  bookingDate: Date;
  bookingTime: string;
  bookingReference: string;
}

export const TestRideConfirmationEmail = ({
  name = "John Doe",
  email = "john.doe@example.com",
  phone = "9876543210",
  vehicleName = "TVS Apache RR 310",
  variantName = "Standard",
  dealerName = "TVS Motors Authorized Dealer - City Center",
  dealerAddress = "123 Main Street, Mumbai, Maharashtra 400001",
  bookingDate = new Date(),
  bookingTime = "11:00 AM",
  bookingReference = "TR-12345678",
}: TestRideConfirmationEmailProps) => {
  const formattedDate = format(bookingDate, "dd MMMM yyyy");

  return (
    <Html>
      <Head />
      <Preview>
        Your TVS Motors Test Ride Confirmation - {bookingReference}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="TVS Motors Logo"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>Test Ride Confirmation</Heading>

            <Text style={paragraph}>
              Dear <strong>{name}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for booking a test ride with TVS Motors. We&apos;re
              excited for you to experience the thrill of riding our vehicles.
              Your test ride has been confirmed with the following details:
            </Text>

            {/* Booking Details */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                Booking Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Booking Reference:</Column>
                <Column style={detailValue}>{bookingReference}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Time:</Column>
                <Column style={detailValue}>{bookingTime}</Column>
              </Row>
            </Section>

            {/* Vehicle Details */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                Vehicle Details
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

            {/* Dealer Details */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                Dealer Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Dealer:</Column>
                <Column style={detailValue}>{dealerName}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Address:</Column>
                <Column style={detailValue}>{dealerAddress}</Column>
              </Row>
            </Section>

            {/* What to Bring */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                What to Bring
              </Heading>
              <Text style={listItem}>• A valid driving license</Text>
              <Text style={listItem}>• Comfortable riding attire</Text>
              <Text style={listItem}>
                • This confirmation email (digital or printed)
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              If you need to reschedule or have any questions, please contact us
              at:
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:testride@tvsmotor.com" style={link}>
                testride@tvsmotor.com
              </Link>
            </Text>

            <Text style={paragraph}>We look forward to seeing you soon!</Text>

            <Text style={signature}>
              Warm regards,
              <br />
              The TVS Motors Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} TVS Motor Company. All rights
              reserved.
            </Text>
            <Text style={footerLinks}>
              <Link
                href="https://www.tvsmotor.com/privacy-policy"
                style={footerLink}
              >
                Privacy Policy
              </Link>{" "}
              •
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

export default TestRideConfirmationEmail;

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

const bookingDetails = {
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
