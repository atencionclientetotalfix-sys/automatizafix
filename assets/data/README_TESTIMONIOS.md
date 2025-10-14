# 📝 Sistema de Testimonios Dinámicos

## 🎯 **Descripción**
Sistema que permite gestionar testimonios de clientes de manera dinámica desde un archivo JSON, facilitando las actualizaciones sin modificar código HTML.

## 📁 **Archivos Involucrados**
- `assets/data/testimonios.json` - Archivo de datos con testimonios
- `assets/js/main.js` - JavaScript que carga testimonios dinámicamente
- `index.html` - Contenedor para testimonios dinámicos

## 🔧 **Cómo Actualizar Testimonios**

### **1. Editar el archivo JSON**
Abre `assets/data/testimonios.json` y modifica cualquier testimonio:

```json
{
  "testimonios": [
    {
      "id": 1,
      "texto": "Tu testimonio aquí...",
      "nombre": "Nombre del Cliente",
      "cargo": "Cargo | Sector",
      "sector": "Sector de la empresa"
    }
  ]
}
```

### **2. Campos Disponibles**
- **`texto`**: El testimonio del cliente (entre comillas)
- **`nombre`**: Nombre del cliente
- **`cargo`**: Cargo y sector de la empresa
- **`sector`**: Sector de la empresa (para futuras funcionalidades)

### **3. Agregar Nuevo Testimonio**
Simplemente agrega un nuevo objeto al array `testimonios`:

```json
{
  "id": 4,
  "texto": "Nuevo testimonio...",
  "nombre": "Nuevo Cliente",
  "cargo": "Nuevo Cargo | Nuevo Sector",
  "sector": "Nuevo Sector"
}
```

### **4. Eliminar Testimonio**
Elimina el objeto del array en el archivo JSON.

## 🚀 **Ventajas del Sistema**

✅ **Fácil actualización** - Solo editar JSON, no código HTML
✅ **Sin riesgo de errores** - No tocar código HTML/JavaScript
✅ **Fallback automático** - Si falla la carga, mantiene testimonios estáticos
✅ **Escalable** - Fácil agregar/quitar testimonios
✅ **Mantenible** - Separación clara entre datos y presentación

## 🔍 **Testimonios Actuales**

1. **Rodrigo A.** - Jefe de Operaciones | Sector Distribución Eléctrica
2. **Paula M.** - Líder de HSE | Sector Industrial  
3. **Pablo Rain** - Gerente de Operaciones | Servicios Acuícolas PyV

## ⚠️ **Notas Importantes**

- Los testimonios se cargan automáticamente al cargar la página
- Si hay error en la carga, se mantienen los testimonios estáticos como respaldo
- El orden de los testimonios en el JSON es el orden de aparición en la página
- Usar comillas dobles en el JSON, no comillas simples
