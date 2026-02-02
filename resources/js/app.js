import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './components/App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './resources/css/app.css';


// Configure axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Get CSRF token from meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]');
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
    console.log('CSRF token loaded');
}

// Request interceptor for debugging
axios.interceptors.request.use(
    config => {
        console.log(`➡️ [Request] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    error => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for debugging
axios.interceptors.response.use(
    response => {
        console.log(`✅ [Response ${response.status}] ${response.config.url}`);
        return response;
    },
    error => {
        console.error('❌ Response Error:', {
            URL: error.config?.url,
            Method: error.config?.method,
            Status: error.response?.status,
            Data: error.response?.data,
            Message: error.message
        });
        
        // Show user-friendly error messages
        if (error.response) {
            // Server responded with error
            switch (error.response.status) {
                case 404:
                    alert(`API endpoint not found: ${error.config.url}\n\nPlease make sure:\n1. API routes are defined\n2. Server is running\n3. URL is correct`);
                    break;
                case 500:
                    alert('Server error. Please check Laravel logs.');
                    break;
                default:
                    alert(`Error ${error.response.status}: ${error.response.data?.message || 'Unknown error'}`);
            }
        } else if (error.request) {
            // Request made but no response
            alert('Network error! Please check:\n1. Laravel server is running (php artisan serve)\n2. No CORS issues\n3. Network connection');
        } else {
            // Something else
            alert('Error: ' + error.message);
        }
        
        return Promise.reject(error);
    }
);

// Create and mount Vue app
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

console.log('🎉 Vue app mounted successfully!');

// Test API connection on load
axios.get('/api/test')
    .then(response => {
        console.log('✅ API Test Successful:', response.data);
    })
    .catch(error => {
        console.error('❌ API Test Failed:', error);
        alert('Cannot connect to API. Please check console for details.');
    });