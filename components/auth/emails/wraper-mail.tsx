import React, { ReactNode } from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Img,
} from "@react-email/components";

const WrapperEmail = ({ children }: { children: ReactNode }) => (
  <>
    {" "}
    <Html>
    <Head />
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
    `}</style>
    <Body className="bg-gray-100 text-slate-900 font-sans">
      <Container className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <Section className="text-center border-b border-gray-200 pb-6">
          <Img src="https://utfs.io/f/aaa8c9d0-09e1-4bb9-a2ca-c5514dc2d8e4-cidyrr.png" alt="Pioneer Logo" className="w-24 h-auto mx-auto" />
          <Heading className="text-2xl font-semibold text-gray-800 mt-4">Pioneer</Heading>
        </Section>
        <Section className="py-6">
          {children}
        </Section>
        <Section className="text-center border-t border-gray-200 pt-6">
          <Text className="text-sm text-gray-600">
            © {new Date().getFullYear()} Pioneer. All rights reserved.
          </Text>
          <div className="mt-4">
            <Link href="https://pioneer.com/privacy" className="text-sm text-blue-500 hover:underline mx-2">Privacy Policy</Link>
            <Link href="https://pioneer.com/contact" className="text-sm text-blue-500 hover:underline mx-2">Contact Us</Link>
          </div>
          <div className="mt-4">
            <Link href="https://twitter.com/pioneer" className="text-blue-500 mx-2">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6 inline" />
            </Link>
            <Link href="https://facebook.com/pioneer" className="text-blue-500 mx-2">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6 inline" />
            </Link>
            <Link href="https://instagram.com/pioneer" className="text-blue-500 mx-2">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" className="w-6 h-6 inline" />
            </Link>
          </div>
        </Section>
      </Container>
    </Body>
  </Html>
  </>
);

export default WrapperEmail;
