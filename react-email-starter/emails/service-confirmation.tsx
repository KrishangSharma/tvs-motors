import { ServiceConfirmationEmailProps } from "@/types";
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

export const ServiceConfirmationEmail = ({
  name = "John Doe",
  emailId = "john.doe@example.com",
  contactNumber = "1234567890",
  model = "Honda City",
  registrationNumber = "MH02AB1234",
  serviceType = "free",
  pickupRequired = "no",
  bookingDate = new Date(),
  bookingTime = "10:00 AM",
  referenceNumber = "SRV-123456",
}: ServiceConfirmationEmailProps) => {
  const formattedDate = format(new Date(bookingDate), "dd MMMM yyyy");

  const serviceTypeText =
    serviceType === "free" ? "Free Service" : "Paid Service";
  const pickupText = pickupRequired === "yes" ? "Yes" : "No";

  return (
    <Html>
      <Head />
      <Preview>
        Your Vehicle Service Booking Confirmation - {referenceNumber}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="Auto Service Logo"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>Service Booking Confirmation</Heading>

            <Text style={paragraph}>
              Dear <strong>{name}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for booking your vehicle service with us. Your
              appointment has been confirmed with the following details:
            </Text>

            {/* Booking Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Booking Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Reference Number:</Column>
                <Column style={detailValue}>{referenceNumber}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Service Type:</Column>
                <Column style={detailValue}>{serviceTypeText}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Booking Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Booking Time:</Column>
                <Column style={detailValue}>{bookingTime}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Pickup Required:</Column>
                <Column style={detailValue}>{pickupText}</Column>
              </Row>
            </Section>

            {/* Vehicle Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Vehicle Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Model:</Column>
                <Column style={detailValue}>{model}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Registration Number:</Column>
                <Column style={detailValue}>{registrationNumber}</Column>
              </Row>
            </Section>

            {/* Contact Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Contact Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Name:</Column>
                <Column style={detailValue}>{name}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>{emailId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Contact Number:</Column>
                <Column style={detailValue}>{contactNumber}</Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Important Notes */}
            <Section style={notesSection}>
              <Heading as="h2" style={subheading}>
                Important Notes
              </Heading>
              <Text style={listItem}>
                • Please arrive 15 minutes before your scheduled appointment
                time.
              </Text>
              <Text style={listItem}>
                • Bring your vehicle registration documents and service history
                if available.
              </Text>
              <Text style={listItem}>
                • Service duration may vary depending on the condition of your
                vehicle.
              </Text>
              <Text style={listItem}>
                • You will be notified if any additional repairs are required.
              </Text>
            </Section>

            {/* Contact Information */}
            <Text style={paragraph}>
              If you need to reschedule or have any questions about your service
              appointment, please contact our service center:
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:service@autoservice.com" style={link}>
                service@autoservice.com
              </Link>
            </Text>

            <Text style={paragraph}>
              Thank you for choosing our service center. We look forward to
              serving you and your vehicle!
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              The Auto Service Team
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Auto Service. All rights reserved.
            </Text>
            <Text style={footerLinks}>
              <Link
                href="https://www.autoservice.com/privacy-policy"
                style={footerLink}
              >
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link
                href="https://www.autoservice.com/terms-of-service"
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

export default ServiceConfirmationEmail;

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

const notesSection = {
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
