import { AMCConfirmationEmailProps } from "@/types";
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

export const AMCConfirmationEmail = ({
  ownerName = "John Doe",
  email = "john.doe@example.com",
  phone = "9876543210",
  vehicleMake = "TVS Jupiter",
  registrationNumber = "KA01AB1234",
  amcPackage = "standard",
  startDate = new Date(),
  orderReference = "AMC-12345678",
  additionalComments = "",
}: AMCConfirmationEmailProps) => {
  const parsedStartDate = new Date(startDate);
  const formattedDate = format(parsedStartDate, "dd MMMM yyyy");

  // Get AMC package details
  const amcPackageDetails = {
    basic: {
      name: "Basic",
      price: "₹4,999",
      features: [
        "Regular servicing",
        "Basic parts replacement",
        "Scheduled maintenance",
      ],
    },
    standard: {
      name: "Standard",
      price: "₹7,999",
      features: [
        "All Basic features",
        "Extended warranty on parts",
        "Fluid replacements",
        "Filter replacements",
      ],
    },
    premium: {
      name: "Premium",
      price: "₹11,999",
      features: [
        "All Standard features",
        "Roadside assistance",
        "Priority service",
        "Free pickup and drop",
        "Interim inspections",
      ],
    },
  }[amcPackage] || {
    name: "Unknown Package",
    price: "N/A",
    features: ["Package details not available"],
  };

  return (
    <Html>
      <Head />
      <Preview>
        Your Auto Service AMC Purchase Confirmation - {orderReference}
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
            <Heading style={heading}>AMC Purchase Confirmation</Heading>

            <Text style={paragraph}>
              Dear <strong>{ownerName}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for purchasing the Annual Maintenance Contract (AMC) for
              your vehicle. Your purchase has been confirmed with the following
              details:
            </Text>

            {/* Order Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Order Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Order Reference:</Column>
                <Column style={detailValue}>{orderReference}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>AMC Package:</Column>
                <Column style={detailValue}>{amcPackageDetails.name}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Price:</Column>
                <Column style={detailValue}>
                  {amcPackageDetails.price}/year
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Start Date:</Column>
                <Column style={detailValue}>{formattedDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Valid Until:</Column>
                <Column style={detailValue}>
                  {format(
                    new Date(
                      parsedStartDate.getTime() + 365 * 24 * 60 * 60 * 1000
                    ),
                    "dd MMMM yyyy"
                  )}
                </Column>
              </Row>
            </Section>

            {/* Vehicle Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Vehicle Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Make:</Column>
                <Column style={detailValue}>{vehicleMake}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Model:</Column>
                <Column style={detailValue}>{vehicleModel}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Registration:</Column>
                <Column style={detailValue}>{registrationNumber}</Column>
              </Row>
            </Section>

            {/* Package Features */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Your {amcPackageDetails.name} Package Includes
              </Heading>

              {amcPackageDetails.features.map((feature, index) => (
                <Text key={index} style={listItem}>
                  • {feature}
                </Text>
              ))}
            </Section>

            {/* Additional Comments */}
            {additionalComments && (
              <Section style={detailsSection}>
                <Heading as="h2" style={subheading}>
                  Additional Information
                </Heading>
                <Text style={paragraph}>{additionalComments}</Text>
              </Section>
            )}

            <Hr style={divider} />

            {/* Contact Information */}
            <Text style={paragraph}>
              To schedule your next service or for any inquiries, please contact
              our service center:
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
              Thank you for choosing our Annual Maintenance Contract. We look
              forward to keeping your vehicle in perfect condition!
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

export default AMCConfirmationEmail;

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
