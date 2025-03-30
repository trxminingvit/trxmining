document.addEventListener('DOMContentLoaded', function() {
    // Registration and Login tab switching
    const phoneTabs = document.querySelectorAll('#phone-tab');
    const usernameTabs = document.querySelectorAll('#username-tab');

    if (phoneTabs.length > 0 && usernameTabs.length > 0) {
        phoneTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                this.classList.add('active');
                document.querySelectorAll('#username-tab').forEach(tab => tab.classList.remove('active'));
            });
        });

        usernameTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                this.classList.add('active');
                document.querySelectorAll('#phone-tab').forEach(tab => tab.classList.remove('active'));
            });
        });
    }

    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.password-input i');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // Form submission handling
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Store user data in localStorage for demo purposes
            // In a real application, you would send this data to a server
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const loginPassword = document.getElementById('login-password').value;
            const securityPassword = document.getElementById('security-password').value;
            const inviteCode = document.getElementById('invite-code').value;

            localStorage.setItem('user_phone', phone);
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_password', loginPassword);
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple login validation for demo purposes
            // In a real application, you would validate credentials with a server
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const storedPhone = localStorage.getItem('user_phone');
            const storedPassword = localStorage.getItem('user_password');
            
            if ((username === storedPhone) && (password === storedPassword)) {
                // Successful login, redirect to home page
                window.location.href = 'home.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Investment tabs
    const investTabs = document.querySelectorAll('.invest-tabs .tab');
    if (investTabs.length > 0) {
        investTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                investTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                // Here you would typically show/hide content based on the selected tab
            });
        });
    }

    // FAQ toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
                const icon = this.querySelector('i');
                if (faqItem.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
    }

    // Copy button functionality
    const copyBtn = document.querySelector('.btn-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const userIdText = this.previousElementSibling.textContent;
            navigator.clipboard.writeText(userIdText)
                .then(() => {
                    alert('Text copied to clipboard!');
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
    }

    // Mining simulation for quantify page
    const quantifyButton = document.querySelector('.quantify-button');
    if (quantifyButton) {
        quantifyButton.addEventListener('click', function() {
            const progressText = this.querySelector('.progress-text');
            let count = 0;
            const maxCount = 100;
            
            // Simulate mining progress
            const interval = setInterval(() => {
                count++;
                progressText.textContent = `${count} / ${maxCount}`;
                
                if (count >= maxCount) {
                    clearInterval(interval);
                    
                    // Update profit in local storage for demo
                    const currentProfit = parseFloat(localStorage.getItem('profit_assets') || '0');
                    const newProfit = currentProfit + 0.5; // Add 0.5 USDT for each mining session
                    localStorage.setItem('profit_assets', newProfit.toString());
                    
                    // Update UI to show new profit
                    const profitElements = document.querySelectorAll('.stat-value, .item-value');
                    profitElements.forEach(el => {
                        if (el.textContent.includes('0.00')) {
                            el.textContent = newProfit.toFixed(6);
                        }
                    });
                    
                    alert('Mining completed! You earned 0.5 USDT.');
                }
            }, 50);
        });
    }

    // Navigation active state based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Investment plan selection
    const planCards = document.querySelectorAll('.plan-card');
    if (planCards.length > 0) {
        planCards.forEach(card => {
            card.addEventListener('click', function() {
                const planTitle = this.querySelector('h3').textContent;
                const planPrice = this.querySelector('.info-item:nth-child(3) span').textContent;
                
                if (confirm(`Do you want to invest in ${planTitle} for ${planPrice}?`)) {
                    alert('Investment successful! Check your profile for details.');
                    // In a real app, you would handle the investment process here
                }
            });
        });
    }

    // Display user data in profile if available
    const userPhone = document.querySelector('.user-id span');
    if (userPhone) {
        const storedPhone = localStorage.getItem('user_phone');
        if (storedPhone) {
            userPhone.textContent = storedPhone;
        }
    }

    // Recharge button in profile and home page
    const rechargeButtons = document.querySelectorAll('.btn-recharge, .action-icon.recharge');
    if (rechargeButtons.length > 0) {
        rechargeButtons.forEach(button => {
            button.addEventListener('click', function() {
                window.location.href = 'recharge.html';
            });
        });
    }

    // Quick action items on home page
    const actionItems = document.querySelectorAll('.action-item');
    if (actionItems.length > 0) {
        actionItems.forEach(item => {
            item.addEventListener('click', function() {
                const actionText = this.querySelector('span').textContent.toLowerCase();
                
                if (actionText === 'recharge') {
                    window.location.href = 'recharge.html';
                } else if (actionText === 'withdraw') {
                    window.location.href = 'withdraw.html';
                } else if (actionText === 'help') {
                    window.location.href = 'service.html';
                } else if (actionText === 'team') {
                    alert('Team feature coming soon!');
                } else if (actionText === 'invite friends') {
                    alert('Invite feature coming soon!');
                }
            });
        });
    }

    // Withdraw button functionality - you could create a withdraw.html page similar to recharge.html
    const withdrawBtn = document.querySelector('.btn-withdraw');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', function() {
            // For now, we'll just show an alert since we haven't created the withdraw page
            alert('Withdraw feature coming soon!');
        });
    }
});