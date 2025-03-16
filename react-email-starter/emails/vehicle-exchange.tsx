import { VehicleExchangeConfirmationEmailProps } from "@/types";
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

export default function VehicleExchangeConfirmationEmail({
  fullName = "Jhon Doe",
  email = "jhondoe@email.com",
  phone = "1800-123-4567",
  currentVehicleModel = "Corolla",
  currentVehicleYear = "2018",
  currentVehicleRegistration = "KA-01-12345",
  desiredVehicleDetails = "2021 Toyota Corolla Hybrid",
  additionalComments = "",
  exchangeReference = "EX-123456",
  requestDate = new Date(),
}: VehicleExchangeConfirmationEmailProps) {
  const formattedDate = format(requestDate, "dd MMMM yyyy");

  return (
    <Html>
      <Head />
      <Preview>
        Vehicle Exchange Request Confirmation - {exchangeReference}
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
            <Heading style={heading}>Vehicle Exchange Confirmation</Heading>

            <Text style={paragraph}>
              Dear <strong>{fullName}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for submitting your vehicle exchange request with TVS
              Motors. We appreciate your interest in upgrading your vehicle. Our
              team will review your request and get back to you with a
              personalized offer.
            </Text>

            {/* Request Details */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                Request Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Reference Number:</Column>
                <Column style={detailValue}>{exchangeReference}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Date Submitted:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>
            </Section>

            {/* Current Vehicle Details */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                Your Current Vehicle
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Model:</Column>
                <Column style={detailValue}>{currentVehicleModel}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Year:</Column>
                <Column style={detailValue}>{currentVehicleYear}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Registration:</Column>
                <Column style={detailValue}>
                  {currentVehicleRegistration}
                </Column>
              </Row>
            </Section>

            {/* Desired Vehicle Details */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                Desired Vehicle Details
              </Heading>
              <Text style={paragraph}>{desiredVehicleDetails}</Text>
            </Section>

            {/* Additional Comments (if any) */}
            {additionalComments && (
              <Section style={bookingDetails}>
                <Heading as="h2" style={subheading}>
                  Additional Comments
                </Heading>
                <Text style={paragraph}>{additionalComments}</Text>
              </Section>
            )}

            {/* Next Steps */}
            <Section style={bookingDetails}>
              <Heading as="h2" style={subheading}>
                What Happens Next
              </Heading>
              <Text style={listItem}>
                • Our team will evaluate your current vehicle details
              </Text>
              <Text style={listItem}>
                • We'll contact you within 24-48 hours
              </Text>
              <Text style={listItem}>
                • We'll schedule an in-person vehicle inspection if needed
              </Text>
              <Text style={listItem}>
                • You'll receive a personalized exchange offer
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              If you have any questions about your exchange request, please feel
              free to contact us at:
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:exchange@tvsmotor.com" style={link}>
                exchange@tvsmotor.com
              </Link>
            </Text>

            <Text style={paragraph}>Thank you for choosing TVS Motors!</Text>

            <Text style={signature}>
              Warm regards,
              <br />
              The TVS Motors Exchange Program Team
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
}

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
