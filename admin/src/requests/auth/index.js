import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';
import { toast } from 'react-toastify';

const API = customInterIceptors();

// register
async function registerRQ(payload) {
  const { data } = await API.post(ENDPOINTS.SIGN_UP, payload);
  return data;
}

export function register() {
  return useMutation(registerRQ, {
    onSuccess: (response) => {
      const status = response?.data?.status;
      if(!status) {
        toast.error(response?.data?.msg);
      } else {
        toast.success('Sign Up successfull.');
      }
    },
    onError: () => {
      toast.error("Unsuccessfull! Please enter correctly Info.")
    }
  })
}

// fetch client contacts
async function fetchClientContactsRQ() {
  const { data } = await API.get('/client-contact');
  return data;
}

export function useGetClientContacts() {
  return useQuery('client-contact', fetchClientContactsRQ);
}

// Send password reset OTP
async function sendPasswordResetOtpRQ(payload) {
  const { data } = await API.post(ENDPOINTS.SEND_PASS_RESET_OTP, payload);
  return data;
}

export function useSendResetPassOTP() {
  return useMutation(sendPasswordResetOtpRQ, {
    onSuccess: () => {
      toast.success('OTP sending successfull');
    },
    onError: () => {
      toast.error('Unsuccessfull! Type a valid Email.');
    }
  });
}

// Reset Password
async function resetPasswordRQ(payload) {
  const { data } = await API.patch(ENDPOINTS.RESET_PASS, payload);
  return data;
}

export function useResetPass() {
  return useMutation(resetPasswordRQ, {
    onSuccess: () => {
      toast.success('Password Reset Successfull');
    },
    onError: () => {
      toast.error('Invalid OTP');
    }
  });
}

// Reset Password
// fetch client contacts
async function fetchUserPermissionRQ(payload) {
  const { data } = await API.get('/client-contact');
  return data;
}

export function useGetPermissions() {
  return useQuery('user-permission', fetchUserPermissionRQ);
}
