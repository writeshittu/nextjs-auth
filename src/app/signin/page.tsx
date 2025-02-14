"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword } from '../../../lib/validation';
import { LoadingButton } from '../component/CustomButton';
import Link from 'next/link';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [isSocialPage, setIsSocialPage] = useState(true)
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();

  const handleSocialSignIn = async (provider: string) => {
    setSocialLoading(provider);
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error(error);
    } finally {
      setSocialLoading('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      setLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setErrors({ submit: 'Invalid credentials' });
      } else {
        router.push('/');
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-center text-2xl font-semibold mb-16">
          Sign in to read Stears
        </h2>

        {isSocialPage ? (
          <div className='flex flex-col gap-3'>
            <LoadingButton 
            variant="secondary"
              onClick={() =>
                signIn("google", { callbackUrl: "/articles" })
              }
          
            >
                  <img src="/googleIcon.svg" alt=''/>
                  <p>Sign in with Google</p>
                </LoadingButton>

            <LoadingButton
            variant="secondary"
              onClick={() =>
                signIn("facebook", { callbackUrl: "/articles" })
              }
            > <img src="/facebook-icon.png" width={'23px'} alt=''/>
                  <p>Sign in with Facebook</p></LoadingButton>
            <LoadingButton
            variant="secondary"
              onClick={() => setIsSocialPage(false)}
              
            ><p>Sign in with username and password</p></LoadingButton>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <LoadingButton
                type="submit"
               variant="primary"
              >
               <span> Sign in</span>
              </LoadingButton>
            </form>

            <div className="text-center mt-6">
              <LoadingButton
              variant="secondary"
                onClick={() => setIsSocialPage(true)}
              >
                Sign in with social
              </LoadingButton>
            </div>

            <div className="text-center mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
