'use client';

import '@mantine/core/styles.css';
import './accountpage.css';

import Image from 'next/image';
import { Inter } from 'next/font/google';
import {
  Button,
  Divider,
  MantineProvider,
  PasswordInput,
  SegmentedControl,
  SimpleGrid,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const inter = Inter({ subsets: ['latin'] });

const TOGGLE_OPTIONS = [
  { label: 'Sign Up', value: 'signup' },
  { label: 'Login', value: 'login' },
];

const fieldProps = {
  required: true,
  withAsterisk: false,
  radius: 5,
  classNames: { input: 'account-input', label: 'account-label' },
};

const passwordProps = {
  ...fieldProps,
  placeholder: 'Enter your password',
  visibilityToggleIcon: ({ reveal }) =>
    reveal ? <FaEyeSlash size={20} /> : <FaEye size={20} />,
};

function AccountForm() {
  const form = useForm({
    initialValues: {
      mode: 'signup',
      username: '',
      email: '',
      emailOrUsername: '',
      password: '',
      repeatedPassword: '',
    },
    validate: {
      repeatedPassword: (value, values) =>
        values.mode === 'signup' && value !== values.password
          ? 'Passwords do not match.'
          : null,
    },
  });

  const isSignUp = form.values.mode === 'signup';

  // Send the data to your API or auth provider here.
  // Avoid logging passwords, even during development.
  const handleSubmit = ({ mode, email, emailOrUsername }) => {
    console.log('Submitted:', {
      mode,
      account: isSignUp ? email : emailOrUsername,
    });
  };

  return (
    <section
      className={`account-form-panel ${isSignUp ? '' : 'account-login-panel'}`}
    >
      <div className="account-form-content">
        <h1 className="account-title">
          {isSignUp ? 'Create your account' : 'Login to your account'}
        </h1>

        <SegmentedControl
          fullWidth
          radius={10}
          transitionDuration={250}
          data={TOGGLE_OPTIONS}
          classNames={{
            root: 'account-toggle',
            indicator: 'account-toggle-thumb',
            label: 'account-toggle-label',
          }}
          {...form.getInputProps('mode')}
        />

        <form className="account-form" onSubmit={form.onSubmit(handleSubmit)}>
          {isSignUp ? (
            <>
              <TextInput
                {...fieldProps}
                label="Username"
                placeholder="Enter your username"
                autoComplete="username"
                {...form.getInputProps('username')}
              />
              <TextInput
                {...fieldProps}
                type="email"
                label="Email"
                placeholder="Enter your email"
                autoComplete="email"
                {...form.getInputProps('email')}
              />
            </>
          ) : (
            <TextInput
              {...fieldProps}
              label="Email/Username"
              placeholder="Enter your email or username"
              autoComplete="username"
              {...form.getInputProps('emailOrUsername')}
            />
          )}

          <PasswordInput
            {...passwordProps}
            label="Password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            {...form.getInputProps('password')}
          />

          {isSignUp && (
            <PasswordInput
              {...passwordProps}
              label="Repeat the Password"
              autoComplete="new-password"
              {...form.getInputProps('repeatedPassword')}
            />
          )}

          <Button type="submit" color="black" radius={8} h={42} mt={8}>
            {isSignUp ? 'Create Account' : 'Login'}
          </Button>
        </form>

        <Divider
          className="account-divider"
          color="#8a8a8a"
          label="or continue with"
        />

        <SimpleGrid cols={2} spacing={12}>
          <Button
            className="account-google-button"
            variant="white"
            radius={10}
            h={54}
            aria-label="Continue with Google"
          >
            <FcGoogle size={24} />
          </Button>
          <Button
            color="black"
            radius={10}
            h={54}
            aria-label="Continue with Apple"
          >
            <FaApple size={24} />
          </Button>
        </SimpleGrid>
      </div>
    </section>
  );
}

export default function AccountPage() {
  return (
    <MantineProvider
      forceColorScheme="light"
      theme={{ fontFamily: inter.style.fontFamily }}
    >
      <main className="account">
        <aside className="account-image-panel">
          <Image
            src="/account-photo.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 0px, 47vw"
            className="account-photo"
          />
        </aside>

        <AccountForm />
      </main>
    </MantineProvider>
  );
}