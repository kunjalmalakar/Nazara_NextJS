export const testimonials = [
  {
    first: "Ananya",
    name: "Ananya Sharma",
    text: "I was nervous about buying a lab-grown diamond online, but the team walked me through every certificate and detail. The solitaire I received sparkles beyond anything I imagined, and the finishing is flawless. It truly feels like a piece made just for me.",
  },
  {
    first: "Riya",
    name: "Riya Mehta",
    text: "The craftsmanship is exceptional — my layered necklace sits perfectly and gets compliments every single time I wear it. What impressed me most was the honest pricing and the transparent cost breakup. I will definitely be coming back for more.",
  },
  {
    first: "Adarsh",
    name: "Adarsh Shrivastav",
    text: "I customised an engagement ring for my fiancée and the whole process was seamless, from CAD design to delivery. They kept me updated at every step and the final piece exceeded our expectations. Trustworthy people and beautiful jewellery.",
  },
  {
    first: "Tanishka",
    name: "Tanishka Patel",
    text: "From the in-store experience to the lifetime warranty, everything about Nazara feels premium yet personal. My bangles arrived beautifully packaged and exactly to size. It is rare to find this level of service and quality together.",
  },
];

export const faqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Lab Grown Diamonds",
    items: [
      {
        q: "Are lab-grown diamonds real diamonds?",
        a: "Yes. Lab-grown diamonds are chemically, physically and optically identical to mined diamonds. The only difference is their origin — they are grown in controlled labs rather than extracted from the earth, making them a more ethical and sustainable choice.",
      },
      {
        q: "Are your diamonds certified?",
        a: "Every diamond above 0.30 carat ships with an independent certification (IGI or equivalent) detailing its cut, colour, clarity and carat weight. Smaller stones are covered under our in-house quality assurance report.",
      },
      {
        q: "Do lab-grown diamonds lose their sparkle over time?",
        a: "No. A diamond is a diamond — lab-grown stones have the same hardness (10 on the Mohs scale) and brilliance as mined diamonds and will sparkle forever with basic care.",
      },
    ],
  },
  {
    group: "Orders & Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Ready designs ship within 2–4 business days and arrive in 5–7 business days across India. Made-to-order and customised pieces take 12–18 business days including production.",
      },
      {
        q: "Is shipping free?",
        a: "Yes, we offer free, fully insured shipping on all orders. Every parcel is tamper-proof and requires an OTP or signature at delivery.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order ships you will receive a tracking link by email and WhatsApp, and you can also check the status from your account page.",
      },
    ],
  },
  {
    group: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 15-day in-store return and a 10-day online return window on unworn jewellery in original condition with certificates and packaging. Customised pieces are exchange-only.",
      },
      {
        q: "How long do refunds take?",
        a: "Once your piece passes our quality check (2–3 business days after receipt), refunds are processed to the original payment method within 7–10 business days.",
      },
    ],
  },
  {
    group: "Customization",
    items: [
      {
        q: "Can I create my own design?",
        a: "Yes! Share a sketch, reference photo or idea through our Customize page. Our designers prepare CAD renders for your approval before production begins, along with a transparent cost breakup.",
      },
      {
        q: "Can I choose my diamond and metal?",
        a: "Select the size, carat, cut — or simply choose a design that speaks to you. We offer yellow, rose and white gold in 14K/18K as well as platinum.",
      },
    ],
  },
  {
    group: "Care & Warranty",
    items: [
      {
        q: "What does the lifetime warranty cover?",
        a: "Every piece is backed by a lifetime warranty covering manufacturing defects, stone-setting issues and plating. Free professional cleaning is available at our Indore store anytime.",
      },
      {
        q: "How should I care for my jewellery?",
        a: "Store pieces separately in soft pouches, avoid contact with perfumes and chlorine, and clean gently with lukewarm water and a soft brush. Visit us once a year for a complimentary professional polish.",
      },
    ],
  },
];

export interface PolicySection {
  heading: string;
  body: string;
}

export const policies: Record<
  string,
  { title: string; intro: string; sections: PolicySection[] }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "Your privacy matters to us. This policy explains what information Nazara Diamonds collects, how we use it, and the choices you have.",
    sections: [
      { heading: "Information We Collect", body: "We collect the details you share with us directly — name, email, phone number, shipping address and order history — along with basic device and usage data gathered through cookies when you browse our site." },
      { heading: "How We Use Your Data", body: "Your information is used to process orders, provide delivery updates, respond to enquiries, personalise recommendations and, with your consent, share offers. We never sell your personal data to third parties." },
      { heading: "Cookies", body: "We use essential cookies to keep your cart and preferences working, and analytics cookies to understand how visitors use the site. You can disable non-essential cookies in your browser at any time." },
      { heading: "Third-Party Sharing", body: "We share only the minimum necessary data with trusted partners — logistics providers for delivery, payment gateways for secure transactions and certification bodies for diamond grading." },
      { heading: "Security", body: "All transactions are encrypted with industry-standard TLS. Personal data is stored on secured servers with restricted access, and we review our safeguards regularly." },
      { heading: "Your Rights", body: "You may request access to, correction of, or deletion of your personal data at any time by writing to us at care@nazaradiamonds.com." },
    ],
  },
  "exchange-policy": {
    title: "Exchange Policy",
    intro:
      "We want you to love your Nazara piece forever. If something is not quite right, our exchange programme makes it easy.",
    sections: [
      { heading: "Exchange Window", body: "Jewellery may be exchanged within 15 days of delivery at our Indore store, or within 10 days by courier for online orders, provided it is unworn and in original condition with all certificates and packaging." },
      { heading: "Lifetime Exchange", body: "Beyond the initial window, we offer lifetime exchange on diamond jewellery at prevailing market value of the diamonds and metal, less applicable making charges." },
      { heading: "Customised Pieces", body: "Made-to-order and engraved pieces can be exchanged for other designs of equal or higher value, but cannot be returned for a refund." },
      { heading: "How to Exchange", body: "Visit our store with your invoice, or raise a request via the Contact Us page and we will arrange an insured pickup for online exchanges." },
    ],
  },
  "return-refund-policy": {
    title: "Return & Refund Policy",
    intro:
      "Shopping fine jewellery online should feel risk-free. Here is exactly how our returns and refunds work.",
    sections: [
      { heading: "10-Day Return Window", body: "Online orders can be returned within 10 days of delivery. The piece must be unworn, undamaged and accompanied by its original certificate, invoice and packaging." },
      { heading: "Quality Check Process", body: "Once your return reaches us, our quality team inspects the piece within 2–3 business days to verify its condition and certification. You will be notified by email at each stage." },
      { heading: "Refund Timelines", body: "After a successful quality check, refunds are initiated within 48 hours and reflect in your original payment method within 7–10 business days depending on your bank." },
      { heading: "Non-Returnable Items", body: "Customised, engraved and altered pieces, as well as gift cards, are not eligible for return. These may qualify for exchange as per our Exchange Policy." },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    intro:
      "These terms govern your use of the Nazara Diamonds website and your purchases from us. By using this site you agree to them.",
    sections: [
      { heading: "Products & Pricing", body: "All prices are listed in Indian Rupees and include applicable taxes unless stated otherwise. Prices of gold and diamonds may be revised in line with market rates; the price at checkout is final for your order." },
      { heading: "Orders", body: "An order is confirmed only after successful payment. We reserve the right to cancel orders affected by pricing errors, stock unavailability or suspected fraud, with a full refund in such cases." },
      { heading: "Intellectual Property", body: "All designs, imagery and content on this site are the property of Nazara Diamonds and may not be reproduced without written permission." },
      { heading: "Limitation of Liability", body: "Our liability for any claim arising from a purchase is limited to the amount paid for the product in question." },
      { heading: "Governing Law", body: "These terms are governed by the laws of India, with courts in Indore, Madhya Pradesh having exclusive jurisdiction." },
    ],
  },
  "shipping-policy": {
    title: "Shipping Policy",
    intro:
      "Every Nazara parcel is insured, tamper-proof and trackable from our workshop to your doorstep.",
    sections: [
      { heading: "Delivery Timelines", body: "In-stock designs ship in 2–4 business days and typically arrive within 5–7 business days anywhere in India. Made-to-order and customised jewellery takes 12–18 business days including production time." },
      { heading: "Shipping Charges", body: "Shipping is free on all orders. Orders above ₹50 equivalent in our international store also qualify for free shipping promotions when announced." },
      { heading: "Tracking", body: "A tracking link is shared over email and WhatsApp as soon as your order is dispatched. You can also view live status on your account page." },
      { heading: "Secure Delivery", body: "High-value parcels require OTP verification or signature on delivery, and every shipment is fully insured until it is in your hands." },
    ],
  },
};
