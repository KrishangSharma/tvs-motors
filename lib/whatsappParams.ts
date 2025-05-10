export interface MessageParams {
  to: string;
}

export interface CareerConfirmationParams extends MessageParams {
  requestID: string;
  applicantName: string;
  contactNumber?: string;
  applicantEmail?: string;
  jobProfile: string;
}

export interface ContactConfirmationParams extends MessageParams {
  senderName: string;
  senderEmail?: string;
  senderNumber?: string;
  message?: string;
}

export interface TestRideConfirmationParams extends MessageParams {
  senderName: string;
  senderEmail: string;
  senderNumber: string;
  model?: string;
  refId?: string;
  date?: string;
  time?: string;
  vehicleModel?: string;
  vehicleVariant?: string;
}

export interface ExchangeConfirmationParams extends MessageParams {
  senderName?: string;
  refId?: string;
  date?: string;
  model?: string;
  registrationNumber?: string;
  year?: string;
  desiredVehicle?: string;
  senderEmail?: string;
  senderNumber?: string;
}

export interface AMCParams extends MessageParams {
  senderName?: string;
  refId?: string;
  planType?: string;
  planPrice?: string;
  startDate?: string;
  endDate?: string;
  model?: string;
  registrationNumber?: string;
  senderEmail?: string;
  senderNumber?: string;
}

export interface InsuranceConfirmationParams extends MessageParams {
  senderName?: string;
  senderEmail?: string;
  senderNumber: string;
  refId?: string;
  date?: string;
  model?: string;
  registrationNumber?: string;
  year?: string;
  prevInsurance?: string;
}
