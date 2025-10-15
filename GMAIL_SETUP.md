# 📧 Configuración de Gmail para Notificaciones - TotalFix

## 🔐 Generar App Password de Gmail

Para que el sistema de correos funcione, necesitas generar una **App Password** (contraseña de aplicación) de Gmail. Aquí están las instrucciones paso a paso:

### Paso 1: Activar Autenticación de Dos Factores (2FA)

1. **Ve a tu cuenta de Google**: https://myaccount.google.com/
2. **Navega a Seguridad**: En el menú lateral izquierdo, haz clic en "Seguridad"
3. **Busca "Verificación en 2 pasos"**: En la sección "Cómo inicias sesión en Google"
4. **Activar 2FA**: Si no está activado, haz clic en "Comenzar" y sigue las instrucciones
   - Necesitarás tu teléfono para recibir códigos de verificación
   - Puedes usar Google Authenticator o códigos SMS

### Paso 2: Generar App Password

1. **Con 2FA activado**, vuelve a la sección "Seguridad"
2. **Busca "Contraseñas de aplicaciones"**: Debería aparecer ahora que tienes 2FA activado
3. **Haz clic en "Contraseñas de aplicaciones"**
4. **Selecciona la aplicación**: Elige "Correo" o "Otra (nombre personalizado)"
5. **Nombre personalizado**: Escribe "TotalFix Email System"
6. **Generar**: Haz clic en "Generar"

### Paso 3: Copiar la Contraseña

⚠️ **IMPORTANTE**: Google te mostrará una contraseña de 16 caracteres como esta:
```
abcd efgh ijkl mnop
```

**Copia esta contraseña completa** (incluyendo los espacios o sin ellos, ambos funcionan).

### Paso 4: Configurar en Vercel

1. **Ve a tu proyecto en Vercel Dashboard**
2. **Settings → Environment Variables**
3. **Agregar las siguientes variables**:

```
GMAIL_USER = atencioncliente.totalfix@gmail.com
GMAIL_APP_PASSWORD = [la_contraseña_de_16_caracteres_que_copiaste]
```

### Paso 5: Verificar Configuración

Una vez configurado, el sistema enviará:
- ✅ **Correo a TotalFix**: Con todos los datos del formulario
- ✅ **Correo al usuario**: Confirmación automática

## 🔒 Seguridad

- **NUNCA** compartas tu App Password
- **NUNCA** la subas al repositorio de código
- **Solo** úsala en Vercel Dashboard como variable de entorno
- Si sospechas que está comprometida, genera una nueva

## 🆘 Solución de Problemas

### Error: "Username and Password not accepted"
- Verifica que 2FA esté activado
- Asegúrate de usar la App Password, no tu contraseña normal
- Verifica que no haya espacios extra en la contraseña

### Error: "Less secure app access"
- No uses "Acceso de aplicaciones menos seguras"
- Siempre usa App Passwords con 2FA

### Los correos no llegan
- Verifica que las variables de entorno estén configuradas en Vercel
- Revisa los logs de Vercel para errores
- Verifica que el dominio esté autorizado en Gmail

## 📞 Soporte

Si tienes problemas con la configuración:
- **Email**: atencioncliente.totalfix@gmail.com
- **WhatsApp**: +56 9 6193 2656

---

**Última actualización**: Enero 2025
