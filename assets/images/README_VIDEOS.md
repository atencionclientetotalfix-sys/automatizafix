# 📹 Videos Demostrativos - TotalFix

## Descripción
Esta carpeta contiene los videos demostrativos que se muestran en la sección "Videos Demostrativos" de la landing page.

## Archivos de Video Requeridos

### Video 1: Automatización de Procesos SST
- **Archivo principal:** `demo-sst.mp4`
- **Archivo alternativo:** `demo-sst.webm` (opcional, para mejor compatibilidad)
- **Poster/Thumbnail:** `video1-poster.jpg`
- **Duración:** 3:45 minutos
- **Contenido:** Flujo completo de Análisis Seguro de Trabajo (AST) con aprobaciones automáticas

### Video 2: Optimización de Operaciones
- **Archivo principal:** `demo-operaciones.mp4`
- **Archivo alternativo:** `demo-operaciones.webm` (opcional, para mejor compatibilidad)
- **Poster/Thumbnail:** `video2-poster.jpg`
- **Duración:** 4:20 minutos
- **Contenido:** Sistema de órdenes de trabajo con flujos de aprobación inteligentes

## Especificaciones Técnicas

### Formatos Soportados
- **MP4:** Formato principal (H.264)
- **WebM:** Formato alternativo (VP9/VP8)
- **Poster:** JPG o PNG (recomendado: 1280x720px)

### Calidad Recomendada
- **Resolución:** 1280x720 (HD) o 1920x1080 (Full HD)
- **Bitrate:** 2-5 Mbps para MP4
- **Duración:** 3-5 minutos por video
- **Tamaño máximo:** 50MB por archivo

## Cómo Cambiar los Videos

1. **Reemplazar archivos existentes:**
   - Sube tu nuevo video con el mismo nombre (`demo-sst.mp4`, `demo-operaciones.mp4`)
   - Reemplaza las imágenes poster si es necesario

2. **Cambiar nombres de archivos:**
   - Edita el archivo `index.html`
   - Busca la sección "Videos Demostrativos"
   - Actualiza las rutas en los elementos `<source>`

3. **Agregar nuevos videos:**
   - Agrega los archivos a esta carpeta
   - Modifica `index.html` para incluir el nuevo video
   - Actualiza los estilos CSS si es necesario

## Estructura de Archivos
```
assets/images/
├── README_VIDEOS.md (este archivo)
├── INSTRUCCIONES_VIDEOS.md (guía técnica)
├── demo-sst.mp4
├── demo-sst.webm (opcional)
├── demo-operaciones.mp4
├── demo-operaciones.webm (opcional)
├── video1-poster.jpg
└── video2-poster.jpg
```

## Notas Importantes
- Los videos se cargan de forma lazy (solo cuando son visibles)
- Se recomienda usar formatos optimizados para web
- Los posters se muestran antes de que el usuario reproduzca el video
- Los videos son responsivos y se adaptan a diferentes tamaños de pantalla

## Soporte
Para dudas sobre la implementación de videos, consulta `INSTRUCCIONES_VIDEOS.md` o contacta al equipo de desarrollo.
