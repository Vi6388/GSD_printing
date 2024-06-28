import axios from 'axios';
import { toast } from 'react-toastify';

//convert docx to pdf on separate api
export async function convertDocxToPdf(payload) {
  try {
    const data = await axios.post('https://35.223.101.166:4002/docxtopdf', payload);
    if (data) {
      return data;
    }
  } catch (error) {
    toast.error('something went wrong. Please try again' + error);
  }
}
