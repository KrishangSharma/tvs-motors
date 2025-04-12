import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { TermsAndConditionsData } from "@/types";
import Heading from "./Heading";

// Custom serializers
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
  },
};

const disclaimer = groq`
  *[_type == "disclaimer"][0]{
    title,
    content
  }
`;

const privacyPolicy = groq`
  *[_type == "PrivacyPolicy"][0]
`;

const termsAndConditions = groq`
  *[_type == "termsAndConditions"][0]{
    title,
    sections,
    lastUpdated
  }
`;

const DisclaimerPage = async () => {
  const data = await client.fetch(disclaimer);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <Heading lgText={data.title} smText="" />
      <div className="prose prose-lg max-w-none mt-4">
        <PortableText value={data.content} components={components} />
      </div>
    </main>
  );
};

const PrivacyPage = async () => {
  const data = await client.fetch(privacyPolicy);
  const policy = data; // Get the first privacy policy document

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <Heading lgText={policy.title} smText="" />

      {/* Introduction Section */}
      <section className="mb-8 mt-4">
        <PortableText value={policy.intro} components={components} />
      </section>

      {/* Information Collected Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Information We May Collect
        </h2>
        <PortableText
          value={policy.informationCollected}
          components={components}
        />
      </section>

      {/* Usage Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usage of Information</h2>
        <PortableText value={policy.usage} components={components} />
      </section>

      {/* External Links Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Links to Other Websites</h2>
        <PortableText value={policy.externalLinks} components={components} />
      </section>

      {/* Control Information Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Controlling Your Personal Information
        </h2>
        <PortableText value={policy.controlInfo} components={components} />
      </section>

      {/* Contact Information Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="font-semibold mb-2">{policy.contact.companyName}</p>
          <p className="whitespace-pre-line mb-2">{policy.contact.address}</p>
          <p>
            <a
              href={`mailto:${policy.contact.email}`}
              className="text-blue-600 hover:underline"
            >
              {policy.contact.email}
            </a>
          </p>
        </div>
      </section>

      {/* Last Updated Section */}
      {/* <section className="text-sm text-gray-600">
        <p>Last Updated: {new Date(policy.lastUpdated).toLocaleDateString()}</p>
      </section> */}
    </main>
  );
};

const TermsPage = async () => {
  const data = (await client.fetch(
    termsAndConditions
  )) as TermsAndConditionsData;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <Heading lgText={data.title} smText="" />

      <div className="space-y-8 mt-4">
        {data.sections.map((section) => (
          <section key={section.sectionId} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {section.sectionId}. {section.sectionTitle}
            </h2>
            <div className="prose prose-lg max-w-none">
              {section.content.map((block, index) => {
                if (block._type === "listBlock") {
                  return block.listType === "bullet" ? (
                    <ul key={index} className="list-disc list-inside mb-4">
                      {block.items.map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="ml-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ol key={index} className="list-decimal list-inside mb-4">
                      {block.items.map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="ml-4">
                          {item}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <PortableText
                    key={index}
                    value={[block]}
                    components={components}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {data.lastUpdated && (
        <section className="text-sm text-gray-600 mt-8">
          <p>Last Updated: {new Date(data.lastUpdated).toLocaleDateString()}</p>
        </section>
      )}
    </main>
  );
};

export { DisclaimerPage, PrivacyPage, TermsPage };
