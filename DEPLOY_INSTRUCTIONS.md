# 🚀 Instrucciones de Despliegue - TotalFix

## 📋 Variables de Entorno Requeridas en Vercel

### **Variables Obligatorias:**
```env
GMAIL_USER=atencioncliente.totalfix@gmail.com
GMAIL_APP_PASSWORD=tu_app_password_de_16_caracteres
```

### **Variables Opcionales:**
```env
FLASK_ENV=production
SECRET_KEY=tu_secret_key_muy_seguro
CORS_ORIGINS=https://www.totalfix.cl,https://totalfix.cl
```

## 🔧 Pasos para Configurar en Vercel:

1. **Ve a tu proyecto en Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Agregar las variables listadas arriba**
4. **Seleccionar todos los entornos:** Production, Preview, Development

## 📧 Configuración de Gmail:

1. **Activar 2FA en Gmail**
2. **Ir a:** Configuración → Seguridad → Verificación en 2 pasos
3. **Contraseñas de aplicaciones → Generar contraseña**
4. **Seleccionar:** "Aplicación" → "Otro" → "TotalFix"
5. **Copiar la contraseña de 16 caracteres**

## ✅ Verificación Post-Deploy:

1. **Probar el formulario** en la URL de Vercel
2. **Verificar que lleguen los correos** a:
   - `atencioncliente.totalfix@gmail.com` (notificación)
   - Email del usuario (confirmación)
3. **Revisar logs** en Vercel Dashboard si hay errores

## 🎯 Estructura del Proyecto:

```
├── index.html                 # Landing page
├── vercel.json               # Configuración Vercel
├── package.json              # Configuración Node.js
├── api/
│   └── enviar-consulta.py     # API serverless
└── assets/
    ├── css/styles.css        # Estilos
    ├── js/main.js            # JavaScript
    └── images/               # Videos y logos
```

## 🚨 Notas Importantes:

- **No se requiere base de datos** (solo correos)
- **Sistema completamente serverless**
- **API funciona con variables de entorno**
- **Formulario envía correos automáticamente**
