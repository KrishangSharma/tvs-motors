import { ServiceBookingEmailProps } from "@/types";
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

export const ServiceBookingConfirmationEmail = ({
  name = "John Doe",
  emailId = "john.doe@example.com",
  contactNumber = "9876543210",
  model = "Honda City",
  registrationNumber = "MH02AB1234",
  serviceType = "free",
  pickupRequired = "no",
  bookingDate = new Date(),
  bookingTime = "10:00 AM",
  bookingId = "SRV-123456",
}: ServiceBookingEmailProps) => {
  const formattedDate = format(new Date(bookingDate), "dd MMMM yyyy");

  return (
    <Html>
      <Head />
      <Preview>
        Service Booking Confirmation - {bookingId} - {formattedDate}{" "}
        {bookingTime}
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
                <Column style={detailLabel}>Booking ID:</Column>
                <Column style={detailValue}>{bookingId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Time:</Column>
                <Column style={detailValue}>{bookingTime}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Service Type:</Column>
                <Column style={detailValue}>
                  {serviceType === "free" ? "Free Service" : "Paid Service"}
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Pickup Required:</Column>
                <Column style={detailValue}>
                  {pickupRequired === "yes" ? "Yes" : "No"}
                </Column>
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
                <Column style={detailValue}>{emailId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Phone:</Column>
                <Column style={detailValue}>{contactNumber}</Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Important Information */}
            <Section style={importantSection}>
              <Heading as="h2" style={subheading}>
                Important Information
              </Heading>

              <Text style={importantText}>
                • Please arrive 15 minutes before your scheduled appointment.
              </Text>
              <Text style={importantText}>
                • Bring your vehicle registration documents and service book.
              </Text>
              <Text style={importantText}>
                • Service may take 3-4 hours depending on the requirements.
              </Text>
              {pickupRequired === "yes" && (
                <Text style={importantText}>
                  • Our team will contact you 30 minutes before pickup.
                </Text>
              )}
            </Section>

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              If you need to reschedule or have any questions about your service
              booking, please contact our customer support:
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:service@tvsmotor.com" style={link}>
                service@tvsmotor.com
              </Link>
            </Text>

            <Text style={paragraph}>
              Thank you for choosing our service center. We look forward to
              serving you!
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              The Service Team
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

export default ServiceBookingConfirmationEmail;

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

const importantSection = {
  backgroundColor: "#fff8e6",
  padding: "20px",
  borderRadius: "4px",
  margin: "20px 0",
  borderLeft: "4px solid #ffc107",
};

const importantText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "8px 0",
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
