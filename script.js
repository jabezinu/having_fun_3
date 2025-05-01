document.addEventListener('DOMContentLoaded', function() {
    const signInBtn = document.querySelector('#sign-in-btn');
    const signUpBtn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');
    const loginForm = document.querySelector('#loginForm');
    const signupForm = document.querySelector('#signupForm');
    
    // Local storage keys
    const USERS_STORAGE_KEY = 'barberShopUsers';
    
    // Toggle between sign up and sign in panels
    signUpBtn.addEventListener('click', () => {
        container.classList.add('sign-up-mode');
    });
    
    signInBtn.addEventListener('click', () => {
        container.classList.remove('sign-up-mode');
    });
    
    // Initialize users array from local storage or create empty array
    function getUsers() {
        const users = localStorage.getItem(USERS_STORAGE_KEY);
        return users ? JSON.parse(users) : [];
    }
    
    // Save users to local storage
    function saveUsers(users) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
    
    // Form validation functions
    function validatePhone(phone) {
        // Basic phone validation - can be customized based on country format
        const phoneRegex = /^\d{10}$/; // Simple 10-digit format
        return phoneRegex.test(phone);
    }
    
    function validatePassword(password) {
        // Password should be at least 6 characters
        return password.length >= 6;
    }
    
    // Handle signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.querySelector('#signupName').value.trim();
        const phone = document.querySelector('#signupPhone').value.trim();
        const password = document.querySelector('#signupPassword').value;
        
        // Validate inputs
        if (!name) {
            alert('Please enter your name');
            return;
        }
        
        if (!validatePhone(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        
        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters long');
            return;
        }
        
        // Check if user already exists
        const users = getUsers();
        const existingUser = users.find(user => user.phone === phone);
        
        if (existingUser) {
            alert('An account with this phone number already exists');
            return;
        }
        
        // Add new user
        users.push({ name, phone, password });
        saveUsers(users);
        
        alert('Account created successfully! You can now sign in.');
        
        // Clear form and switch to sign in
        signupForm.reset();
        container.classList.remove('sign-up-mode');
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phone = document.querySelector('#loginPhone').value.trim();
        const password = document.querySelector('#loginPassword').value;
        
        // Validate inputs
        if (!validatePhone(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // Find user
        const users = getUsers();
        const user = users.find(user => user.phone === phone && user.password === password);
        
        if (!user) {
            alert('Invalid phone number or password');
            return;
        }
        
        // Successful login
        alert(`Welcome back, ${user.name}!`);
        loginForm.reset();
        
        // In a real application, you would redirect to a dashboard or home page
        // For this demo, we'll just show a success message
        // window.location.href = 'dashboard.html';
    });
});
