# 🚀 Automatizafix - Landing Page

**Automatización de Flujos de Trabajo y Optimización de Productividad Empresarial**

Landing page profesional para Automatizafix, especializada en automatización de procesos empresariales, optimización de productividad y eliminación de tareas repetitivas utilizando tecnología avanzada con Jotform.

## 📋 Características Principales

### ✨ **Frontend Optimizado**
- **Diseño Responsive** - Perfecto en móviles, tablets y desktop
- **Animaciones Suaves** - Transiciones y efectos visuales profesionales
- **Diagrama de Flujo Animado** - Visualización interactiva de procesos de automatización
- **Videos Demostrativos** - Sistema configurable para mostrar casos de uso
- **SEO Optimizado** - Meta tags, Schema.org, Open Graph
- **Accesibilidad** - Cumple estándares WCAG 2.1
- **Performance** - Carga rápida y optimizada

### 🔧 **Backend Inteligente**
- **Sistema de Correos Automático** - Envío a TotalFix + copia al usuario
- **Validación Robusta** - Formularios con validación en tiempo real
- **API REST** - Endpoints para integración
- **Logging Completo** - Monitoreo de errores y actividad
- **Despliegue en Vercel** - Serverless functions para máxima escalabilidad

### 🤖 **Funcionalidades Avanzadas**
- **Generador de Propuestas IA** - Soluciones de automatización automáticas basadas en el contexto
- **Integración WhatsApp** - Contacto directo con mensajes personalizados
- **Formulario Inteligente** - Validación y UX optimizada para análisis de productividad
- **Sistema de Seguimiento** - Base de datos para gestión de consultas de automatización
- **Videos Demostrativos** - Sistema configurable para mostrar casos de uso reales
- **Testimonios Dinámicos** - Sistema JSON para gestión fácil de testimonios de clientes

## 🆕 Mejoras Visuales Implementadas

### ✨ **Nuevas Funcionalidades**
- **Botón WhatsApp en Header** - Contacto directo desde cualquier sección
- **Diagrama de Flujo Animado** - Visualización interactiva con líneas que se dibujan
- **Videos Demostrativos** - Sistema configurable para mostrar casos de uso
- **Footer Mejorado** - Mejor organización y tipografía
- **Planes Optimizados** - Eliminación de opciones innecesarias

### 🎨 **Mejoras de UX/UI**
- **Animaciones Secuenciales** - Elementos aparecen en orden lógico
- **Responsive Mejorado** - Mejor adaptación a dispositivos móviles
- **Iconografía Consistente** - Íconos SVG optimizados
- **Tipografía Mejorada** - Jerarquía visual clara
- **Colores Optimizados** - Mejor contraste y accesibilidad

### 📹 **Sistema de Videos**
- **Videos Configurables** - Fácil reemplazo desde carpeta `assets/images/`
- **Múltiples Formatos** - Soporte MP4 y WebM para compatibilidad
- **Lazy Loading** - Carga optimizada de videos

### 💬 **Sistema de Testimonios Dinámicos**
- **Gestión JSON** - Testimonios en `assets/data/testimonios.json`
- **Carga Automática** - JavaScript carga testimonios dinámicamente
- **Fallback Inteligente** - Mantiene testimonios estáticos si falla la carga
- **Fácil Actualización** - Solo editar JSON, sin tocar código HTML
- **Documentación Completa** - Guía en `assets/data/README_TESTIMONIOS.md`
- **Videos Cargados** - `demo-sst.mp4` (49.3 MB) y `demo-flujo.mp4` (5.6 MB)
- **Logo Sin Fondo** - Logo optimizado desde GitHub para mejor integración visual
- **Posters Personalizables** - Imágenes de vista previa configurables

## 🏗️ Estructura del Proyecto

```
Page_Automatizacion_JotForm/
├── 📄 index.html                 # Landing page principal
├── 📁 assets/
│   ├── 📁 css/
│   │   └── styles.css           # Estilos optimizados
│   ├── 📁 js/
│   │   └── main.js              # JavaScript funcional
│   ├── 📁 images/               # Imágenes, logos y videos
│   │   ├── README_VIDEOS.md     # Instrucciones para videos
│   │   ├── INSTRUCCIONES_VIDEOS.md # Guía técnica de videos
│   │   ├── demo-sst.mp4         # Video demostrativo SST
│   │   ├── demo-flujo.mp4       # Video demostrativo operaciones
│   │   └── logo-totalfix.png    # Logo de la empresa
│   ├── 📁 data/
│   │   ├── testimonios.json     # Testimonios dinámicos
│   │   └── README_TESTIMONIOS.md # Guía de testimonios
│   └── 📁 icons/                # Iconos SVG
├── 📁 api/
│   └── 📄 enviar-consulta.py     # API serverless para correos
├── 📄 vercel.json              # Configuración Vercel
├── 📄 package.json             # Configuración Node.js
├── 📄 .gitignore               # Archivos a ignorar
└── 📄 README.md                # Este archivo
```

## 🚀 Instalación y Configuración

### **Opción 1: Despliegue en Vercel (Recomendado)**

#### **1. Preparar el Proyecto**
```bash
# Clonar el repositorio
git clone https://github.com/totalfix/landing-page.git
cd landing-page

# El proyecto ya está configurado para Vercel
# Solo necesitas configurar las variables de entorno
```

#### **2. Configurar Variables de Entorno en Vercel**
1. **Generar App Password de Gmail**:
   - Lee el archivo `GMAIL_SETUP.md` para instrucciones detalladas
   - Activa 2FA en tu cuenta Gmail
   - Genera una App Password de 16 caracteres

2. **Configurar en Vercel Dashboard**:
   - Ve a tu proyecto en Vercel
   - Settings → Environment Variables
   - Agrega:
     ```
     GMAIL_USER = atencioncliente.totalfix@gmail.com
     GMAIL_APP_PASSWORD = [tu_app_password_de_16_caracteres]
     ```

#### **3. Desplegar en Vercel**
```bash
# Conectar con Vercel
npx vercel

# O conectar desde GitHub para deploy automático
# En Vercel Dashboard → Import Project → GitHub
```

#### **4. Verificar Funcionamiento**
- El formulario enviará correos automáticamente
- No se requiere base de datos (solo correos)
- Sistema completamente serverless

### **Opción 2: Desarrollo Local**

#### **1. Configurar Frontend (Estático)**
```bash
# Opción 1: Servidor Python simple
python -m http.server 8000

# Opción 2: Live Server (Node.js)
npm install -g live-server
live-server --port=8000

# Opción 3: Servidor HTTP personalizado
# Simplemente abre index.html en tu navegador
```

#### **2. Configurar Backend (Python)**
```bash
# Instalar dependencias
cd backend
pip install -r requirements.txt

# Configurar variables de entorno
cp env.example .env
# Editar .env con tus credenciales reales

# Ejecutar servidor
python scripts/email_handler.py
```

#### **3. Configurar Gmail para Correos**
1. **Activar 2FA** en tu cuenta de Gmail
2. **Generar App Password**:
   - Ve a Google Account → Security → 2-Step Verification
   - App passwords → Generate password
   - Copia la contraseña generada
3. **Configurar en .env**:
   ```env
   GMAIL_APP_PASSWORD=tu_app_password_aqui
   ```

## 📧 Sistema de Notificaciones por Correo

### **Flujo de Correos Configurado**

#### **Correo a Total Fix:**
- **Destinatario:** atencioncliente.totalfix@gmail.com
- **Asunto:** 🔧 Nueva Consulta: [Nombre] - [Empresa]
- **Contenido:** 
  - Información completa del cliente
  - Desafíos de productividad seleccionados
  - Descripción del problema
  - Timestamp de la consulta

#### **Correo al Usuario:**
- **Destinatario:** Email ingresado en el formulario
- **Asunto:** ✅ Confirmación de Consulta - TotalFix
- **Contenido:**
  - Confirmación de recepción
  - Próximos pasos esperados
  - Información de contacto directo
  - Tiempo estimado de respuesta (4 horas hábiles)

### **Configuración de Variables**

#### **Variables de Entorno Requeridas (Vercel)**
```env
# Gmail Configuration (REQUERIDO)
GMAIL_USER=atencioncliente.totalfix@gmail.com
GMAIL_APP_PASSWORD=tu_app_password_de_16_caracteres

# Flask Configuration (OPCIONAL)
FLASK_ENV=production
SECRET_KEY=tu_secret_key_muy_seguro

# CORS Configuration (OPCIONAL)
CORS_ORIGINS=https://www.totalfix.cl,https://totalfix.cl
```

#### **Variables de Entorno para Desarrollo Local**
```env
# Gmail Configuration
GMAIL_USER=atencioncliente.totalfix@gmail.com
GMAIL_APP_PASSWORD=tu_app_password_de_gmail

# Flask Configuration
FLASK_ENV=development
SECRET_KEY=tu_secret_key_muy_seguro

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,https://www.totalfix.cl
```

### **Configuración de Contacto**
- **Email**: `atencioncliente.totalfix@gmail.com`
- **WhatsApp**: `+569 6193 2656`
- **Empresa**: `TotalFix`

## 📱 Funcionalidades del Formulario

### **Campos del Formulario**
- ✅ **Nombre Completo** (requerido)
- ✅ **Empresa** (requerido)
- ✅ **Cargo/Rol** (opcional)
- ✅ **Email Corporativo** (requerido, validado)
- ✅ **Teléfono/WhatsApp** (requerido, validado)
- ✅ **Sector** (requerido, select)
- ✅ **Desafíos de Productividad** (múltiple selección)
- ✅ **Descripción del Desafío** (textarea)
- ✅ **Consentimiento** (requerido)

### **Validaciones Implementadas**
- 🔍 **Email válido** - Formato correcto
- 🔍 **Teléfono válido** - Mínimo 9 dígitos
- 🔍 **Campos requeridos** - No pueden estar vacíos
- 🔍 **Consentimiento** - Debe estar marcado

### **Flujo de Correos**
1. **Usuario envía formulario** → Validación en tiempo real
2. **Backend procesa datos** → Validación adicional
3. **Correo a TotalFix** → Notificación completa con datos de automatización
4. **Correo al usuario** → Confirmación y próximos pasos para análisis
5. **Registro en BD** → Para seguimiento de consultas de productividad (opcional)

## 🎨 Personalización

### **Cambiar Colores (CSS)**
```css
:root {
    --color-primary: #2563eb;    /* Azul TotalFix */
    --color-secondary: #1e40af;  /* Azul oscuro */
    --color-accent: #10b981;     /* Verde éxito */
}
```

### **Modificar Contenido**
- **Textos**: Editar directamente en `index.html`
- **Imágenes**: Reemplazar en `assets/images/`
- **Logo**: Actualizar SVG en header y footer
- **Contacto**: Cambiar en JavaScript y Python

### **Agregar Nuevas Secciones**
1. Crear HTML en `index.html`
2. Agregar estilos en `assets/css/styles.css`
3. Actualizar navegación si es necesario

## 🔒 Seguridad

### **Medidas Implementadas**
- ✅ **Validación Frontend** - JavaScript + HTML5
- ✅ **Validación Backend** - Python con validaciones robustas
- ✅ **Sanitización de datos** - Limpieza de inputs
- ✅ **Rate Limiting** - Prevención de spam (configurable)
- ✅ **CORS configurado** - Solo dominios autorizados
- ✅ **Variables de entorno** - Credenciales seguras

### **Recomendaciones Adicionales**
- 🔐 **HTTPS obligatorio** en producción
- 🔐 **Firewall configurado** para el servidor
- 🔐 **Backup regular** de la base de datos
- 🔐 **Monitoreo de logs** para detectar anomalías

## 📊 Monitoreo y Analytics

### **Google Analytics (Opcional)**
```html
<!-- Descomentar en index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### **Logs del Sistema**
- 📝 **Consultas recibidas** - Registro automático
- 📝 **Errores de envío** - Logging detallado
- 📝 **Estadísticas de uso** - Métricas de conversión

## 🚀 Despliegue en Producción

### **Opción 1: Hosting Estático**
- **Netlify** - Deploy automático desde Git
- **Vercel** - Optimizado para sitios estáticos
- **GitHub Pages** - Gratuito para repos públicos

### **Opción 2: Servidor VPS**
```bash
# Instalar dependencias
sudo apt update
sudo apt install python3-pip nginx

# Configurar backend
cd backend
pip3 install -r requirements.txt

# Configurar Nginx
sudo nano /etc/nginx/sites-available/totalfix
```

### **Opción 3: Docker (Recomendado)**
```dockerfile
# Dockerfile para backend
FROM python:3.9-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
EXPOSE 5000
CMD ["python", "scripts/email_handler.py"]
```

## 🧪 Testing

### **Pruebas Manuales**
1. ✅ **Formulario completo** - Todos los campos
2. ✅ **Validaciones** - Campos requeridos y formato
3. ✅ **Envío de correos** - Verificar recepción
4. ✅ **Responsive** - Móvil, tablet, desktop
5. ✅ **WhatsApp** - Enlaces funcionando

### **Pruebas Automatizadas (Futuro)**
```bash
# Instalar dependencias de testing
pip install pytest pytest-flask

# Ejecutar tests
pytest backend/tests/
```

## 📈 Optimizaciones de Performance

### **Frontend**
- ✅ **CSS minificado** - Estilos optimizados
- ✅ **JavaScript modular** - Código organizado
- ✅ **Imágenes optimizadas** - Formatos web modernos
- ✅ **Lazy loading** - Carga bajo demanda
- ✅ **Caching** - Headers HTTP apropiados

### **Backend**
- ✅ **Validación eficiente** - Procesamiento rápido
- ✅ **Logging optimizado** - Sin overhead
- ✅ **Conexiones reutilizables** - SMTP eficiente

## 🆘 Solución de Problemas

### **Error: "GMAIL_APP_PASSWORD no configurado"**
```bash
# Verificar variables de entorno
echo $GMAIL_APP_PASSWORD

# Configurar en .env
export GMAIL_APP_PASSWORD="tu_password_aqui"
```

### **Error: "CORS policy"**
```python
# Verificar configuración CORS en email_handler.py
CORS(app, origins=["https://www.totalfix.cl"])
```

### **Formulario no envía**
1. Verificar que el backend esté ejecutándose
2. Revisar la consola del navegador
3. Verificar la URL del endpoint en JavaScript

### **Correos no llegan**
1. Verificar credenciales de Gmail
2. Revisar logs del servidor
3. Verificar configuración SMTP

## 📞 Soporte

### **Contacto TotalFix**
- 📧 **Email**: atencioncliente.totalfix@gmail.com
- 📱 **WhatsApp**: +569 6193 2656
- 🌐 **Web**: www.totalfix.cl

### **Documentación Adicional**
- 📚 **Jotform Docs**: https://www.jotform.com/help/
- 📚 **Flask Docs**: https://flask.palletsprojects.com/
- 📚 **CSS Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/

## 🆕 **Mejoras Recientes Implementadas**

### **🎨 Diseño y UX Profesional**
- ✅ **Contrastes mejorados** - Texto más legible en navegación y header
- ✅ **Icono WhatsApp optimizado** - Diseño profesional con gradientes y animaciones
- ✅ **Header más limpio** - Fondo blanco con mejor contraste
- ✅ **Animaciones suaves** - Transiciones profesionales en todos los elementos

### **📝 Contenido Actualizado**
- ✅ **Enfoque en automatización** - Contenido centrado en flujos de trabajo y productividad
- ✅ **Beneficios estratégicos** - Tarjetas enfocadas en ahorro de tiempo y eficiencia
- ✅ **Metodología clara** - 4 pasos para automatizar procesos empresariales
- ✅ **Planes actualizados** - Opciones enfocadas en transformación digital

### **🔧 Funcionalidades Mejoradas**
- ✅ **Formulario optimizado** - Campos enfocados en desafíos de productividad
- ✅ **IA mejorada** - Generador de propuestas de automatización
- ✅ **Navegación clara** - Menú con mejor contraste y legibilidad
- ✅ **Responsive mejorado** - Mejor experiencia en todos los dispositivos

### **📹 Actualización de Videos y Logo (Última Actualización)**
- ✅ **Videos cargados** - `demo-sst.mp4` (49.3 MB) y `demo-flujo.mp4` (5.6 MB) funcionando correctamente
- ✅ **Logo sin fondo** - Logo optimizado desde GitHub para mejor integración visual
- ✅ **Rutas actualizadas** - Referencias HTML corregidas para coincidir con archivos cargados
- ✅ **Estilos optimizados** - Logo con efectos hover y mejor contraste
- ✅ **Script de verificación** - `backend/scripts/test_videos.py` para validar funcionamiento

### **🎨 Diagrama de Flujo Mejorado (Nueva Actualización)**
- ✅ **Círculos en lugar de rectángulos** - Diseño más moderno y profesional
- ✅ **Gradientes radiales** - Efectos 3D y profundidad visual
- ✅ **Distribución centrada** - Flujo perfectamente balanceado en el panel
- ✅ **Flechas optimizadas** - Rutas claras que no se superponen
- ✅ **Efectos de brillo** - Interactividad visual con hover y animaciones
- ✅ **Responsive mejorado** - Se adapta perfectamente a móviles y tablets
- ✅ **Animaciones fluidas** - Secuencia lógica y atractiva con efectos de brillo

### **✨ Refinamientos Visuales Avanzados (Última Mejora)**
- ✅ **Flechas con curvas suaves** - Transiciones más elegantes y naturales
- ✅ **Gradientes refinados** - Colores más sutiles y profesionales con 3 stops
- ✅ **Efectos de brillo sutiles** - Bordes más elegantes y menos intensos
- ✅ **Animaciones cubic-bezier** - Transiciones más fluidas y profesionales
- ✅ **Efectos de pulso mejorados** - Interactividad más sofisticada
- ✅ **Conexiones naturales** - Flujo del PDF Auto con curvas más orgánicas

## 🔧 **Correcciones de Despliegue (Enero 2025)**

### ✅ **Problema 404 Resuelto**
- **vercel.json corregido** - Cambiado de `rewrites` a `routes` para mejor compatibilidad
- **requirements.txt agregado** - Dependencias Python especificadas correctamente
- **Enrutamiento optimizado** - Configuración de rutas para API y frontend
- **Headers CORS mejorados** - Configuración de seguridad actualizada

### ✅ **Problemas de Logo y Formulario Solucionados**
- **Logo corregido** - Cambiado de URL de GitHub a ruta local `assets/images/logo-totalfix.png`
- **API Python optimizada** - Función serverless compatible con Vercel
- **Formulario funcionando** - Endpoint `/api/enviar-consulta` operativo
- **Variables de entorno** - Configuración Gmail requerida para envío de correos

### 🚀 **Configuración Vercel Optimizada**
```json
{
  "version": 2,
  "name": "automatizafix",
  "builds": [
    {
      "src": "api/enviar-consulta.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/enviar-consulta",
      "dest": "/api/enviar-consulta.py"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 📦 **Dependencias Python**
```txt
flask==2.3.3
requests==2.31.0
```

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

**Desarrollado con ❤️ para TotalFix**

*Automatización de Flujos de Trabajo y Optimización de Productividad Empresarial en Chile*

---
*Última actualización: Enero 2025 - Error 404 corregido*

