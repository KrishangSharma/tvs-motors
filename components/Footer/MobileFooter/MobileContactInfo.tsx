import React from "react";
import { Phone, Mail, LifeBuoy } from "lucide-react";

const mobileContactInfo = [
  { title: "CONTACT", icon: Phone, content: "18002587555" },
  { title: "EMAIL", icon: Mail, content: "customercare@tvsmotor.com" },
  {
    title: "NEED ROAD SIDE ASSISTANCE?",
    icon: LifeBuoy,
    content: 'Dial 1800-258-7111 and Press "1"',
  },
];

export default function MobileContactInfo() {
  return (
    <>
      {mobileContactInfo.map((contact, idx) => (
        <div key={idx} className="px-4 py-4 border-t border-[#1a3c8d]">
          <h3 className="font-bold mb-4 text-center">{contact.title}</h3>
          <div className="flex items-center justify-center mb-2">
            <contact.icon className="w-4 h-4 mr-2" />
            <span>{contact.content}</span>
          </div>
        </div>
      ))}
    </>
  );
}
