import React from 'react';
import { Heading, Text, Link } from '@react-email/components';
import WrapperEmail from './wraper-mail';

const WelcomeEmail = () => (
  <WrapperEmail>
    <Heading className="text-lg font-semibold text-gray-800 mb-4">Welcome to Pioneer!</Heading>
    <Text className="text-base text-gray-600 mb-4">
      Hi there,
    </Text>
    <Text className="text-base text-gray-600 mb-4">
      Thank you for joining Pioneer. We are thrilled to have you with us. Get ready to explore our services and make the most out of them.
    </Text>
    <Link href="https://pioneer.com" className="bg-blue-500 text-white px-4 py-2 rounded inline-block text-center">
      Visit our website
    </Link>
    <Text className="text-sm text-gray-500 mt-4">
      If you have any questions, feel free to <Link href="mailto:support@pioneer.com" className="text-blue-500 hover:underline">contact us</Link>.
    </Text>
  </WrapperEmail>
);

export default WelcomeEmail;
