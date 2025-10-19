# 🚀 Instrucciones de Despliegue - Automatizafix

## 📋 Configuración del Repositorio

### 1. Crear Repositorio en GitHub
1. Ir a GitHub y crear un nuevo repositorio llamado `automatizafix`
2. Configurar como repositorio público
3. No inicializar con README, .gitignore o licencia (ya están incluidos)

### 2. Configurar Git Local
```bash
# Remover remote anterior
git remote remove origin

# Agregar nuevo remote
git remote add origin https://github.com/automatizafix/automatizafix.git

# Configurar rama principal
git branch -M main

# Hacer push inicial
git add .
git commit -m "🚀 Migración inicial a Automatizafix v2.0.0"
git push -u origin main
```

## 🔧 Configuración de Vercel

### 1. Conectar con Vercel
1. Ir a [vercel.com](https://vercel.com)
2. Iniciar sesión con GitHub
3. Hacer clic en "New Project"
4. Importar el repositorio `automatizafix`

### 2. Configurar Variables de Entorno
En el dashboard de Vercel, ir a Settings → Environment Variables y agregar:

```
GMAIL_USER = atencioncliente.totalfix@gmail.com
GMAIL_APP_PASSWORD = [tu_app_password_de_16_caracteres]
```

### 3. Configurar Dominio Personalizado (Opcional)
- Settings → Domains
- Agregar dominio personalizado si se desea

## 📧 Configuración de Gmail

### 1. Generar App Password
1. Ir a [myaccount.google.com](https://myaccount.google.com)
2. Seguridad → Verificación en 2 pasos
3. Contraseñas de aplicaciones → Generar contraseña
4. Copiar la contraseña de 16 caracteres

### 2. Configurar en Vercel
- Usar la contraseña generada como `GMAIL_APP_PASSWORD`

## 🚀 Despliegue Automático

### Configuración Automática
- **Push a main**: Despliegue automático a producción
- **Pull requests**: Preview automático
- **Builds**: Optimizados para sitios estáticos + API Python

### Verificar Despliegue
1. El sitio estará disponible en `https://automatizafix.vercel.app`
2. Probar formulario de contacto
3. Verificar recepción de correos

## 🔄 Flujo de Trabajo

### Desarrollo Local
```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Despliegue manual
npm run deploy
```

### Producción
- Push a `main` → Despliegue automático
- Variables de entorno configuradas
- SSL automático
- CDN global

## 📊 Monitoreo

### Métricas Disponibles
- Analytics de Vercel
- Logs de funciones serverless
- Métricas de rendimiento

### Alertas
- Configurar notificaciones de fallos
- Monitoreo de uptime
- Alertas de errores en formularios

## 🛠️ Mantenimiento

### Actualizaciones
1. Hacer cambios en el código
2. Commit y push a `main`
3. Despliegue automático en Vercel

### Backup
- Código en GitHub (backup automático)
- Configuraciones en Vercel
- Variables de entorno documentadas

---

**✅ Listo para producción con despliegue automático**