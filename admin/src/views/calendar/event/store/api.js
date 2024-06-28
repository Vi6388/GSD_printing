import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point
export const uploadBannerFileRequest = (payload) => API.post(`/file-manager/fileupload`, payload);
