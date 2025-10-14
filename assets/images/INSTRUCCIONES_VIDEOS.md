# 🔧 Instrucciones Técnicas - Videos Demostrativos

## Implementación Técnica

### Estructura HTML
Los videos se implementan usando el elemento HTML5 `<video>` con múltiples fuentes para compatibilidad:

```html
<video controls preload="metadata" poster="assets/images/video1-poster.jpg">
    <source src="assets/images/demo-sst.mp4" type="video/mp4">
    <source src="assets/images/demo-sst.webm" type="video/webm">
    Tu navegador no soporta la reproducción de videos.
</video>
```

### Atributos Importantes
- **`controls`**: Muestra controles de reproducción nativos
- **`preload="metadata"`**: Carga solo metadatos (duración, dimensiones)
- **`poster`**: Imagen que se muestra antes de la reproducción
- **`type`**: Especifica el tipo MIME para mejor compatibilidad

### Estilos CSS Responsivos

#### Contenedor de Video
```css
.video-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    background-color: #000;
    border-radius: 0.5rem;
    overflow: hidden;
}
```

#### Video Responsivo
```css
.video-wrapper video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
}
```

## Optimización de Videos

### Compresión Recomendada
```bash
# Para MP4 (H.264)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k output.mp4

# Para WebM (VP9)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

### Parámetros de Calidad
- **CRF 23**: Calidad alta para MP4
- **CRF 30**: Calidad media para WebM
- **Bitrate de audio**: 128kbps
- **Resolución**: 1280x720 (HD) o 1920x1080 (Full HD)

## Compatibilidad de Navegadores

### Soporte de Formatos
| Navegador | MP4 (H.264) | WebM (VP9) |
|-----------|-------------|------------|
| Chrome    | ✅          | ✅         |
| Firefox   | ✅          | ✅         |
| Safari    | ✅          | ❌         |
| Edge      | ✅          | ✅         |

### Fallback
Si el navegador no soporta video, se muestra el mensaje:
```html
Tu navegador no soporta la reproducción de videos.
```

## Lazy Loading

### Implementación
Los videos se cargan solo cuando son visibles usando Intersection Observer:

```javascript
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            video.load(); // Carga el video cuando es visible
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('video').forEach(video => {
    videoObserver.observe(video);
});
```

## Personalización Avanzada

### Cambiar Aspect Ratio
Para videos con proporción diferente a 16:9:

```css
.video-wrapper {
    padding-bottom: 75%; /* 4:3 aspect ratio */
    /* o */
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
}
```

### Agregar Subtítulos
```html
<video controls>
    <source src="demo.mp4" type="video/mp4">
    <track kind="subtitles" src="subtitles.vtt" srclang="es" label="Español">
</video>
```

### Autoplay (No Recomendado)
```html
<video autoplay muted loop>
    <!-- Solo para videos de fondo, no para demostraciones -->
</video>
```

## Métricas y Analytics

### Eventos de Video
```javascript
video.addEventListener('play', () => {
    // Video iniciado
    analytics.track('video_play', { video_id: 'demo-sst' });
});

video.addEventListener('ended', () => {
    // Video completado
    analytics.track('video_complete', { video_id: 'demo-sst' });
});
```

## Troubleshooting

### Problemas Comunes

1. **Video no se reproduce:**
   - Verificar que el archivo existe en la ruta correcta
   - Comprobar que el servidor sirve archivos MP4/WebM
   - Revisar la consola del navegador para errores

2. **Video se ve distorsionado:**
   - Verificar que el aspect ratio CSS es correcto
   - Comprobar que `object-fit: cover` está aplicado

3. **Carga lenta:**
   - Optimizar el tamaño del archivo
   - Usar `preload="none"` para videos largos
   - Implementar lazy loading

### Herramientas de Debug
```javascript
// Verificar soporte de formatos
const video = document.createElement('video');
console.log('MP4:', video.canPlayType('video/mp4'));
console.log('WebM:', video.canPlayType('video/webm'));
```

## Mantenimiento

### Actualización de Videos
1. Reemplazar archivos en `assets/images/`
2. Actualizar metadatos en HTML si es necesario
3. Probar en diferentes navegadores
4. Verificar que los posters siguen siendo relevantes

### Monitoreo de Performance
- Usar herramientas como Lighthouse para medir Core Web Vitals
- Monitorear el tiempo de carga de videos
- Optimizar según las métricas de usuarios reales
