/* ================================================================== */
/* TotalFix Landing Page - JavaScript Optimizado */
/* ================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ================================================================== */
    // Inicialización General
    // ================================================================== */
    initializeApp();
    
    // ================================================================== */
    // Smooth Scroll para navegación ancla
    // ================================================================== */
    initializeSmoothScroll();
    
    // ================================================================== */
    // Funcionalidad del Acordeón (FAQ)
    // ================================================================== */
    initializeFAQ();
    
    // ================================================================== */
    // Funcionalidad del Formulario
    // ================================================================== */
    initializeForm();
    
    // ================================================================== */
    // Funcionalidad de IA para generar propuestas
    // ================================================================== */
    initializeAI();
    
    // ================================================================== */
    // Actualizar año en el footer
    // ================================================================== */
    updateCurrentYear();
});

/**
 * Inicializa la aplicación
 */
function initializeApp() {
    console.log('🚀 TotalFix Landing Page inicializada');
    
    // Agregar clase de carga completada al body
    document.body.classList.add('loaded');
    
    // Inicializar animaciones de entrada
    initializeAnimations();
}

/**
 * Inicializa el smooth scroll para navegación
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Solo si el target es un elemento en la misma página
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calcular la posición teniendo en cuenta el header fijo
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Inicializa la funcionalidad del FAQ (acordeón)
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true' || false;
            
            // Cerrar todos los demás
            faqItems.forEach(otherItem => {
                const otherButton = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                
                if (otherButton !== button && otherButton.getAttribute('aria-expanded') === 'true') {
                    otherButton.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('open');
                    otherIcon.classList.remove('rotate');
                }
            });

            // Abrir o cerrar el actual
            button.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('open');
            icon.classList.toggle('rotate');
        });
    });
}

/**
 * Inicializa la funcionalidad del formulario
 */
function initializeForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Validación en tiempo real
    initializeFormValidation();
    
    // Manejo del envío del formulario
    form.addEventListener('submit', handleFormSubmit);
}

/**
 * Inicializa la validación del formulario en tiempo real
 */
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

/**
 * Valida un campo individual
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remover clases de error previas
    field.classList.remove('error');
    
    // Validaciones específicas
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor, ingresa un email válido');
            return false;
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9]{9,}$/;
        if (!phoneRegex.test(value.replace(/\D/g, ''))) {
            showFieldError(field, 'Por favor, ingresa un teléfono válido (mínimo 9 dígitos)');
            return false;
        }
    }
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    return true;
}

/**
 * Muestra error en un campo
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remover mensaje de error previo
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

/**
 * Limpia el error de un campo
 */
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Maneja el envío del formulario
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');
    
    // Validar formulario completo
    if (!validateForm(form)) {
        return false;
    }
    
    // Mostrar estado de carga
    showLoadingState(submitBtn, submitText, submitLoading);
    
    try {
        // Recopilar datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Procesar datos de checkboxes
        data.dolores = Array.from(form.querySelectorAll('input[name="dolores[]"]:checked'))
            .map(cb => cb.value);
        
        // Enviar datos al backend
        const response = await fetch('/api/enviar-consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json();
            mostrarMensaje('success', '✅ ¡Consulta enviada exitosamente! Te contactaremos pronto.');
            form.reset();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        mostrarMensaje('error', '❌ Error al enviar. Contáctanos por WhatsApp: +569 6193 2656');
    } finally {
        hideLoadingState(submitBtn, submitText, submitLoading);
    }
    
    return false;
}

/**
 * Valida todo el formulario
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Validar consentimiento
    const consentimiento = form.querySelector('#consentimiento');
    if (!consentimiento.checked) {
        showFieldError(consentimiento, 'Debes aceptar la política de privacidad');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Muestra estado de carga
 */
function showLoadingState(btn, text, loading) {
    btn.disabled = true;
    text.style.display = 'none';
    loading.style.display = 'inline';
}

/**
 * Oculta estado de carga
 */
function hideLoadingState(btn, text, loading) {
    btn.disabled = false;
    text.style.display = 'inline';
    loading.style.display = 'none';
}

/**
 * Muestra mensaje al usuario
 */
function mostrarMensaje(type, message) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = message;
    messageDiv.className = `msg-${type}`;
    messageDiv.style.display = 'block';
    
    // Scroll a la alerta
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

/**
 * Inicializa la funcionalidad de IA
 */
function initializeAI() {
    const generateButton = document.getElementById('generate-ai-idea');
    if (!generateButton) return;
    
    generateButton.addEventListener('click', generateAutomationIdea);
}

/**
 * Genera una propuesta de automatización usando IA
 */
async function generateAutomationIdea() {
    const outputDiv = document.getElementById('ai-solution-output');
    const outputText = document.getElementById('ai-solution-text');
    const description = document.getElementById('descripcion').value.trim();
    const sector = document.getElementById('sector').value;
    const doloresCheckboxes = document.querySelectorAll('input[name="dolores[]"]:checked');
    const dolores = Array.from(doloresCheckboxes).map(cb => cb.value).join(', ');
    
    // Validar que la descripción sea relevante
    if (description.length < 15 || sector === "") {
        outputDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        outputText.innerHTML = "⚠️ Por favor, selecciona un **Sector** y **describe tu desafío** (mínimo 15 caracteres) para que la IA pueda generar una propuesta relevante.";
        outputDiv.style.display = 'block';
        outputDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // Mostrar estado de carga
    outputDiv.style.backgroundColor = 'var(--color-card-bg)';
    outputDiv.style.display = 'block';
    outputText.innerHTML = '⚙️ **Generando propuesta...** (Esto puede tomar unos segundos)';
    
    // Simular generación de propuesta (en producción usar API real)
    setTimeout(() => {
        const propuesta = generateMockProposal(sector, dolores, description);
        outputText.innerHTML = propuesta;
        outputDiv.style.backgroundColor = 'var(--color-card-bg)';
        outputDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 2000);
}

/**
 * Genera una propuesta mock (reemplazar con API real)
 */
function generateMockProposal(sector, dolores, description) {
    const propuestas = {
        'Distribución eléctrica': {
            proceso: 'Automatización de Análisis Seguro de Trabajo (AST) con geolocalización',
            beneficio: 'Reducción del 70% en tiempo de aprobación y trazabilidad completa para auditorías',
            funcionalidades: 'Formularios condicionales, firmas digitales, notificaciones automáticas y reportes en tiempo real'
        },
        'Industrial': {
            proceso: 'Sistema de reporte de incidentes con evidencia fotográfica y escalamiento automático',
            beneficio: 'Respuesta inmediata a incidentes críticos y cumplimiento normativo garantizado',
            funcionalidades: 'Captura de fotos, geolocalización, flujos de aprobación multi-nivel y alertas por WhatsApp'
        },
        'Construcción': {
            proceso: 'Checklist de seguridad diario con validación de EPP y condiciones climáticas',
            beneficio: 'Cumplimiento 100% de protocolos de seguridad y reducción de accidentes',
            funcionalidades: 'Formularios adaptativos, validación de condiciones, notificaciones a supervisores'
        },
        'Servicios': {
            proceso: 'Gestión de órdenes de trabajo con aprobación automática por presupuesto',
            beneficio: 'Optimización del 60% en tiempos de respuesta y control total de costos',
            funcionalidades: 'Lógicas condicionales, aprobaciones automáticas, integración con sistemas contables'
        }
    };
    
    const propuesta = propuestas[sector] || propuestas['Servicios'];
    
    return `
        <div style="line-height: 1.6;">
            <p><strong>1) Proceso a Automatizar:</strong><br>
            ${propuesta.proceso}</p>
            
            <p><strong>2) Beneficio Clave:</strong><br>
            ${propuesta.beneficio}</p>
            
            <p><strong>3) Funcionalidades Jotform a usar:</strong><br>
            ${propuesta.funcionalidades}</p>
        </div>
    `;
}

/**
 * Inicializa animaciones de entrada
 */
function initializeAnimations() {
    // Observer para animaciones de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    document.querySelectorAll('.card, .timeline-step, .testimonial-card').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

/**
 * Actualiza el año actual en el footer
 */
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Utilidades adicionales
 */
const Utils = {
    /**
     * Debounce function para optimizar eventos
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Throttle function para optimizar scroll
     */
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Formatear número de teléfono chileno
     */
    formatPhoneNumber: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 9) {
            return `+56 9 ${cleaned.slice(0,4)} ${cleaned.slice(4)}`;
        }
        return phone;
    },
    
    /**
     * Validar email
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// ================================================================== */
// Event Listeners Globales
// ================================================================== */

// Optimizar scroll con throttle
window.addEventListener('scroll', Utils.throttle(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}, 100));

// Manejar resize de ventana
window.addEventListener('resize', Utils.debounce(function() {
    // Recalcular posiciones si es necesario
    console.log('Ventana redimensionada');
}, 250));

// ================================================================== */
// Exportar funciones para uso global
// ================================================================== */
window.TotalFix = {
    Utils,
    mostrarMensaje,
    generateAutomationIdea
};
