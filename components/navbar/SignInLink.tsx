import { SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

function SignInLink() {
  return (
    <SignInButton>login</SignInButton>
  )
}

export default SignInLink;