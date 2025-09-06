document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Función para mostrar mensajes
    function showMessage(message, type = 'error') {
        // Remover mensajes anteriores
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        // Insertar mensaje antes del formulario
        const form = document.getElementById('loginForm');
        form.parentNode.insertBefore(messageDiv, form);
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    
    // Función para validar email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Función para validar contraseña
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    // Credenciales de ejemplo (en una aplicación real esto sería en el servidor)
    const validCredentials = {
        'admin@example.com': 'admin123',
        'user@example.com': 'user123',
        'demo@demo.com': 'demo123'
    };
    
    // Manejar envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validaciones
        if (!email) {
            showMessage('Por favor, ingresa tu correo electrónico.', 'error');
            emailInput.focus();
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
            emailInput.focus();
            return;
        }
        
        if (!password) {
            showMessage('Por favor, ingresa tu contraseña.', 'error');
            passwordInput.focus();
            return;
        }
        
        if (!validatePassword(password)) {
            showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
            passwordInput.focus();
            return;
        }
        
        // Simular autenticación
        if (validCredentials[email] && validCredentials[email] === password) {
            showMessage('¡Inicio de sesión exitoso! Bienvenido.', 'success');
            
            // Simular redirección después de 2 segundos
            setTimeout(() => {
                alert('Redirigiendo al panel de usuario...');
                // En una aplicación real, aquí harías la redirección:
                // window.location.href = '/dashboard';
            }, 2000);
        } else {
            showMessage('Credenciales incorrectas. Inténtalo de nuevo.', 'error');
        }
    });
    
    // Agregar efecto de focus a los inputs
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Mostrar credenciales de ejemplo al cargar la página
    setTimeout(() => {
        showMessage('Credenciales de ejemplo: admin@example.com / admin123 o user@example.com / user123', 'success');
    }, 1000);
});
