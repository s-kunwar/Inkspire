import type { UserSignUp, SignUpResponse } from '../types';

// This is a mock API service. In a real application, this function would
// make an HTTP request to your backend server (e.g., using fetch or axios)
// to create a new user in your MongoDB database.

export const signUp = (userData: UserSignUp): Promise<SignUpResponse> => {
  console.log('Simulating sign-up for:', userData.email);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a successful sign-up
      if (userData.email && userData.password && userData.password.length >= 8) {
        resolve({
          success: true,
          message: `Welcome, ${userData.name}! Your account has been created.`,
        });
      } else if (userData.password.length < 8) {
          // Simulate a validation error
          reject({
              success: false,
              message: 'Password must be at least 8 characters long.',
          });
      } else {
        // Simulate a generic server error
        reject({
          success: false,
          message: 'An error occurred during sign-up. Please try again.',
        });
      }
    }, 1500); // Simulate network latency
  });
};
