/**
 * All home-page content, mirrored from https://www.dreamcustomboxes.com/.
 * Sections import from here so copy edits never touch layout code.
 */
import type { StaticImageData } from "next/image";

import heroImg from "@/public/images/Custom-Packaging-Boxes.webp";
import displayBoxes from "@/public/images/Display-Boxes-01.webp";
import foldingCartons from "@/public/images/Custom-Folding-Cartons.webp";
import mailerBoxes from "@/public/images/Mailer-Boxes.webp";
import rigidBoxes from "@/public/images/luxury-rigid-boxes.webp";
import burger from "@/public/images/BB-04.webp";
import frenchFry from "@/public/images/custom-french-fry-box.webp";
import candle from "@/public/images/Candle-boxes-2-july-.webp";
import kraft from "@/public/images/custom-kraft-box.webp";
import book from "@/public/images/slipcase-book-box.webp";
import perfume from "@/public/images/Rigid-Perfume-Box.webp";
import soap from "@/public/images/DCSB-01.webp";
import cbd from "@/public/images/cbd-packaging-box.webp";
import food from "@/public/images/custom-food-boxes-wholesale.webp";
import cosmetic from "@/public/images/cosmetic-packaging-boxes.webp";
import bakery from "@/public/images/custom-bakery-packaging-boxes.webp";
import retail from "@/public/images/custom-retail-boxes.webp";
import gable from "@/public/images/custom-gable-style-box.webp";
import dieCut from "@/public/images/custom-die-cut-window-boxes.webp";
import windowBox from "@/public/images/Amaze-Your-Customers-With-Custom-Window-Box.webp";
import prBox from "@/public/images/custom-gift-pr-box.webp";
import sampleBg from "@/public/images/Sample-12.webp";
import ecoBg from "@/public/images/Echo-111.webp";
import blogMailer from "@/public/images/custom-mailer-box-600x400.webp";
import blogCustomized from "@/public/images/customized-packaging-600x400.webp";
import blogImportance from "@/public/images/importance-of-packaging-600x400.webp";
import blogTypes from "@/public/images/Types-of-Boxes-600x386.webp";
import googleReviews from "@/public/images/google-reviews.png";
import trustpilotReviews from "@/public/images/trustpilot-reviews.png";
import logo from "@/public/images/Logo.png";
import payments from "@/public/images/Group-1000006933.png";

export type Product = {
  name: string;
  href: string;
  price: string;
  description: string;
  image: StaticImageData;
  alt: string;
};

export const site = {
  name: "Dream Custom Boxes",
  logo,
  payments,
  phone: "+1(888)-505-2845",
  phoneHref: "tel:+18885052845",
  email: "sales@dreamcustomboxes.com",
  address: "398 Fulton Street, Brooklyn, NY 11201",
  addressHref: "https://maps.app.goo.gl/CuUVNU2YmjaprMwQ7",
  editorUrl: "https://editor.dreamcustomboxes.com/",
  tagline:
    "Custom packaging with no minimums, free design support, and free worldwide shipping,",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/people/Dream-Custom-Boxes/61573813684503/" },
    { label: "Instagram", href: "https://www.instagram.com/dreamcustomboxes_official/" },
    { label: "Pinterest", href: "https://www.pinterest.com/dreamcustomboxes/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/dreamcustomboxes/" },
  ],
} as const;

/* ------------------------------------------------------------------ nav */

export type NavGroup = { title: string; href?: string; links: { label: string; href: string }[] };
export type NavItem = { label: string; groups: NavGroup[]; footer?: { label: string; href: string }[] };

export const nav: NavItem[] = [
  {
    label: "Box Types",
    groups: [
      {
        title: "Corrugated & Shipping",
        links: [
          { label: "Mailer Boxes", href: "/custom-mailer-boxes/" },
          { label: "Black Mailer Boxes", href: "/black-mailer-boxes/" },
          { label: "Rigid Mailers", href: "/custom-rigid-mailers/" },
          { label: "Candle Mailer Boxes", href: "/candle-mailer-boxes/" },
          { label: "Invitation Mailer Boxes", href: "/invitation-boxes/" },
          { label: "PR Boxes", href: "/pr-boxes/" },
          { label: "Shipping Boxes (RSC)", href: "/shipping-boxes/" },
          { label: "Corrugated Boxes", href: "/corrugated-boxes/" },
          { label: "Poly Mailers", href: "/poly-mailers/" },
          { label: "Bubble Mailers", href: "/custom-bubble-mailers/" },
        ],
      },
      {
        title: "Folding Cartons (Paperboard)",
        links: [
          { label: "Folding Cartons", href: "/folding-carton-paperboard-boxes/" },
          { label: "Straight Tuck End Boxes", href: "/straight-tuck-end-boxes/" },
          { label: "Reverse Tuck End Boxes", href: "/reverse-tuck-end-boxes/" },
          { label: "Gable Boxes", href: "/gable-boxes/" },
          { label: "Window Boxes", href: "/window-packaging-boxes/" },
          { label: "Die-Cut Boxes", href: "/die-cut-boxes/" },
          { label: "Kraft Boxes", href: "/kraft-boxes/" },
        ],
      },
      {
        title: "Rigid / Luxury",
        links: [
          { label: "Rigid Boxes", href: "/rigid-boxes/" },
          { label: "Magnetic Closure Boxes", href: "/rigid-magnetic-boxes/" },
          { label: "Two-Piece Boxes", href: "/two-piece-boxes/" },
          { label: "Shoulder Neck Boxes", href: "/rigid-shoulder-boxes/" },
          { label: "Drawer Boxes", href: "/rigid-drawer-boxes/" },
          { label: "Book-Style Boxes", href: "/book-boxes/" },
        ],
      },
      {
        title: "Retail Display / POP",
        links: [
          { label: "Display Boxes", href: "/display-boxes/" },
          { label: "Perforated Boxes", href: "/perforated-boxes/" },
          { label: "Dispenser Boxes", href: "/dispenser-boxes/" },
          { label: "PDQ Display Boxes", href: "/pdq-boxes/" },
        ],
      },
      {
        title: "Inserts & Structural Add-ons",
        links: [{ label: "Box Inserts", href: "/box-inserts/" }],
      },
    ],
    footer: [
      { label: "Box Styles", href: "/box-styles/" },
      { label: "Browse All Products", href: "/products/" },
    ],
  },
  {
    label: "Industries",
    groups: [
      {
        title: "Cosmetics & Beauty",
        href: "/cosmetic-boxes/",
        links: [
          { label: "Perfume Boxes", href: "/perfume-boxes/" },
          { label: "Press-On Nail Boxes", href: "/press-on-nail-boxes/" },
          { label: "Soap Boxes", href: "/soap-boxes/" },
          { label: "Soap Sleeves", href: "/soap-sleeve/" },
        ],
      },
      {
        title: "Bakery & Confectionery",
        href: "/bakery-boxes/",
        links: [
          { label: "Cake Boxes", href: "/cake-boxes/" },
          { label: "Cinnamon Roll Boxes", href: "/cinnamon-roll-boxes/" },
          { label: "Macaron Boxes", href: "/macaron-boxes/" },
          { label: "Bakery Bags", href: "/custom-bakery-bags/" },
        ],
      },
      {
        title: "Food & Beverage",
        href: "/food-boxes/",
        links: [
          { label: "Burger Boxes", href: "/burger-boxes/" },
          { label: "French Fries Boxes", href: "/french-fry-boxes/" },
          { label: "Cereal Boxes", href: "/cereal-boxes/" },
          { label: "Food Trays", href: "/custom-food-trays/" },
          { label: "Deli Paper", href: "/custom-deli-papers/" },
        ],
      },
      {
        title: "Apparel & Accessories",
        href: "/apparel-boxes/",
        links: [
          { label: "Shoe Boxes", href: "/shoe-boxes/" },
          { label: "Hat Boxes", href: "/hat-boxes/" },
          { label: "Belt Boxes", href: "/belt-boxes/" },
        ],
      },
      {
        title: "Candles & Home",
        href: "/candle-boxes/",
        links: [
          { label: "Candle Dust Covers", href: "/candle-dust-covers/" },
          { label: "Candle Mailer Boxes", href: "/candle-mailer-boxes/" },
        ],
      },
      {
        title: "CBD & Cannabis",
        href: "/cbd-boxes/",
        links: [
          { label: "Pre-Roll Boxes", href: "/pre-roll-boxes/" },
          { label: "Cigarette Boxes", href: "/cigarette-boxes/" },
          { label: "Cigar Boxes", href: "/cigar-boxes/" },
        ],
      },
      {
        title: "Jewelry & Watches",
        href: "/jewelry-boxes/",
        links: [
          { label: "Watch Boxes", href: "/watch-boxes/" },
          { label: "Earring Cards", href: "/earring-cards/" },
        ],
      },
      {
        title: "Electronics",
        href: "/electronics-boxes/",
        links: [{ label: "Mouse Boxes", href: "/mouse-boxes/" }],
      },
      {
        title: "Gifting & Events",
        href: "/gift-boxes/",
        links: [
          { label: "Blind Boxes", href: "/blind-boxes/" },
          { label: "Invitation Boxes", href: "/invitation-boxes/" },
          { label: "PR Boxes", href: "/pr-boxes/" },
        ],
      },
      {
        title: "Retail & General",
        href: "/retail-boxes/",
        links: [
          { label: "Display Boxes", href: "/display-boxes/" },
          { label: "Window Boxes", href: "/window-packaging-boxes/" },
        ],
      },
    ],
    footer: [
      { label: "Box Styles", href: "/box-styles/" },
      { label: "Browse All Products", href: "/products/" },
    ],
  },
  {
    label: "Bags & Pouches",
    groups: [
      {
        title: "Bags & Pouches",
        links: [
          { label: "Mylar Bags", href: "/mylar-bags/" },
          { label: "Paper Bags", href: "/paper-bags/" },
          { label: "Bakery Bags", href: "/custom-bakery-bags/" },
          { label: "Spout Pouches", href: "/spout-pouches/" },
          { label: "Stand Up Pouches", href: "/stand-up-pouches/" },
        ],
      },
    ],
  },
  {
    label: "Essentials",
    groups: [
      {
        title: "Branding & Labels",
        links: [
          { label: "Earring Cards", href: "/earring-cards/" },
          { label: "Custom Packaging Tape", href: "/custom-packaging-tape/" },
          { label: "Packaging Sleeves", href: "/packaging-sleeves/" },
          { label: "Hang Tags", href: "/hang-tags/" },
          { label: "Towel Belly Bands", href: "/towel-belly-bands/" },
        ],
      },
      {
        title: "Food & Display",
        links: [
          { label: "Table Tents", href: "/table-tents/" },
          { label: "Custom Deli Papers", href: "/custom-deli-papers/" },
          { label: "Custom Food Trays", href: "/custom-food-trays/" },
          { label: "Candle Dust Covers", href: "/candle-dust-covers/" },
          { label: "Soap Sleeve", href: "/soap-sleeve/" },
        ],
      },
    ],
  },
  {
    label: "Get Started",
    groups: [
      {
        title: "Get Started",
        links: [
          { label: "Order Process", href: "/order-process/" },
          { label: "Artwork Guidelines", href: "/artwork-guidelines/" },
          { label: "Materials Options Gallery", href: "/materials-options-gallery/" },
          { label: "Box Samples", href: "/box-samples/" },
          { label: "Dieline Templates", href: "/dieline-templates/" },
          { label: "Get Quote", href: "/get-quote/" },
          { label: "Blogs", href: "/blog/" },
        ],
      },
    ],
  },
];

export const announcements = ["Trusted by 1,200+ Brands", "No MOQ", "Free Shipping"];

/* ----------------------------------------------------------------- hero */

export const hero = {
  title: "Premium Custom Boxes For Your Products",
  copy: "Get custom packaging boxes at budget-friendly rates with no minimums, free design support, instant pricing, and fast turnaround times for your business.",
  primary: { label: "Get a Free Quote", href: "#quotation" },
  secondary: { label: "Design Your Box Online", href: site.editorUrl },
  image: heroImg,
  alt: "custom boxes",
  trust: { before: "Trusted by", link: "1200+ brands", after: "as their top-rated custom box manufacturer." },
};

/* --------------------------------------------------------- top sellers */

export const topSellers = {
  title: "Top Sellers From Our Custom Box Collection",
  products: [
    { name: "Display Boxes", href: "/display-boxes/", price: "$0.50", description: "Designed to showcase products with an open front or window.", image: displayBoxes, alt: "custom display box" },
    { name: "Folding Cartons", href: "/folding-carton-paperboard-boxes/", price: "$0.15", description: "Lightweight, versatile boxes perfect for retail packaging.", image: foldingCartons, alt: "folding cartons" },
    { name: "Mailer Boxes", href: "/custom-mailer-boxes/", price: "$0.50", description: "A durable, self-locking box built for shipping and secure storage.", image: mailerBoxes, alt: "custom mailer box" },
    { name: "Rigid Boxes", href: "/rigid-boxes/", price: "$1.75", description: "Premium, sturdy packaging for luxury products.", image: rigidBoxes, alt: "custom rigid box" },
  ] satisfies Product[],
};

/* ------------------------------------------------------------- process */

export const process = {
  title: "Easy Ordering Process",
  copy: "From design assistance to final delivery, our streamlined process ensures you get high-quality custom boxes on time.",
  steps: [
    { icon: "form", title: "Fill Out the Quote Form", copy: "Kickstart your order by sharing product details—dimensions, design ideas, and special requirements." },
    { icon: "quote", title: "Receive Your Personalized Quote", copy: "Our experts review your info and provide a tailored quote with a clear production plan." },
    { icon: "pen", title: "Fine-Tune Your Design", copy: "Upload artwork or work with our design team. We’ll send a digital proof for final adjustments." },
    { icon: "factory", title: "Production in Action", copy: "After approval, our team ensures high-quality production with rigorous quality checks." },
    { icon: "truck", title: "Fast & Reliable Delivery", copy: "We securely package and ship your order with tracking updates for peace of mind." },
  ],
} as const;

/* ---------------------------------------------------------- industries */

export const industries = {
  title: "Custom Packaging Boxes for Every Industry",
  paragraphs: [
    "Custom boxes are the perfect solution to showcase your products, no matter your industry. Whether you are a retail store or an online seller, our packaging solutions combine style and functionality to suit your brand.",
    "We offer fully customizable options designed to fit your exact needs. Need sturdy corrugated mailers, eco-friendly kraft boxes, or elegant luxury rigid boxes? We’ve got you covered with high-quality, tailored packaging that brings your vision to life.",
  ],
  products: [
    { name: "Burger Boxes", href: "/burger-boxes/", price: "$0.15", description: "Keep burgers fresh and mess-free with sturdy boxes.", image: burger, alt: "custom burger box" },
    { name: "French Fry Boxes", href: "/french-fry-boxes/", price: "$0.13", description: "Convenient boxes to keep fries crispy and easy to hold.", image: frenchFry, alt: "custom french fry box" },
    { name: "Candle Boxes", href: "/candle-boxes/", price: "$0.24", description: "Secure and aesthetic boxes for delicate candles.", image: candle, alt: "custom candle box" },
    { name: "Kraft Boxes", href: "/kraft-boxes/", price: "$0.16", description: "Eco-friendly boxes with a natural, earthy appeal.", image: kraft, alt: "custom kraft box" },
    { name: "Book Boxes", href: "/book-boxes/", price: "$0.48", description: "Side-opening boxes designed for an elegant reveal.", image: book, alt: "custom book box" },
    { name: "Perfume Boxes", href: "/perfume-boxes/", price: "$0.30", description: "Elegant, protective boxes for delicate perfume bottles.", image: perfume, alt: "custom perfume box" },
    { name: "Soap Boxes", href: "/soap-boxes/", price: "$0.16", description: "Functional and elegant boxes for soaps.", image: soap, alt: "custom soap box" },
    { name: "CBD Boxes", href: "/cbd-boxes/", price: "$0.20", description: "Custom-fit boxes for cannabis, CBD, and wellness products.", image: cbd, alt: "custom cbd box" },
    { name: "Food Boxes", href: "/food-boxes/", price: "$0.20", description: "Practical and protective boxes for all kinds of food items.", image: food, alt: "custom food boxes" },
    { name: "Cosmetic Boxes", href: "/cosmetic-boxes/", price: "$0.20", description: "Stylish boxes tailored for beauty and skincare products.", image: cosmetic, alt: "custom cosmetic boxes" },
    { name: "Bakery Boxes", href: "/bakery-boxes/", price: "$0.28", description: "Fresh, secure boxes for sweet and savory treats.", image: bakery, alt: "custom bakery boxes" },
    { name: "Retail Boxes", href: "/retail-boxes/", price: "$0.20", description: "Versatile boxes designed to stand out on shelves.", image: retail, alt: "custom retail boxes" },
    { name: "Gable Boxes", href: "/gable-boxes/", price: "$0.45", description: "Easy-carry boxes with a built-in handle for food and gifts.", image: gable, alt: "custom gable boxes" },
    { name: "Die Cut Boxes", href: "/die-cut-boxes/", price: "$0.35", description: "Custom-shaped boxes designed to match your product perfectly", image: dieCut, alt: "custom die cut boxes" },
    { name: "Window Boxes", href: "/window-packaging-boxes/", price: "$0.32", description: "Boxes with clear panels to showcase products inside.", image: windowBox, alt: "custom Window boxes" },
    { name: "PR Boxes", href: "/pr-boxes/", price: "$0.90", description: "High-end packaging designed for influencer kits and brand promotions.", image: prBox, alt: "custom PR boxes" },
  ] satisfies Product[],
};

/* ---------------------------------------------------------- why choose */

export const whyChoose = {
  title: "Why Choose Dream Custom Boxes for Custom Packaging",
  items: [
    {
      icon: "cursor",
      title: "Design Your Boxes Online",
      copy: "Design your own packaging with our self-service box design tool and bring your vision to life! Our expert designers are also here to help with free design support. Whether you need guidance on layouts, colors, or branding, we ensure your packaging boxes look professional and stand out.",
    },
    {
      icon: "layers",
      title: "NO MOQ Policy",
      copy: "No order is too big or too small for us! At Dream Custom Boxes, we have no Minimum Order Quantity (MOQ) requirement. Whether you need a few pieces or a bulk order, we provide premium custom packaging at wholesale prices, ensuring flexibility and affordability.",
    },
    {
      icon: "bolt",
      title: "Fastest Turnarounds",
      copy: "We value your time and ensure quick production. No matter the complexity of your design, we manufacture your boxes within 6 to 20 business days. Plus, enjoy free shipping all over the world, making your order even more cost-effective.",
    },
  ],
} as const;

/* --------------------------------------------------------------- quote */

export const quote = {
  title: "Can’t Find the Right Custom Box?",
  copy: "Need something specific? Fill out the form and our team will create a custom box solution that’s made to fit your product — perfectly.",
  units: ["in", "cm", "mm"],
  submit: "Get a Quote",
};

/* ---------------------------------------------------------- sample/eco */

export const sample = {
  title: "Try a Custom Box Before You Buy",
  copy: "We’ll send you a sample custom box based on your requirements, so you can check the quality, fit, and finish before placing a full order.",
  cta: { label: "Get Your Sample Box", href: "/box-samples/" },
  image: sampleBg,
};

export const eco = {
  title: "Eco-Friendly Custom Boxes That Make an Impact",
  copy: "Go green with custom boxes made from recycled, recyclable, or compostable materials. Smart packaging that’s good for the planet and your brand.",
  image: ecoBg,
};

/* ----------------------------------------------------------- stand out */

export const standOut = {
  image: prBox,
  imageAlt: "custom PR boxes",
  title: "What Makes Our Custom Boxes Stand Out",
  paragraphs: [
    "Every product deserves packaging that fits its unique needs, and it doesn’t always have to be expensive. That is why we offer custom boxes of any size, shape, and design—crafted from top-quality materials using the latest technology.",
    "Our packaging is crafted to protect your products, boost your brand, and create an unforgettable unboxing experience.",
  ],
  features: [
    { title: "Seamless Ordering Process", copy: "Get your packaging fast, exactly when you need it! Our seamless ordering process ensures hassle-free delivery straight to your doorstep—because your time matters." },
    { title: "Order What You Need—No Minimums", copy: "Whether you need just one box or thousands, we’ve got you covered. Order with confidence, knowing you can get exactly what you need without any restrictions." },
    { title: "Design Your Boxes Online or With Experts", copy: "Use our online design tool with an interactive 3D preview, or collaborate with our design team to create custom boxes that reflect your brand’s unique style and make your products stand out." },
    { title: "Custom Packaging Solutions", copy: "Choose from a variety of materials, including corrugated and kraft, for sturdy, stylish, and sustainable packaging." },
    { title: "Custom Printed Boxes", copy: "Showcase your brand with high-quality prints that make a lasting impression." },
    { title: "Custom Size Boxes", copy: "Get a precise fit for your products for maximum protection and presentation." },
    { title: "Custom Shipping Boxes", copy: "Built to withstand transit while keeping your items secure." },
    { title: "Custom Boxes with Logo", copy: "Strengthen brand recognition with a bold, eye-catching logo on your packaging" },
  ],
};

export const trusted = {
  title: "Trusted Custom Box Maker – A Choice of 1200+ Brands",
  copy: "We are a reliable custom box manufacturer trusted by more than 1200 brands. We help businesses to stand out with our advanced printing techniques. At Dream Custom Boxes, we provide packaging solutions with premium finishing and add-on options, such as UV coating, Spot UV, embossing, foil stamping, and more. We offer eco-friendly materials for custom boxes without compromising on durability or style. Whether you need short-run packaging or bulk production, we ensure precision, quality, and a seamless experience for your packaging manufacturing process.",
  closing: "Order your custom packaging boxes today and give your brand the attention it deserves!",
  finishes: ["UV coating", "Spot UV", "Embossing", "Foil stamping"],
  cta: { label: "Get a Free Quote", href: "#quotation" },
};

/* ------------------------------------------------------------- reviews */

export const reviews = {
  eyebrow: "Customer Stories",
  title: "Experiences that speak for themselves",
  badges: [
    { href: "https://maps.app.goo.gl/6rkNUX6hoewHXT827", image: googleReviews, alt: "Google Reviews" },
    { href: "https://www.trustpilot.com/review/dreamcustomboxes.com", image: trustpilotReviews, alt: "Trustpilot" },
  ],
  allHref: "/customer-reviews/",
  items: [
    { name: "Brianna Ballinger", rating: "5.0", text: "The boxes are exactly what I was looking for! Thank you so much!" },
    { name: "Jessica Joe", rating: "5.0", text: "Quick and easy process! I like the way their customer support support." },
    { name: "Alma Harry", rating: "5.0", text: "Was a little nervous ordering custom boxes online, but it worked out well. They answered my questions and helped fix a sizing isuue before production. The final result looked clean and professional. Happy with the outcome overall." },
    { name: "Nolan Sewell", rating: "5.0", text: "Very good customer service." },
  ],
};

/* ----------------------------------------------------------------- faq */

export const faqs = {
  title: "FAQs About Custom Boxes",
  items: [
    { q: "How do I design custom boxes with Dream Custom Boxes?", a: "You can use our online editor tool to design your custom boxes with a real-time 3D Preview. If you still need help designing your custom box packaging, our experts are here to help." },
    { q: "How long does it take to get custom boxes?", a: "Production usually takes 6 to 20 business days. If you're in a hurry, we also offer rush options." },
    { q: "What is the minimum order quantity for custom boxes?", a: "There’s no minimum. Whether you need just one box or a large batch, we’re happy to help." },
    { q: "What types of custom boxes do you offer?", a: "We offer all kinds of boxes, including mailers, rigid boxes, folding cartons, and custom solutions for any product or industry." },
    { q: "Do you offer eco-friendly custom box options?", a: "Yes. We use recyclable materials, soy-based inks, and other sustainable options as part of our regular service." },
    { q: "How much do custom boxes cost?", a: "Pricing depends on your box size, material, print style, and quantity. Just send us your details and we’ll quote it for you." },
    { q: "How do I choose the right packaging material for my product?", a: "Choosing the right packaging material depends on your product type, weight, and how it will be used. Our team helps you select the best material based on durability, protection, and presentation to ensure your product is packaged perfectly." },
    { q: "Do you charge extra based on the number of colors and the amount of ink on the box?", a: "No, we do not charge extra for multiple colors when using standard CMYK printing. Additional charges may apply for special color systems or premium finishes, which will be clearly discussed before production." },
    { q: "Can I see my final design on the box before committing to a full order?", a: "Yes, we provide a 3D digital mockup, so you can review your custom box before mass production. This helps you check the design, material, and overall quality with confidence." },
    { q: "Can I get a sample before ordering in bulk?", a: "Yes. You can order a packaging sample to check the material quality, print clarity, and finishing options before placing a bulk order." },
  ],
};

/* ---------------------------------------------------------------- blog */

export const blog = {
  eyebrow: "From the blog",
  title: "Packaging Tips & Insights",
  copy: "Expert guides, design ideas, and industry knowledge to help you package smarter and grow your brand.",
  more: "Explore more guides, packaging ideas, and industry tips on our blog.",
  allHref: "/blog/",
  posts: [
    { title: "Why Use Custom Mailer Boxes?", href: "/why-use-custom-mailer-boxes/", author: "Fasih Rauf", date: "April 27, 2026", image: blogMailer, alt: "custom-mailer-box" },
    { title: "What Does Customized Packaging Mean?", href: "/what-does-customized-packaging-mean/", author: "Fasih Rauf", date: "April 24, 2025", image: blogCustomized, alt: "customized packaging" },
    { title: "The Importance of Packaging in Marketing a Product?", href: "/importance-of-packaging-in-marketing-a-product/", author: "Fasih Rauf", date: "July 25, 2024", image: blogImportance, alt: "the importance of packaging" },
    { title: "Types of Boxes: Choosing the Right Boxes for Your Business", href: "/types-of-boxes/", author: "Fasih Rauf", date: "July 11, 2024", image: blogTypes, alt: "different types of boxes" },
  ],
};

/* -------------------------------------------------------------- footer */

export const footerLinks = [
  {
    title: "Products",
    links: [
      { label: "Custom Boxes", href: "/" },
      { label: "Mailer Boxes", href: "/custom-mailer-boxes/" },
      { label: "Rigid Boxes", href: "/rigid-boxes/" },
      { label: "Folding Cartons", href: "/folding-carton-paperboard-boxes/" },
      { label: "Mylar Bags", href: "/mylar-bags/" },
      { label: "Paper Bags", href: "/paper-bags/" },
      { label: "Display Boxes", href: "/display-boxes/" },
      { label: "Candle Boxes", href: "/candle-boxes/" },
      { label: "Soap Boxes", href: "/soap-boxes/" },
      { label: "Browse All", href: "/products/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Contact Us", href: "/contact-us/" },
      { label: "Blog", href: "/blog/" },
      { label: "FAQs", href: "/faqs/" },
      { label: "Case Studies", href: "/case-study/" },
      { label: "Why Dream Custom Boxes?", href: "/why-dream-custom-boxes/" },
    ],
  },
  {
    title: "Need Help?",
    links: [
      { label: "How to Order", href: "/order-process/" },
      { label: "Get Free Quote", href: "/get-quote/" },
      { label: "Order Samples", href: "/box-samples/" },
      { label: "Dieline Templates", href: "/dieline-templates/" },
      { label: "Artwork Guidelines", href: "/artwork-guidelines/" },
      { label: "Materials Library", href: "/materials-options-gallery/" },
      { label: "Shipping & Returns", href: "/shipping-return-policy/" },
    ],
  },
];

export const legal = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Condition", href: "/terms-conditions/" },
];
