'use client'

import Image from 'next/image';

import { React, useEffect, useState } from 'react'
import { useForm } from '@mantine/form';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button, Checkbox, Divider, MantineProvider, PasswordInput, SegmentedControl, SimpleGrid, TextInput } from '@mantine/core'
import { Check, Eye, EyeOff, X } from 'lucide-react';

import { ACCOUNT_PHOTOS } from '@/data/photosHandle';
import { PASSWORD_RULES } from '@/data/passwordRules';

import '@mantine/core/styles.css'
import '@/styles/pages-css/account-page.css'

// Toggle options for the log in
const OPTIONS = [
    { label: 'Sign Up', value: 'signup' },
    { label: 'Sign In', value: 'signin'},
];

// Settings every field shares 
const fieldProps = {
    required: true,
    withAsterisk: false,
    radius: 5,
    classNames: { input: 'account-input', label: 'account-label' },
};

// Pick a random image, skipping the one shown on the last load
const pickPhoto = () => {
    let lastPhoto = null;
 
    // Browser storage can be blocked, the image is still random without it
    try {
        lastPhoto = sessionStorage.getItem('account-photo');
    } catch {}
 
    const choices = ACCOUNT_PHOTOS.filter((photo) => photo !== lastPhoto);
    const photo = choices[Math.floor(Math.random() * choices.length)] ?? ACCOUNT_PHOTOS[0];
 
    try {
        sessionStorage.setItem('account-photo', photo);
    } catch {}
 
    return photo;
};

export default function AccountPage() {
    // Starts empty so the server and browser render the same thing
    const [photo, setPhoto] = useState(null);  
    
    useEffect(() => {
      setPhoto(pickPhoto());
    }, []);

    // Store every field values and updates it as the user types
      const form = useForm({
          initialValues: {
          mode: 'signup', // Records which view is showing
          username: '',
          email: '',
          emailOrUsername: '',
          password: '',
          repeatedPassword: '',
          },

          // The rules only apply to sign up, so sign in just needs the existing password
          validate: {
            password: (value, values) =>
              values.mode === 'signup' && !PASSWORD_RULES.every((rule) => rule.test(value))
                ? 'Password does not meet requirements'
                : null,
              repeatedPassword: (value, values) =>
                values.mode === 'signup' && value !== values.password
                  ? 'Passwords do not match'
                  : null,
          }
      });

      const isSignUp = form.values.mode === 'signup';

      // Clear any errors from the previous view when switching
      const handleModeChange = (mode) => {
        form.setFieldValue('mode', mode);
        form.clearErrors()
      };

      // Password settings
      const passwordProps = {
          ...fieldProps,
          placeholder: 'Enter your password',
          visibilityToggleIcon: ({ reveal }) =>
          reveal ? <EyeOff size={20} /> : <Eye size={20} />,
      };    
  
      // Send the data to the API or auth provider created
      // Avoid logging passwords, especially during app developments
      const handleSubmit = (values) => {
          console.log('Submitted:', {
              mode: values.mode,
              account: isSignUp ? values.email : values.emailOrUsername,
              ...(!isSignUp && { rememberMe: values.rememberMe }),
          });
      };

    return (
      <MantineProvider forceColorScheme="light">
        <main className="account">
          <aside className="account-image-panel">
            {photo && <Image src={photo} alt="" className="account-photo" fill priority sizes="(max-width: 900px) 0px, 47vw" />}
          </aside>
  
          <section className={`account-form-panel ${isSignUp ? '' : 'account-login-panel'}`}>
            <div className="account-form-content">
              <h1 className="account-title">
                {isSignUp ? 'Create your account' : 'Login to your account'}
              </h1>
  
              <SegmentedControl fullWidth radius={10} transitionDuration={250} data={OPTIONS} classNames={{root: 'account-toggle', indicator: 'account-toggle-thumb', label: 'account-toggle-label', }} {...form.getInputProps('mode')} />
  
              <form className="account-form" onSubmit={form.onSubmit(handleSubmit)}>
                {isSignUp ? (
                  <>
                    <TextInput {...fieldProps} label="Username" placeholder="Enter your username" autoComplete="username" {...form.getInputProps('username')} />
                    <TextInput {...fieldProps} type="email" label="Email" placeholder="Enter your email" autoComplete="email" {...form.getInputProps('email')}/>
                  </>) : (
                  <TextInput {...fieldProps} label="Email/Username" placeholder="Enter your email or username" autoComplete="username" {...form.getInputProps('emailOrUsername')} />
                )}
  
                <PasswordInput {...passwordProps} label="Password" autoComplete={isSignUp ? 'new-password' : 'current-password'} {...form.getInputProps('password')} />
  
                {isSignUp && (
                  <ul className="account-password-rules" aria-label='Password requirements'>
                    {PASSWORD_RULES.map((rule) => {
                      const isMet = rule.test(form.values.password);

                      return (
                        <li key={rule.label} className={`account-password-rule ${isMet ? 'account-password-rule-met' : ''}`}>
                          {isMet ? <Check size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />}

                          <span>{rule.label}</span>                      
                        </li>
                      );
                    })}
                  </ul>
                )}

                {isSignUp && (
                  <PasswordInput {...passwordProps} label="Repeat the Password" autoComplete="new-password" {...form.getInputProps('repeatedPassword')}/> 
                  )}

                {!isSignUp && (
                  <Checkbox color="black" label="Remember me" {...form.getInputProps('rememberMe', { type: 'checkbox' })} />
                )}

                <Button type="submit" color="black" radius={8} h={42} mt={8}>
                  {isSignUp ? 'Create Account' : 'Login'}
                </Button>
              </form>
  
              <Divider className="account-divider" color="#8a8a8a" label="or continue with" />
  
              <SimpleGrid cols={2} spacing={12}>
                <Button className="account-google-button"variant="white" radius={10} h={54} aria-label="Continue with Google" >
                  <FcGoogle size={24} />
                </Button>
                <Button color="black" radius={10} h={54} aria-label="Continue with Apple" >
                  <FaApple size={24} />
                </Button>
              </SimpleGrid>
            </div>
          </section>
        </main>
      </MantineProvider>
    );
  }