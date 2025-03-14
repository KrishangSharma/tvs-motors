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

interface PaymentConfirmationEmailProps {
  fullName: string;
  email: string;
  phone: string;
  serviceDescription: string;
  amount: number;
  additionalInfo?: string;
  transactionId: string;
  paymentDate: Date;
}

export const PaymentConfirmationEmail = ({
  fullName = "John Doe",
  email = "john.doe@example.com",
  phone = "9876543210",
  serviceDescription = "General Service",
  amount = 1000,
  additionalInfo = "",
  transactionId = "TXN-12345678",
  paymentDate = new Date(),
}: PaymentConfirmationEmailProps) => {
  const formattedDate = format(new Date(paymentDate), "dd MMMM yyyy");
  const formattedTime = format(new Date(paymentDate), "hh:mm a");

  return (
    <Html>
      <Head />
      <Preview>
        Payment Confirmation - {transactionId} - ₹
        {amount.toLocaleString("en-IN")}
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
            <Heading style={heading}>Payment Confirmation</Heading>

            <Text style={paragraph}>
              Dear <strong>{fullName}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for your payment. Your transaction has been successfully
              processed with the following details:
            </Text>

            {/* Payment Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Payment Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Transaction ID:</Column>
                <Column style={detailValue}>{transactionId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Amount:</Column>
                <Column style={detailValue}>
                  ₹{amount.toLocaleString("en-IN")}
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Time:</Column>
                <Column style={detailValue}>{formattedTime}</Column>
              </Row>
            </Section>

            {/* Service Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Service/Product Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Description:</Column>
                <Column style={detailValue}>{serviceDescription}</Column>
              </Row>

              {additionalInfo && (
                <Row style={detailRow}>
                  <Column style={detailLabel}>Additional Information:</Column>
                  <Column style={detailValue}>{additionalInfo}</Column>
                </Row>
              )}
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
                <Column style={detailValue}>{email}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Phone:</Column>
                <Column style={detailValue}>{phone}</Column>
              </Row>
            </Section>

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              If you have any questions about this payment or need further
              assistance, please contact our customer support:
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:support@autoservice.com" style={link}>
                support@autoservice.com
              </Link>
            </Text>

            <Text style={paragraph}>
              Thank you for your business. We appreciate your trust in our
              services!
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

export default PaymentConfirmationEmail;

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
