import type { LoanApplicationEmailProps } from "@/types";
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
import { format } from "date-fns";

export const AdminLoanApplicationEmail = ({
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
}: LoanApplicationEmailProps) => {
  const formattedDOB = format(new Date(dateOfBirth), "dd MMMM yyyy");
  const formattedApplicationDate = format(
    new Date(applicationDate),
    "dd MMMM yyyy"
  );
  const formattedApplicationTime = format(new Date(applicationDate), "hh:mm a");

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
      <Preview>New Vehicle Loan Application - {applicationId}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={adminHeader}>
            <Img
              src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg"
              width="150"
              height="50"
              alt="Auto Service Logo"
              style={logo}
            />
            <Text style={adminHeaderText}>ADMIN NOTIFICATION</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={heading}>New Loan Application Received</Heading>

            <Text style={paragraph}>
              A new vehicle loan application has been submitted with the
              following details:
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
                <Column style={detailLabel}>Application Time:</Column>
                <Column style={detailValue}>{formattedApplicationTime}</Column>
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

            {/* Customer Information */}
            <Section style={detailsSection}>
              <Heading as="h2" style={subheading}>
                Customer Information
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

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Text style={actionText}>
                Please review this loan application and take appropriate action:
              </Text>
              <Section style={buttonContainer}>
                <Button
                  href={`https://admin.tvsmotor.com/loans/${applicationId}`}
                  style={primaryButton}
                >
                  View Application Details
                </Button>
                <Button
                  href={`https://admin.tvsmotor.com/loans/${applicationId}/process`}
                  style={secondaryButton}
                >
                  Process Application
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

export default AdminLoanApplicationEmail;

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
