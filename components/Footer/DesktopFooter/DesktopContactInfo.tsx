import React from "react";
import { Phone, Mail, LifeBuoy } from "lucide-react";

const contactInfo = [
  { title: "CONTACT", icon: Phone, content: "18002587555" },
  { title: "EMAIL", icon: Mail, content: "customercare@tvsmotor.com" },
  {
    title: "NEED ROAD SIDE ASSISTANCE?",
    icon: LifeBuoy,
    content: 'Dial 1800-258-7111 and Press "1"',
  },
];

export default function DesktopContactInfo() {
  return (
    <div className="mt-12 bg-[#0a2669] rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((contact, idx) => (
          <div key={idx}>
            <h4 className="font-bold mb-3">{contact.title}</h4>
            <div className="flex items-center">
              <contact.icon className="w-4 h-4 mr-2" />
              <span>{contact.content}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
