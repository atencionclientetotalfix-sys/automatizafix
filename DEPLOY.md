# 🚀 Guía de Despliegue en Vercel - TotalFix

## 📋 Resumen del Despliegue

Esta guía te llevará paso a paso para desplegar el sistema de notificaciones por correo de TotalFix en Vercel, incluyendo:

- ✅ **Frontend estático** (HTML, CSS, JS)
- ✅ **Backend serverless** (Python con Flask)
- ✅ **Sistema de correos automático** (Gmail SMTP)
- ✅ **Variables de entorno seguras**

## 🎯 Prerrequisitos

- [ ] Cuenta en Vercel (gratuita)
- [ ] Cuenta de Gmail con 2FA activado
- [ ] Repositorio en GitHub (opcional, pero recomendado)

## 📦 Paso 1: Preparar el Proyecto

### **1.1 Verificar Estructura del Proyecto**
Asegúrate de que tu proyecto tenga esta estructura:
```
Page_Automatizacion_JotForm/
├── 📄 index.html                    # Landing page
├── 📁 assets/                      # CSS, JS, imágenes
├── 📁 api/
│   └── enviar-consulta.py          # Función serverless
├── 📄 vercel.json                  # Configuración Vercel
├── 📄 requirements.txt             # Dependencias Python
├── 📄 env.production.example       # Template variables
└── 📄 GMAIL_SETUP.md              # Instrucciones Gmail
```

### **1.2 Verificar Archivos Críticos**
- ✅ `api/enviar-consulta.py` - Función serverless
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `requirements.txt` - Dependencias Python
- ✅ `assets/js/main.js` - JavaScript del formulario

## 🔐 Paso 2: Configurar Gmail App Password

### **2.1 Activar Autenticación de Dos Factores**
1. Ve a [Google Account](https://myaccount.google.com/)
2. Seguridad → Verificación en 2 pasos
3. Activar 2FA con tu teléfono

### **2.2 Generar App Password**
1. En Seguridad → Contraseñas de aplicaciones
2. Seleccionar "Correo" o "Otra (nombre personalizado)"
3. Nombre: "TotalFix Email System"
4. **Copiar la contraseña de 16 caracteres**

> 📖 **Instrucciones detalladas**: Lee `GMAIL_SETUP.md` para guía completa

## 🚀 Paso 3: Desplegar en Vercel

### **Opción A: Desde GitHub (Recomendado)**

#### **3.1 Conectar Repositorio**
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. **Import Project** → **Import Git Repository**
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `Page_Automatizacion_JotForm`
5. **Import**

#### **3.2 Configurar Variables de Entorno**
1. En el proyecto → **Settings** → **Environment Variables**
2. Agregar las siguientes variables:

```
GMAIL_USER = atencioncliente.totalfix@gmail.com
GMAIL_APP_PASSWORD = [tu_app_password_de_16_caracteres]
```

3. **Save** y **Redeploy**

### **Opción B: Desde Terminal**

#### **3.1 Instalar Vercel CLI**
```bash
npm install -g vercel
```

#### **3.2 Desplegar**
```bash
# En la raíz del proyecto
vercel

# Seguir las instrucciones:
# - Link to existing project? No
# - Project name: totalfix-landing
# - Directory: ./
# - Override settings? No
```

#### **3.3 Configurar Variables**
```bash
# Agregar variables de entorno
vercel env add GMAIL_USER
# Valor: atencioncliente.totalfix@gmail.com

vercel env add GMAIL_APP_PASSWORD
# Valor: [tu_app_password_de_16_caracteres]

# Aplicar cambios
vercel --prod
```

## ✅ Paso 4: Verificar el Despliegue

### **4.1 Verificar Frontend**
1. Visita tu URL de Vercel (ej: `https://totalfix-landing.vercel.app`)
2. Verifica que la página cargue correctamente
3. Prueba la navegación y formulario

### **4.2 Verificar Backend**
1. Ve a `https://tu-dominio.vercel.app/api/enviar-consulta`
2. Deberías ver un error 405 (Method Not Allowed) - esto es normal
3. El endpoint está funcionando

### **4.3 Probar Sistema de Correos**
1. Llena el formulario de contacto
2. Envía la consulta
3. Verifica que recibas:
   - ✅ Correo en `atencioncliente.totalfix@gmail.com`
   - ✅ Correo de confirmación en tu email

## 🔧 Paso 5: Configuración Avanzada

### **5.1 Dominio Personalizado (Opcional)**
1. En Vercel Dashboard → **Settings** → **Domains**
2. Agregar tu dominio personalizado
3. Configurar DNS según las instrucciones

### **5.2 Monitoreo y Logs**
1. **Functions** → Ver logs de las funciones serverless
2. **Analytics** → Métricas de tráfico
3. **Speed Insights** → Performance del sitio

### **5.3 Variables de Entorno Adicionales**
```env
# Opcionales para optimización
FLASK_ENV=production
SECRET_KEY=tu_secret_key_muy_seguro
CORS_ORIGINS=https://www.totalfix.cl,https://totalfix.cl
LOG_LEVEL=INFO
RATE_LIMIT_PER_MINUTE=10
```

## 🆘 Solución de Problemas

### **Error: "GMAIL_APP_PASSWORD no configurado"**
- ✅ Verifica que la variable esté en Vercel Dashboard
- ✅ Asegúrate de haber hecho redeploy después de agregar variables
- ✅ Verifica que no haya espacios extra en la contraseña

### **Error: "Username and Password not accepted"**
- ✅ Verifica que 2FA esté activado en Gmail
- ✅ Usa la App Password, no tu contraseña normal
- ✅ Genera una nueva App Password si es necesario

### **Los correos no llegan**
- ✅ Revisa la carpeta de Spam
- ✅ Verifica los logs de Vercel Functions
- ✅ Confirma que las variables de entorno estén configuradas

### **Error CORS en el frontend**
- ✅ Verifica que `vercel.json` tenga la configuración CORS correcta
- ✅ Asegúrate de que el endpoint sea `/api/enviar-consulta`

### **Formulario no envía**
- ✅ Abre las herramientas de desarrollador (F12)
- ✅ Revisa la consola para errores
- ✅ Verifica que la URL del endpoint sea correcta

## 📊 Monitoreo Post-Despliegue

### **Métricas Importantes**
- 📧 **Correos enviados**: Revisa logs de Functions
- 🚀 **Performance**: Speed Insights en Vercel
- 📱 **Conversiones**: Analytics de formularios
- 🔒 **Seguridad**: Monitorea intentos de spam

### **Mantenimiento**
- 🔄 **Actualizaciones**: Vercel hace deploy automático desde GitHub
- 📧 **Correos**: Monitorea que lleguen correctamente
- 🛡️ **Seguridad**: Renueva App Password cada 6 meses

## 📞 Soporte

### **Contacto TotalFix**
- 📧 **Email**: atencioncliente.totalfix@gmail.com
- 📱 **WhatsApp**: +56 9 6193 2656

### **Recursos Adicionales**
- 📖 **Vercel Docs**: https://vercel.com/docs
- 📖 **Gmail Setup**: Lee `GMAIL_SETUP.md`
- 📖 **Proyecto**: Revisa `README.md`

---

**¡Despliegue Exitoso! 🎉**

Tu sistema de notificaciones por correo está funcionando en Vercel. Los usuarios pueden enviar consultas y recibirán confirmaciones automáticas, mientras que TotalFix recibirá todas las consultas directamente.

**Última actualización**: Enero 2025
