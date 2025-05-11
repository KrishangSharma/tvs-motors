import {
  AMCParams,
  CareerConfirmationParams,
  ContactConfirmationParams,
  ExchangeConfirmationParams,
  InsuranceConfirmationParams,
  LoanConfirmationParams,
  MessageParams,
  ServiceConfirmationParams,
  TestRideConfirmationParams,
} from "./whatsappParams";

const WHATSAPP_API_VERSION = "v20.0";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_CLIENT_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_API_URL = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

// Function to test the messaging
export async function TestMessage({ to }: MessageParams): Promise<any> {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "test_template_2",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("WhatsApp API response:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Career Application USER confirmation
export async function CareerUserConfirmation({
  to,
  applicantName,
  jobProfile,
  requestID,
}: CareerConfirmationParams): Promise<any> {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "career_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: applicantName },
              { type: "text", text: jobProfile },
              { type: "text", text: requestID },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Career Application for User:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Career Application USER confirmation
export async function CareerAdminConfirmation({
  to,
  requestID,
  applicantName,
  contactNumber,
  applicantEmail,
  jobProfile,
}: CareerConfirmationParams): Promise<any> {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "career_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: requestID },
              { type: "text", text: applicantName },
              { type: "text", text: contactNumber && contactNumber },
              {
                type: "text",
                text: applicantEmail ? applicantEmail : "No Email Provided",
              },
              { type: "text", text: jobProfile },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Career Application for Admin:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Contact Form USER Confirmation
export async function ContactUserConfirmation({
  to,
  senderName,
}: ContactConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "contact_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: senderName || "Anonymous User" },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Contact Form for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Contact Form ADMIN Confirmation
export async function ContactAdminConfirmation({
  to,
  senderName,
  senderEmail,
  senderNumber,
  message,
}: ContactConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "contact_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: senderName || "Anonymous User" },
              { type: "text", text: senderEmail || "No Email provided" },
              { type: "text", text: senderNumber },
              { type: "text", text: message },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Contact Form for admin:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Test Ride USER Confirmation
export async function TestRideUserConfirmation({
  to,
  senderName,
  model,
  refId,
  date,
  time,
  vehicleModel,
  vehicleVariant,
}: TestRideConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "test_ride_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: senderName || "Anonymous User" },
              { type: "text", text: model },
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: time },
              { type: "text", text: vehicleModel },
              { type: "text", text: vehicleVariant || "No Vaariant Available" },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Test Ride form for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Test Ride ADMIN Confirmation
export async function TestRideAdminConfirmation({
  to,
  senderName,
  senderEmail,
  senderNumber,
  model,
  refId,
  date,
  time,
  vehicleVariant,
}: TestRideConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "test_ride_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: time },
              { type: "text", text: senderName },
              { type: "text", text: senderEmail || "No email provided" },
              { type: "text", text: senderNumber },
              { type: "text", text: model },
              { type: "text", text: vehicleVariant },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Test Ride form for admin:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Exchange USER Confirmation
export async function ExchangeUserConfirmation({
  to,
  senderName,
  refId,
  date,
  model,
  registrationNumber,
  year,
  desiredVehicle,
}: ExchangeConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "exchange_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: senderName },
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: model },
              { type: "text", text: registrationNumber },
              { type: "text", text: year },
              { type: "text", text: desiredVehicle },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Exchange Vehicle for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Exchange ADMIN Confirmation
export async function ExchangeAdminConfirmation({
  to,
  refId,
  date,
  senderName,
  senderEmail,
  senderNumber,
  model,
  year,
  registrationNumber,
  desiredVehicle,
}: ExchangeConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "exchange_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: senderName },
              { type: "text", text: senderEmail || "No Email provided" },
              { type: "text", text: senderNumber },
              { type: "text", text: model },
              { type: "text", text: year },
              { type: "text", text: registrationNumber },
              { type: "text", text: desiredVehicle },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Exchange Vehicle for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//AMC USER Confirmation
export async function AMCUserConfirmation({
  to,
  senderName,
  refId,
  planType,
  startDate,
  endDate,
  model,
  registrationNumber,
}: AMCParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "amc_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: senderName },
              { type: "text", text: refId },
              { type: "text", text: planType },
              { type: "text", text: startDate },
              { type: "text", text: endDate },
              { type: "text", text: model },
              { type: "text", text: registrationNumber },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("AMC Form for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//AMC ADMIN Confirmation
export async function AMCAdminConfirmation({
  to,
  senderName,
  senderEmail,
  senderNumber,
  refId,
  planType,
  startDate,
  endDate,
  model,
  registrationNumber,
}: AMCParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "amc_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: refId },
              { type: "text", text: planType },
              { type: "text", text: startDate },
              { type: "text", text: endDate },
              { type: "text", text: senderName },
              { type: "text", text: senderEmail || "No Email provided" },
              { type: "text", text: senderNumber },
              { type: "text", text: model },
              { type: "text", text: registrationNumber },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("AMC Form for admin:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Insurance USER Confirmation
export async function InsuranceUserConfirmation({
  to,
  senderName,
  refId,
  date,
  model,
  registrationNumber,
  year,
  prevInsurance,
}: InsuranceConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "insurance_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: senderName },
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: model },
              { type: "text", text: registrationNumber },
              { type: "text", text: year },
              { type: "text", text: prevInsurance },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Insurance Form for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Insurance ADMIN Confirmation
export async function InsuranceAdminConfirmation({
  to,
  senderName,
  senderEmail,
  senderNumber,
  refId,
  date,
  model,
  registrationNumber,
  year,
  prevInsurance,
}: InsuranceConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "insurance_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: senderName },
              { type: "text", text: senderEmail || "No Email provided" },
              { type: "text", text: senderNumber },
              { type: "text", text: model },
              { type: "text", text: registrationNumber },
              { type: "text", text: year },
              { type: "text", text: prevInsurance },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Insurance Form for admin:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Loan USER Confirmation
export async function LoanUserConfirmation({
  to,
  senderName,
}: LoanConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "loan_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [{ type: "text", text: senderName }],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Loan Form for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Loan ADMIN Confirmation
export async function LoanAdminConfirmation({
  to,
  refId,
  date,
  loanAmt,
  tenure,
  estEMI,
  senderName,
  senderEmail,
  senderNumber,
  dob,
  employmentStatus,
  annualIncome,
  address,
}: LoanConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "loan_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: loanAmt },
              { type: "text", text: tenure },
              { type: "text", text: estEMI },
              { type: "text", text: senderName },
              { type: "text", text: senderEmail || "No Email provided" },
              { type: "text", text: senderNumber },
              { type: "text", text: dob },
              { type: "text", text: employmentStatus },
              { type: "text", text: annualIncome },
              { type: "text", text: address },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Loan Form for admin:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Service USER Confirmation
export async function ServiceUserConfirmation({
  to,
  senderName,
  refId,
  date,
  time,
}: ServiceConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "service_user_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: senderName },
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: time },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Service Form for user:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}

//Service ADMIN Confirmation
export async function ServiceAdminConfirmation({
  to,
  senderName,
  senderEmail,
  senderNumber,
  refId,
  date,
  time,
  serviceType,
  pickUp,
  model,
  registrationNumber,
}: ServiceConfirmationParams) {
  try {
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: "service_admin_confirmation",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: refId },
              { type: "text", text: date },
              { type: "text", text: time },
              { type: "text", text: serviceType },
              { type: "text", text: pickUp },
              { type: "text", text: senderName },
              { type: "text", text: senderEmail || "No Email provided" },
              { type: "text", text: senderNumber },
              { type: "text", text: model },
              { type: "text", text: registrationNumber },
            ],
          },
        ],
      },
    };

    const response = await fetch(WHATSAPP_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("WhatsApp API error response:", errorData);
      return null;
    }

    const responseData = await response.json();
    console.log("Service Form for admin:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return null;
  }
}
