import axios from 'axios';

const instance = axios.create({
    baseURL:'https://shopping-test-backend.herokuapp.com',   
})

// instance.interceptors.request.use((req)=>{
//     if(localStorage.getItem('UserProfile')){
//         req.headers['authorization'] = `Bearer ${JSON.parse(localStorage.getItem('UserProfile')).token }`;
//     }
//     return req;
// })

export const signIn = (formData) => instance.post('/user/signin', formData);
export default instance;