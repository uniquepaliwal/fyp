// JavaScript Document

console.log("Hello from script.js!");

document.addEventListener('DOMContentLoaded', () => {
    // --------------------
    // Urls variables
    // -------------------- 
    const API_URL = 'http://localhost:3000';
    const SOCKET_URL = 'http://localhost:3000';
    // --------------------
    // End of urls variables
    // --------------------
    // SECTION: Socket connection
    // --------------------
    let socket;  // define the socket variable at a broader scope
    function connectSocket(userId, password) {
        socket = io(SOCKET_URL, {
            user_id: userId,
            password: password
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server!');
            appendMessage('Connected to WebSocket server!', 'connection');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection failed:', error.message);
            appendMessage('Chat connection failed!', 'error');
        });

        socket.on('chat_message', (data) => {
            appendMessage(data.message, 'server');
        });
    }
    // --------------------
    // End of socket connection
    // --------------------
    // Create the chat button
    // --------------------
    const chatButton = document.createElement('button');
    chatButton.id = 'openChatButton';
    chatButton.textContent = 'Chat!';
    const chatButtonStyles = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#2C3E50',
        color: '#ECF0F1',
        borderRadius: '6px',
        border: 'none',
        padding: '10px 16px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    };
    Object.assign(chatButton.style, chatButtonStyles);
    chatButton.addEventListener('mouseover', () => {
        chatButton.style.backgroundColor = '#34495E';
    });
    chatButton.addEventListener('mouseout', () => {
        chatButton.style.backgroundColor = '#2C3E50';
    });
    document.body.appendChild(chatButton);
    // --------------------
    // End of chat button
    // --------------------
    // Create the main-container
    // --------------------
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chatContainer';
    const chatContainerStyles = {
        display: 'none',
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '300px',
        height: '400px',
        backgroundColor: '#F7F9FA',
        border: '1px solid #D2D6DA',
        borderRadius: '8px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
    };
    Object.assign(chatContainer.style, chatContainerStyles);
    document.body.appendChild(chatContainer);
    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.id = 'chatHeader';
    const chatHeaderStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#2C3E50',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
    };
    Object.assign(chatHeader.style, chatHeaderStyles);
    const chatHeaderTitle = document.createElement('h2');
    chatHeaderTitle.textContent = 'Support Chat';
    chatHeaderTitle.style.margin = '0';
    chatHeaderTitle.style.color = '#ECF0F1';
    const closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    Object.assign(closeButton.style, {
        background: 'transparent',
        color: '#ECF0F1',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
    });
    closeButton.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });
    chatHeader.appendChild(chatHeaderTitle);
    chatHeader.appendChild(closeButton);
    chatContainer.appendChild(chatHeader);
    // -------------------- 
    // End of chat header
    // --------------------
    // Create the auth wrapper - both login and signup
    // --------------------
    const authWrapper = document.createElement('div');
    authWrapper.id = 'authWrapper';
    Object.assign(authWrapper.style, {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
    });
    chatContainer.appendChild(authWrapper);

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    Object.assign(loginButton.style, {
        padding: '8px 16px',
        margin: '5px',
        cursor: 'pointer',
        width: '50%',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: '#2C3E50'
    });

    const signupButton = document.createElement('button');
    signupButton.textContent = 'Signup';
    Object.assign(signupButton.style, {
        padding: '8px 16px',
        margin: '5px',
        cursor: 'pointer',
        width: '50%',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: '#2C3E50'
    });

    authWrapper.appendChild(loginButton);
    authWrapper.appendChild(signupButton);
    // --------------------
    // End of auth wrapper
    // --------------------
    // Login form
    // --------------------
    const loginForm = document.createElement('form');
    Object.assign(loginForm.style, {
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '10px'
    });
    const loginEmail = document.createElement('input');
    loginEmail.type = 'email';
    loginEmail.placeholder = 'Email';
    loginEmail.required = true;
    Object.assign(loginEmail.style, {
        margin: '5px',
        padding: '5px',
        width: '80%'
    });
    const loginPassword = document.createElement('input');
    loginPassword.type = 'password';
    loginPassword.placeholder = 'Password';
    loginPassword.required = true;
    loginPassword.minLength = 8;
    loginPassword.title = 'Password must be at least 6 characters long';
    Object.assign(loginPassword.style, {
        margin: '5px',
        padding: '5px',
        width: '80%'
    });
    const loginSubmit = document.createElement('button');
    loginSubmit.textContent = 'Submit';
    loginSubmit.type = 'submit';
    Object.assign(loginSubmit.style, {
        margin: '5px',
        padding: '8px 16px',
        cursor: 'pointer',
        width: '50%',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: '#2C3E50'
    });
    const backButtonLogin = document.createElement('button');
    backButtonLogin.textContent = 'Back';
    backButtonLogin.id = 'backButtonLogin';
    backButtonLogin.type = 'button';
    Object.assign(backButtonLogin.style, {
        margin: '5px',
        padding: '8px 16px',
        cursor: 'pointer',
        width: '50%',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: '#2C3E50'
    });
    backButtonLogin.addEventListener('click', () => {
        loginForm.style.display = 'none';
        loginButton.style.display = 'inline-block';
        signupButton.style.display = 'inline-block';
    });
    loginForm.appendChild(loginEmail);
    loginForm.appendChild(loginPassword);
    loginForm.appendChild(loginSubmit);
    loginForm.appendChild(backButtonLogin);
    authWrapper.appendChild(loginForm);
    // --------------------
    // End of login form  
    // --------------------
    // Signup form
    // --------------------
    const signupForm = document.createElement('form');
    Object.assign(signupForm.style, {
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '10px'
    });

    const firstNameInput = document.createElement('input');
    firstNameInput.type = 'text';
    firstNameInput.placeholder = 'First Name';
    firstNameInput.required = true;
    Object.assign(firstNameInput.style, {
        margin: '5px',
        padding: '5px',
        width: '80%'
    });

    const lastNameInput = document.createElement('input');
    lastNameInput.type = 'text';
    lastNameInput.placeholder = 'Last Name';
    lastNameInput.required = true;
    Object.assign(lastNameInput.style, {
        margin: '5px',
        padding: '5px',
        width: '80%'
    });

    const signupEmail = document.createElement('input');
    signupEmail.type = 'email';
    signupEmail.placeholder = 'Email';
    signupEmail.required = true;
    Object.assign(signupEmail.style, {
        margin: '5px',
        padding: '5px',
        width: '80%'
    });

    const signupPassword = document.createElement('input');
    signupPassword.type = 'password';
    signupPassword.placeholder = 'Password';
    signupPassword.required = true;
    signupPassword.minLength = 8;
    signupPassword.title = 'Password must be at least 6 characters long';
    Object.assign(signupPassword.style, {
        margin: '5px',
        padding: '5px',
        width: '80%'
    });

    const signupSubmit = document.createElement('button');
    signupSubmit.textContent = 'Submit';
    signupSubmit.type = 'submit';
    Object.assign(signupSubmit.style, {
        margin: '5px',
        padding: '8px 16px',
        cursor: 'pointer',
        width: '50%',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: '#2C3E50'
    });

    const backButtonSignup = document.createElement('button');
    backButtonSignup.textContent = 'Back';
    backButtonSignup.id = 'backButtonSignup';
    backButtonSignup.type = 'button';
    Object.assign(backButtonSignup.style, {
        margin: '5px',
        padding: '8px 16px',
        cursor: 'pointer',
        width: '50%',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: '#2C3E50'
    });

    backButtonSignup.addEventListener('click', () => {
        signupForm.style.display = 'none';
        signupButton.style.display = 'inline-block';
        loginButton.style.display = 'inline-block';
    });

    signupForm.appendChild(firstNameInput);
    signupForm.appendChild(lastNameInput);
    signupForm.appendChild(signupEmail);
    signupForm.appendChild(signupPassword);
    signupForm.appendChild(signupSubmit);
    signupForm.appendChild(backButtonSignup);
    authWrapper.appendChild(signupForm);
    // --------------------
    // End of signup form
    // --------------------
    // Handle login/signup button clicks
    // --------------------
    loginButton.addEventListener('click', () => {
        // Hide the login/signup buttons, show just the login form
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        loginForm.style.display = 'flex';
    });

    signupButton.addEventListener('click', () => {
        // Hide the login/signup buttons, show just the signup form
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        signupForm.style.display = 'flex';
    });
    // -------------------- 
    // End of login/signup button clicks
    // --------------------
    // Utils Functions
    // --------------------
    function appendMessage(msg, sender) {
        const newMessage = document.createElement('div');

        const baseMessageStyles = {
            marginBottom: '8px',
            padding: '8px 12px',
            borderRadius: '4px',
            width: 'fit-content',
            maxWidth: '80%',
        };

        const userMessageStyles = {
            backgroundColor: '#EFF9EE',
            marginLeft: 'auto',
            marginRight: '0',
            textAlign: 'left',
            border: '1px solid #C6E1C6',
        };

        const serverMessageStyles = {
            backgroundColor: '#F0F4F7',
            marginRight: 'auto',
            marginLeft: '0',
            textAlign: 'left',
            border: '1px solid #D3D9DD',
        };

        const errorMessageStyles = {
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '10px',
            fontSize: '12px',
            color: 'red',
        };

        const connectionMessageStyles = {
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '10px',
            fontSize: '12px',
            color: 'green',
        };

        // Assign base styles, then sender-specific
        Object.assign(newMessage.style, baseMessageStyles, sender === 'user' ? userMessageStyles : sender === 'server' ? serverMessageStyles : sender === 'error' ? errorMessageStyles : connectionMessageStyles);

        newMessage.textContent = msg;
        chatMessages.appendChild(newMessage);
        // Auto-scroll
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    function showChatUI(userId, password) {
        authWrapper.style.display = 'none';
        chatMessages.style.display = 'block';
        inputWrapper.style.display = 'flex';
        // Connect socket only now that user is authenticated
        connectSocket(userId, password);
    }
    // --------------------
    // End of utils functions
    // -------------------- 
    // Listen for form submission instead of button click
    // --------------------
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // prevent normal form reload
        const emailVal = loginEmail.value.trim();
        const passwordVal = loginPassword.value.trim();
        console.log('Login attempt:', emailVal, passwordVal);
        const formData = new FormData();
        formData.append('email', emailVal);
        formData.append('password', passwordVal);

        try {
            const res = await fetch(API_URL + '/api/users/login-enduser', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                console.log('Login successful');
                showNotification('Login successful!', 'success');
                showChatUI(emailVal, passwordVal);
                const responseBody = await res.json();
                console.log(responseBody);
                identity = responseBody.identity ? responseBody.identity : null;
                document.cookie = "identity=" + identity; // 7 days
            } else {
                if (res.status === 401) {
                    showNotification('Invalid email or password', 'error');
                } else if (res.status === 500) {
                    showNotification('Something went wrong. Please try again later.', 'error');
                } else {
                    showNotification('Error contacting server. Please try again.', 'error');
                }
            }
        } catch (err) {
            console.error('Error during login:', err);
            showNotification('Error contacting server. Please try again.', 'error');
        }
    });

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // prevent normal page reload
        const firstVal = firstNameInput.value.trim();
        const lastVal = lastNameInput.value.trim();
        const emailVal = signupEmail.value.trim();
        const passwordVal = signupPassword.value.trim();
        const formData = new FormData();
        formData.append('firstName', firstVal);
        formData.append('lastName', lastVal);
        formData.append('email', emailVal);
        formData.append('password', passwordVal);
        try {
            const res = await fetch(API_URL + '/api/users/signup-enduser', {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                console.log('Signup successful');
                showNotification('Signup successful!', 'success');
                showChatUI(emailVal, passwordVal);
            } else {
                if (res.status === 401) {
                    const responseBody = await res.json();
                    showNotification(responseBody, 'error');
                } else {
                    showNotification('Server Error!. Please try again.', 'error');
                }
            }
        } catch (err) {
            console.error('Error in frontend!', err);
            showNotification('Error!. Please try again.', 'error');
        }
    });

    // --------------------
    // End of form submission
    // --------------------
    // Chat UI
    // --------------------
    const chatMessages = document.createElement('div');
    chatMessages.id = 'chatMessages';
    Object.assign(chatMessages.style, {
        display: 'none',
        padding: '10px',
        flex: '1',
        overflowY: 'auto',
    });

    const inputWrapper = document.createElement('div');
    inputWrapper.id = 'inputWrapper';
    const inputWrapperStyles = {
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px',
        backgroundColor: '#2C3E50',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
    };
    Object.assign(inputWrapper.style, inputWrapperStyles);

    const chatInput = document.createElement('input');
    chatInput.id = 'chatInput';
    chatInput.type = 'text';
    chatInput.placeholder = 'Type your message...';
    Object.assign(chatInput.style, {
        width: '200px',
        padding: '6px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        flex: '1',
        marginRight: '6px',
    });
    inputWrapper.appendChild(chatInput);

    const sendMessageButton = document.createElement('button');
    sendMessageButton.id = 'sendMessageButton';
    sendMessageButton.textContent = 'Send';
    const sendMessageButtonStyles = {
        marginLeft: '6px',
        backgroundColor: '#2C3E50',
        color: '#ECF0F1',
        borderRadius: '4px',
        border: '1px solid white',
        padding: '8px 12px',
        cursor: 'pointer',
        flexShrink: '0',
    };
    Object.assign(sendMessageButton.style, sendMessageButtonStyles);

    sendMessageButton.addEventListener('mouseover', () => {
        sendMessageButton.style.backgroundColor = '#34495E';
    });
    sendMessageButton.addEventListener('mouseout', () => {
        sendMessageButton.style.backgroundColor = '#2C3E50';
    });

    inputWrapper.appendChild(sendMessageButton);

    chatContainer.appendChild(chatMessages);
    chatContainer.appendChild(inputWrapper);

    // --------------------
    // End of chat UI 
    // --------------------
    // Toggle chat on main button click
    // --------------------
    chatButton.addEventListener('click', () => {
        if (chatContainer.style.display === 'none') {
            chatContainer.style.display = 'flex';
        } else {
            chatContainer.style.display = 'none';
        }
    });

    // --------------------
    // End of toggle chat 
    // --------------------
    // Handle sending messages
    // --------------------
    sendMessageButton.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, 'user');
            socket.emit('chat_message', { message: userMessage });
            chatInput.value = '';
        }
    });
    // --------------------
    // End of handle sending messages
    // --------------------
    // Notification System
    // --------------------
    const notificationContainer = document.createElement('div');
    Object.assign(notificationContainer.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '1000',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    });
    document.body.appendChild(notificationContainer);

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');

        // Base styles for all notifications
        const baseStyles = {
            padding: '4px 8px',
            marginBottom: '6px',
            borderRadius: '6px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            animation: 'slideIn 0.5s ease-out',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '200px',
            maxWidth: '300px',
            fontSize: '13px',
        };

        // Type-specific styles
        const typeStyles = {
            success: {
                backgroundColor: '#4CAF50',
                color: 'white',
                border: '1px solid #306D75'
            },
            error: {
                backgroundColor: '#f44336',
                color: 'white',
                border: '1px solid #DA5C53'
            },
            info: {
                backgroundColor: '#2196F3',
                color: 'white',
                border: '1px solid #4AA3BA'
            }
        };

        // Apply styles
        Object.assign(notification.style, baseStyles, typeStyles[type]);

        // Add the message
        const messageText = document.createElement('span');
        messageText.textContent = message;
        notification.appendChild(messageText);

        // Add close button
        const closeBtn = document.createElement('button');
        Object.assign(closeBtn.style, {
            marginLeft: '10px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '18px',
        });
        closeBtn.textContent = '×';
        closeBtn.onclick = () => notification.remove();
        notification.appendChild(closeBtn);

        // Add to container
        notificationContainer.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
    document.head.appendChild(style);
}); 