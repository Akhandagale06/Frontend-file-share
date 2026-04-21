const BASE_URL = "https://file-share-backend-lrzq.onrender.com/api/v1.0";

const apiEndpoint ={
    FETCH_FILES: `${BASE_URL}/files/my`,
    GET_CREDITS : `${BASE_URL}/users/credits`,
    UPLOAD_FILE: `${BASE_URL}/files/upload`,
    TOGGLE_FILE: (id) => `${BASE_URL}/files/${id}/toggle-public`,
    DOWNLOAD_FILE: (id) => `${BASE_URL}/files/download/${id}`,
    DELETE_FILE: (id) => `${BASE_URL}/files/${id}`,
    SHARE_LINK: (id) => `${BASE_URL}/files/${id}/share-link`,
    CREATE_ORDER:`${BASE_URL}/payments/create-order`,
    VERIFY_PAYMENT:`${BASE_URL}/payments/verify-payment`,
    GET_TRANSACTIONS:`${BASE_URL}/transactions`,
    PUBLIC_FILE_VIEW :(fileId)=>`${BASE_URL}/files/public/${fileId}`

}
export default apiEndpoint;