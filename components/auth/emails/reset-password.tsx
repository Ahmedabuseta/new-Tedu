import React from 'react';
import { Heading, Text, Link } from '@react-email/components';
import WrapperEmail from './wraper-mail';

const PasswordResetEmail = ({ resetLink }:{resetLink:string}) => (
  <WrapperEmail>
    <Heading className="text-lg font-semibold text-gray-800 mb-4">Password Reset Request</Heading>
    <Text className="text-base text-gray-600 mb-4">
      Hi there,
    </Text>
    <Text className="text-base text-gray-600 mb-4">
      We received a request to reset your password. Click the link below to reset your password:
    </Text>
    <Link href={resetLink} className="bg-blue-500 text-white px-4 py-2 rounded inline-block text-center">
      Reset Password
    </Link>
    <Text className="text-sm text-gray-500 mt-4">
      If you did not request a password reset, please ignore this email or contact support if you have any questions.
    </Text>
  </WrapperEmail>
);

export default PasswordResetEmail;
