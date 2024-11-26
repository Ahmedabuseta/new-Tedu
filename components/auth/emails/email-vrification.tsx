import React from 'react';
import { Heading, Text, Link } from '@react-email/components';
import WrapperEmail from './wraper-mail';

const EmailVerificationEmail = ({ verificationLink }:{verificationLink:string}) => (
  <WrapperEmail>
    <Heading className="text-lg font-semibold text-gray-800 mb-4">Verify Your Email Address</Heading>
    <Text className="text-base text-gray-600 mb-4">
      Hi there,
    </Text>
    <Text className="text-base text-gray-600 mb-4">
      Please click the link below to verify your email address and complete the registration process:
    </Text>
    <Link href={verificationLink} className="bg-blue-500 text-white px-4 py-2 rounded inline-block text-center">
      Verify Email
    </Link>
    <Text className="text-sm text-gray-500 mt-4">
      If you did not create an account, no further action is required.
    </Text>
  </WrapperEmail>
);

export default EmailVerificationEmail;
