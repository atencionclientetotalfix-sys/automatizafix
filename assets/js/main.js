/* ================================================================== */
/* TotalFix Landing Page - JavaScript Optimizado */
/* ================================================================== */

// ================================================================== */
// Funciones del Modal (GLOBALES - DEBEN ESTAR PRIMERO)
// ================================================================== */

/**
 * Abre el modal de políticas de privacidad
 */
function abrirModal() {
    console.log('🔍 Función abrirModal() llamada');
    const modal = document.getElementById('privacy-modal');
    console.log('🔍 Modal encontrado:', modal);
    
    if (modal) {
        console.log('✅ Abriendo modal...');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        // Enfocar el modal para accesibilidad
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modal-title');
        
        // Enfocar el botón de cierre
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.focus();
        }
        console.log('✅ Modal abierto exitosamente');
    } else {
        console.error('❌ Modal no encontrado con ID: privacy-modal');
    }
}

/**
 * Cierra el modal de políticas de privacidad
 */
function cerrarModal() {
    console.log('🔍 Cerrando modal...');
    const modal = document.getElementById('privacy-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
        
        // Actualizar atributos de accesibilidad
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('role');
        modal.removeAttribute('aria-modal');
        modal.removeAttribute('aria-labelledby');
        console.log('✅ Modal cerrado exitosamente');
    }
}

// Hacer funciones globales INMEDIATAMENTE
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;

console.log('🔍 Funciones del modal definidas y disponibles globalmente');

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
    // Funcionalidad del Diagrama de Flujo Animado
    // ================================================================== */
    initializeFlowDiagram();
    
    // ================================================================== */
    // Cargar testimonios dinámicamente
    // ================================================================== */
    // Pequeño delay para asegurar que el DOM esté completamente cargado
    setTimeout(loadTestimonials, 100);
    
    // ================================================================== */
    // Actualizar año en el footer
    // ================================================================== */
    updateCurrentYear();
    
    // ================================================================== */
    // Inicializar modal de políticas de privacidad
    // ================================================================== */
    initializeModal();
});


/**
 * Inicializa la aplicación
 */
function initializeApp() {
    console.log('🚀 Automatizafix Landing Page inicializada');
    
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

// Variable global para prevenir envíos duplicados
let formularioEnviando = false;

/**
 * Maneja el envío del formulario
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Prevenir envíos múltiples
    if (formularioEnviando) {
        console.log('⚠️ Formulario ya se está enviando, ignorando clic duplicado');
        return false;
    }
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');
    
    // Validar formulario completo
    if (!validateForm(form)) {
        return false;
    }
    
    // Marcar como enviando
    formularioEnviando = true;
    
    // Mostrar estado de carga
    showLoadingState(submitBtn, submitText, submitLoading);
    
    try {
        // Recopilar datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Procesar datos de checkboxes
        data.dolores = Array.from(form.querySelectorAll('input[name="dolores[]"]:checked'))
            .map(cb => cb.value);
        
        // Agregar timestamp único para identificación
        data.timestamp = new Date().toISOString();
        
        console.log('📤 Enviando formulario con timestamp:', data.timestamp);
        
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
            console.log('✅ Respuesta exitosa del servidor');
            mostrarMensaje('success', '✅ ¡Consulta enviada exitosamente! Te contactaremos pronto.');
            form.reset();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('❌ Error al enviar formulario:', error);
        mostrarMensaje('error', '❌ Error al enviar. Contáctanos por WhatsApp: +569 6193 2656');
    } finally {
        hideLoadingState(submitBtn, submitText, submitLoading);
        // Permitir nuevo envío después de 3 segundos (prevenir spam pero permitir reintento)
        setTimeout(() => {
            formularioEnviando = false;
            console.log('✓ Formulario listo para nuevo envío');
        }, 3000);
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
    
    // Generar propuesta personalizada
    setTimeout(() => {
        const propuesta = generateMockProposal(sector, dolores, description);
        outputText.innerHTML = propuesta;
        outputDiv.style.backgroundColor = 'var(--color-card-bg)';
        outputDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 2000);
}

/**
 * Genera una propuesta personalizada basada en los datos del usuario
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
 * Inicializa la funcionalidad del diagrama de flujo animado MEJORADO
 */
function initializeFlowDiagram() {
    const diagramContainer = document.querySelector('.mockup-container');
    if (!diagramContainer) return;
    
    // Observer para activar animación cuando sea visible
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activar animaciones secuenciales
                const flowSteps = entry.target.querySelectorAll('.flow-step');
                const flowLines = entry.target.querySelectorAll('.flow-line');
                
                // Animar círculos con efecto de activación más suave
                flowSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.animationPlayState = 'running';
                        step.classList.add('active');
                        
                        // Efecto de pulso sutil
                        setTimeout(() => {
                            step.style.filter = 'drop-shadow(0 6px 12px rgba(96, 165, 250, 0.3)) brightness(1.05)';
                        }, 500);
                        
                        // Remover efectos después de la animación
                        setTimeout(() => {
                            step.classList.remove('active');
                            step.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
                        }, 2500);
                    }, index * 400);
                });
                
                // Animar líneas con efecto de dibujo más fluido
                flowLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.animationPlayState = 'running';
                        
                        // Efecto de brillo durante el dibujo
                        setTimeout(() => {
                            line.style.filter = 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.3))';
                        }, 1000);
                        
                        // Remover efecto de brillo
                        setTimeout(() => {
                            line.style.filter = 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.15))';
                        }, 2000);
                    }, (index + 1) * 400);
                });
                
                // Efecto de brillo final
                setTimeout(() => {
                    diagramContainer.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(37, 99, 235, 0.3)';
                }, 2000);
                
                // Desconectar observer después de activar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(diagramContainer);
    
    // Agregar interactividad a los círculos
    const circles = diagramContainer.querySelectorAll('circle');
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4)) brightness(1.2)';
            this.style.transform = 'scale(1.1)';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
            this.style.transform = 'scale(1)';
        });
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
 * Carga testimonios dinámicamente desde el archivo JSON
 */
function loadTestimonials() {
    console.log('🎯 Ejecutando loadTestimonials...');
    
    const testimonialsContainer = document.getElementById('testimonios-container');
    console.log('🔍 Contenedor encontrado:', testimonialsContainer);
    
    if (!testimonialsContainer) {
        console.error('❌ No se encontró el contenedor de testimonios');
        return;
    }
    
    // Cargar testimonios estáticos directamente (más confiable)
    const testimonios = [
        {
            texto: "Redujimos el tiempo de aprobación de EPP de 2 días a 2 horas. La trazabilidad en SST es clave para nosotros, y con el flujo de Jotform logramos la evidencia perfecta para auditoría.",
            nombre: "Rodrigo A.",
            cargo: "Jefe de Operaciones | Sector Distribución Eléctrica"
        },
        {
            texto: "Necesitábamos estandarizar el reporte de incidentes. Ahora es automático, con fotos y ubicación GPS, y notifica a HSE de inmediato. El equipo de TotalFix entendió rápido nuestro dolor.",
            nombre: "Paula M.",
            cargo: "Líder de HSE | Sector Industrial"
        },
        {
            texto: "La automatización de nuestros procesos de monitoreo de calidad del agua y control de biomasa ha sido revolucionaria. Ahora tenemos trazabilidad completa en tiempo real y alertas automáticas que nos permiten tomar decisiones más rápidas y precisas en nuestros cultivos.",
            nombre: "Pablo Rain",
            cargo: "Gerente de Operaciones | Servicios Acuícolas PyV"
        }
    ];
    
    // Limpiar contenedor
    testimonialsContainer.innerHTML = '';
    
    // Crear testimonios
    testimonios.forEach((testimonio, index) => {
        const testimonialElement = createTestimonialElement(testimonio, index);
        testimonialsContainer.appendChild(testimonialElement);
    });
    
    console.log(`✅ ${testimonios.length} testimonios cargados`);
}

/**
 * Carga testimonios estáticos como fallback
 */
function loadStaticTestimonials() {
    const testimonialsContainer = document.getElementById('testimonios-container');
    
    if (!testimonialsContainer) return;
    
    console.log('🔄 Cargando testimonios estáticos como fallback...');
    
    const staticTestimonials = [
        {
            texto: "Redujimos el tiempo de aprobación de EPP de 2 días a 2 horas. La trazabilidad en SST es clave para nosotros, y con el flujo de Jotform logramos la evidencia perfecta para auditoría.",
            nombre: "Rodrigo A.",
            cargo: "Jefe de Operaciones | Sector Distribución Eléctrica"
        },
        {
            texto: "Necesitábamos estandarizar el reporte de incidentes. Ahora es automático, con fotos y ubicación GPS, y notifica a HSE de inmediato. El equipo de TotalFix entendió rápido nuestro dolor.",
            nombre: "Paula M.",
            cargo: "Líder de HSE | Sector Industrial"
        },
        {
            texto: "La automatización de nuestros procesos de monitoreo de calidad del agua y control de biomasa ha sido revolucionaria. Ahora tenemos trazabilidad completa en tiempo real y alertas automáticas que nos permiten tomar decisiones más rápidas y precisas en nuestros cultivos.",
            nombre: "Pablo Rain",
            cargo: "Gerente de Operaciones | Servicios Acuícolas PyV"
        }
    ];
    
    testimonialsContainer.innerHTML = '';
    
    staticTestimonials.forEach((testimonio, index) => {
        const testimonialElement = createTestimonialElement(testimonio, index);
        testimonialsContainer.appendChild(testimonialElement);
    });
    
    console.log('✅ Testimonios estáticos cargados como fallback');
}

/**
 * Crea un elemento de testimonio dinámicamente
 */
function createTestimonialElement(testimonio, index) {
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'testimonial-card';
    blockquote.setAttribute('role', 'blockquote');
    blockquote.style.animationDelay = `${(index + 1) * 0.1}s`;
    
    blockquote.innerHTML = `
        <p>"${testimonio.texto}"</p>
        <cite class="testimonial-author">
            ${testimonio.nombre}
            <span>${testimonio.cargo}</span>
        </cite>
    `;
    
    return blockquote;
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
// Event Listeners para el Modal (se ejecutan después del DOM)
// ================================================================== */

/**
 * Inicializa los event listeners para el modal
 */
function initializeModal() {
    // Cerrar modal al hacer clic fuera del contenido
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('privacy-modal');
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('privacy-modal');
            if (modal && modal.style.display === 'flex') {
                cerrarModal();
            }
        }
    });

    // Manejar navegación con teclado dentro del modal
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('privacy-modal');
        if (modal && modal.style.display === 'flex') {
            // Si se presiona Tab en el último elemento, volver al primero
            if (event.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// ================================================================== */
// Exportar funciones para uso global
// ================================================================== */
window.Automatizafix = {
    Utils,
    mostrarMensaje,
    generateAutomationIdea,
    loadTestimonials,
    abrirModal,
    cerrarModal
};

// Hacer loadTestimonials global para el botón de prueba
window.loadTestimonials = loadTestimonials;

// Las funciones ya están disponibles globalmente desde el inicio del archivo
