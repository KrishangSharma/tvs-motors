import { LoanApplicationEmailProps } from "@/types";
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

export const LoanApplicationEmail = ({
  fullName = "John Doe",
  email = "john.doe@example.com",
  phone = "9876543210",
  dateOfBirth = new Date("1990-01-01"),
  employmentStatus = "employed",
  annualIncome = 500000,
  loanAmount = 300000,
  loanTenure = 3,
  residentialAddress = "123 Main Street, City, State, PIN",
  additionalInfo = "",
  applicationId = "LOAN-12345678",
  applicationDate = new Date(),
  documentType = "",
  documentNumber = "",
}: LoanApplicationEmailProps) => {
  const formattedDOB = format(new Date(dateOfBirth), "dd MMMM yyyy");
  const formattedApplicationDate = format(
    new Date(applicationDate),
    "dd MMMM yyyy"
  );

  // Format employment status for display
  const formatEmploymentStatus = (status: string) => {
    const statusMap: { [key: string]: string } = {
      employed: "Employed",
      "self-employed": "Self-Employed",
      "business-owner": "Business Owner",
      retired: "Retired",
      student: "Student",
      unemployed: "Unemployed",
    };
    return statusMap[status] || status;
  };

  // Format document type for display
  const formatDocumentType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      adhaar: "Adhaar Card",
      pan: "PAN Card",
    };
    return typeMap[type] || "";
  };

  // Calculate estimated monthly EMI (simple calculation)
  const interestRate = 0.09; // 9% per annum
  const monthlyInterestRate = interestRate / 12;
  const totalMonths = loanTenure * 12;
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  return (
    <Html>
      <Head />
      <Preview>Vehicle Loan Application Confirmation - {applicationId}</Preview>
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
            <Heading style={heading}>Loan Application Confirmation</Heading>

            <Text style={paragraph}>
              Dear <strong>{fullName}</strong>,
            </Text>

            <Text style={paragraph}>
              Thank you for submitting your vehicle loan application. We have
              received your application and it is currently under review. Below
              are the details of your application for your reference:
            </Text>

            {/* Application Details */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Application Details
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Application ID:</Column>
                <Column style={detailValue}>{applicationId}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Application Date:</Column>
                <Column style={detailValue}>{formattedApplicationDate}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Loan Amount:</Column>
                <Column style={detailValue}>
                  ₹{loanAmount.toLocaleString("en-IN")}
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Tenure:</Column>
                <Column style={detailValue}>
                  {loanTenure} {loanTenure === 1 ? "year" : "years"}
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Estimated Monthly EMI:</Column>
                <Column style={detailValue}>
                  ₹{Math.round(emi).toLocaleString("en-IN")}
                </Column>
              </Row>
            </Section>

            {/* Personal Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Personal Information
              </Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>Full Name:</Column>
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

              <Row style={detailRow}>
                <Column style={detailLabel}>Date of Birth:</Column>
                <Column style={detailValue}>{formattedDOB}</Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Employment Status:</Column>
                <Column style={detailValue}>
                  {formatEmploymentStatus(employmentStatus)}
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>Annual Income:</Column>
                <Column style={detailValue}>
                  ₹{annualIncome.toLocaleString("en-IN")}
                </Column>
              </Row>

              {documentType && documentNumber && (
                <>
                  <Row style={detailRow}>
                    <Column style={detailLabel}>Document Type:</Column>
                    <Column style={detailValue}>
                      {formatDocumentType(documentType)}
                    </Column>
                  </Row>
                  <Row style={detailRow}>
                    <Column style={detailLabel}>Document Number:</Column>
                    <Column style={detailValue}>{documentNumber}</Column>
                  </Row>
                </>
              )}
            </Section>

            {/* Address Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Residential Address
              </Heading>

              <Text style={addressText}>{residentialAddress}</Text>
            </Section>

            {/* Additional Information */}
            {additionalInfo && (
              <Section style={detailsSection}>
                <Heading as="h2" style={subheading}>
                  Additional Information
                </Heading>
                <Text style={paragraph}>{additionalInfo}</Text>
              </Section>
            )}

            <Hr style={divider} />

            {/* Next Steps */}
            <Heading as="h2" style={subheading}>
              Next Steps
            </Heading>

            <Text style={paragraph}>
              Our loan department will review your application and get back to
              you within 2-3 business days. You may be asked to provide
              additional documentation to support your application.
            </Text>

            <Text style={paragraph}>
              For any queries regarding your application, please contact our
              loan department:
            </Text>

            <Text style={contactInfo}>
              Phone:{" "}
              <Link href="tel:1800-123-4567" style={link}>
                1800-123-4567
              </Link>
            </Text>

            <Text style={contactInfo}>
              Email:{" "}
              <Link href="mailto:loans@autoservice.com" style={link}>
                loans@autoservice.com
              </Link>
            </Text>

            <Text style={signature}>
              Best regards,
              <br />
              The Auto Finance Team
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

export default LoanApplicationEmail;

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

const addressText = {
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
