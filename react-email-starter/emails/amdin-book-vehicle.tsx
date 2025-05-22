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

interface VehicleBookingEmailProps {
  fullName: string;
  emailId: string;
  mobileNumber: string;
  dealership: string;
  vehicleModel: string;
  variant: string;
  color: string;
  bookingReference: string;
}

export const AdminVehicleBookingEmail = ({
  fullName = "John Doe",
  emailId = "john.doe@example.com",
  mobileNumber = "9876543210",
  dealership = "TVS Motors Delhi",
  vehicleModel = "TVS Jupiter",
  variant = "ZX",
  color = "Matte Blue",
  bookingReference = "BK-12345678",
}: VehicleBookingEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New Vehicle Booking Notification - {bookingReference}</Preview>
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
            <Heading style={heading}>New Vehicle Booking Received</Heading>

            <Text style={paragraph}>
              A new vehicle booking has been received with the following
              details:
            </Text>

            {/* Booking Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Booking Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Booking Reference:</Column>
                <Column style={detailValue}>{bookingReference}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Dealership:</Column>
                <Column style={detailValue}>{dealership}</Column>
              </Row>
            </Section>

            {/* Vehicle Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Vehicle Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Model:</Column>
                <Column style={detailValue}>{vehicleModel}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Variant:</Column>
                <Column style={detailValue}>{variant}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Color:</Column>
                <Column style={detailValue}>{color}</Column>
              </Row>
            </Section>

            {/* Customer Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Customer Information
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Name:</Column>
                <Column style={detailValue}>{fullName}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>{emailId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Mobile:</Column>
                <Column style={detailValue}>{mobileNumber}</Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Required Actions */}
            <Section style={actionRequiredSection}>
              <Heading as="h2" style={subheading}>
                Required Actions
              </Heading>

              <Text style={paragraph}>
                <strong>1. Verification:</strong> Contact the customer within 24
                hours to verify booking details.
              </Text>

              <Text style={paragraph}>
                <strong>2. Inventory Check:</strong> Confirm availability of the
                requested vehicle model, variant, and color.
              </Text>

              <Text style={paragraph}>
                <strong>3. Payment Processing:</strong> Guide the customer
                through payment options and documentation requirements.
              </Text>

              <Text style={paragraph}>
                <strong>4. Delivery Scheduling:</strong> Update the delivery
                timeline in the system and inform the customer.
              </Text>
            </Section>

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Text style={actionText}>
                Please review this booking and take appropriate action:
              </Text>
              <Section style={buttonContainer}>
                <Button
                  href={`https://admin.tvsmotor.com/bookings/${bookingReference}`}
                  style={primaryButton}
                >
                  View Booking Details
                </Button>
                <Button
                  href={`https://admin.tvsmotor.com/bookings/${bookingReference}/process`}
                  style={secondaryButton}
                >
                  Process Booking
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

export default AdminVehicleBookingEmail;

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

const actionRequiredSection = {
  backgroundColor: "#fff8e6", // Light yellow background for action required
  padding: "20px",
  borderRadius: "4px",
  margin: "20px 0",
  border: "1px solid #ffe0b2",
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
