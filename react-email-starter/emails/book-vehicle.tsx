import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Img,
  Section,
  Text,
  Row,
  Column,
  Preview,
  Link,
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

export const BookVehicle = ({
  fullName = "Krishang Sharma",
  emailId = "krishang.sharma.17704@gmail.com",
  mobileNumber = "9599951032",
  dealership = "Karol Bagh",
  vehicleModel = "Jupiter",
  variant = "SmartXConnect",
  color = "Some Shade of Blue",
  bookingReference = "BR-12323",
}: VehicleBookingEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Vehicle Booking Confirmation - {bookingReference}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="TVS Logo"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Heading style={heading}>Vehicle Booking Confirmation</Heading>

            <Text style={paragraph}>
              Dear <strong>{fullName}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for booking your vehicle with us. Here are your booking
              details:
            </Text>

            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Booking Information
              </Heading>
              <Row style={detailRow}>
                <Column style={detailLabel}>Reference:</Column>
                <Column style={detailValue}>{bookingReference}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Dealership:</Column>
                <Column style={detailValue}>{dealership}</Column>
              </Row>
            </Section>

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

            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Your Contact
              </Heading>
              <Row style={detailRow}>
                <Column style={detailLabel}>Email:</Column>
                <Column style={detailValue}>{emailId}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Mobile:</Column>
                <Column style={detailValue}>{mobileNumber}</Column>
              </Row>
            </Section>

            <Text style={paragraph}>
              Our dealership will contact you shortly to confirm further
              details. If you have any questions, feel free to reach us.
            </Text>

            <Text>
              Best regards,
              <br />
              TVS Motor Team
            </Text>
          </Section>

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
                href="https://www.tvsmotor.com/contact-us"
                style={footerLink}
              >
                Contact Us
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BookVehicle;

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
