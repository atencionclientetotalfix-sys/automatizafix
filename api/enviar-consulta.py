#!/usr/bin/env python3
"""
Automatizafix - Función Serverless para Vercel
Sistema de notificaciones por correo para consultas de automatización
"""

import smtplib
import os
import json
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Dict, List, Optional
import ssl
import re

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AutomatizafixEmailHandler:
    """Manejador de correos para Automatizafix - Versión Serverless"""
    
    def __init__(self):
        self.gmail_user = os.getenv("GMAIL_USER", "atencioncliente.totalfix@gmail.com")
        self.gmail_password = os.getenv("GMAIL_APP_PASSWORD")
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        
        # Debugging mejorado
        logger.info(f"GMAIL_USER configurado: {self.gmail_user}")
        logger.info(f"GMAIL_APP_PASSWORD configurado: {'SÍ' if self.gmail_password else 'NO'}")
        
        if not self.gmail_password:
            logger.error("GMAIL_APP_PASSWORD no está configurado en las variables de entorno")
            raise ValueError("GMAIL_APP_PASSWORD es requerido")
    
    def crear_plantilla_correo(self, datos_formulario: Dict) -> str:
        """Crea la plantilla HTML del correo para Automatizafix"""
        
        # Procesar dolores seleccionados
        dolores_texto = ", ".join(datos_formulario.get('dolores', [])) if datos_formulario.get('dolores') else "No especificados"
        
        # Plantilla HTML
        html_content = f"""
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nueva Consulta TotalFix</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }}
                .field {{ margin-bottom: 15px; }}
                .label {{ font-weight: bold; color: #2563eb; }}
                .value {{ margin-top: 5px; }}
                .dolores {{ background: #e0f2fe; padding: 10px; border-radius: 5px; margin: 10px 0; }}
                .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.9em; color: #6b7280; }}
                .highlight {{ background: #fef3c7; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>🔧 Nueva Consulta Automatizafix</h2>
                    <p>Automatización SST & Productividad con Jotform</p>
                </div>
                
                <div class="content">
                    <div class="highlight">
                        <strong>📋 Información del Cliente</strong>
                    </div>
                    
                    <div class="field">
                        <div class="label">👤 Nombre Completo:</div>
                        <div class="value">{datos_formulario.get('nombre', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">🏢 Empresa:</div>
                        <div class="value">{datos_formulario.get('empresa', 'No especificada')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">💼 Cargo/Rol:</div>
                        <div class="value">{datos_formulario.get('cargo', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📧 Email:</div>
                        <div class="value">{datos_formulario.get('email', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📱 Teléfono/WhatsApp:</div>
                        <div class="value">{datos_formulario.get('telefono', 'No especificado')}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">🏭 Sector:</div>
                        <div class="value">{datos_formulario.get('sector', 'No especificado')}</div>
                    </div>
                    
                    <div class="dolores">
                        <div class="label">⚠️ Dolores Identificados:</div>
                        <div class="value">{dolores_texto}</div>
                    </div>
                    
                    <div class="field">
                        <div class="label">📝 Descripción del Desafío:</div>
                        <div class="value">{datos_formulario.get('descripcion', 'No especificado')}</div>
                    </div>
                    
                    <div class="footer">
                        <p><strong>📅 Fecha de consulta:</strong> {datetime.now().strftime('%d/%m/%Y %H:%M')}</p>
                        <p><strong>🔗 Fuente:</strong> Landing Page Automatizafix</p>
                        <p><em>Este correo fue generado automáticamente desde el formulario de contacto de Automatizafix.</em></p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        return html_content
    
    def crear_correo_usuario(self, datos_formulario: Dict) -> str:
        """Crea el correo de confirmación para el usuario"""
        
        html_content = f"""
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Consulta - TotalFix</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #2563eb, #1e40af); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }}
                .content {{ background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }}
                .success {{ background: #d1fae5; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981; margin: 15px 0; }}
                .next-steps {{ background: #e0f2fe; padding: 15px; border-radius: 5px; margin: 15px 0; }}
                .contact {{ background: #fef3c7; padding: 15px; border-radius: 5px; margin: 15px 0; }}
                .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.9em; color: #6b7280; text-align: center; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>✅ ¡Consulta Recibida!</h2>
                    <p>Automatizafix - Automatización SST & Productividad</p>
                </div>
                
                <div class="content">
                    <div class="success">
                        <h3>🎉 ¡Gracias por tu interés en Automatizafix!</h3>
                        <p>Hemos recibido tu consulta sobre automatización de procesos SST y productividad. Nuestro equipo de expertos revisará tu solicitud y te contactará dentro de las próximas 4 horas hábiles.</p>
                    </div>
                    
                    <div class="next-steps">
                        <h3>📋 Próximos Pasos:</h3>
                        <ul>
                            <li>📞 <strong>Llamada de diagnóstico</strong> (30 minutos sin costo)</li>
                            <li>🔍 <strong>Análisis de tus procesos</strong> actuales</li>
                            <li>💡 <strong>Propuesta personalizada</strong> de automatización</li>
                            <li>📊 <strong>Estimación de ROI</strong> y tiempos de implementación</li>
                        </ul>
                    </div>
                    
                    <div class="contact">
                        <h3>📞 ¿Necesitas contactarnos antes?</h3>
                        <p><strong>WhatsApp:</strong> <a href="https://wa.me/56961932656">+56 9 6193 2656</a></p>
                        <p><strong>Email:</strong> <a href="mailto:atencioncliente.totalfix@gmail.com">atencioncliente.totalfix@gmail.com</a></p>
                    </div>
                    
                    <div class="footer">
                        <p><strong>Automatizafix</strong> - Automatización de Procesos SST y Productividad</p>
                        <p>Puerto Montt, Chile | <a href="https://automatizafix.vercel.app">automatizafix.vercel.app</a></p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        return html_content
    
    def enviar_correo_consulta(self, datos_formulario: Dict) -> bool:
        """
        Envía 1 correo a TotalFix (notificación) y 1 correo al usuario (confirmación)
        """
        try:
            logger.info("Iniciando envío de correos...")
            
            # Crear mensaje principal para TotalFix
            msg_principal = MIMEMultipart('alternative')
            msg_principal['From'] = self.gmail_user
            msg_principal['To'] = self.gmail_user  # TotalFix
            msg_principal['Subject'] = f"🔧 Nueva Consulta: {datos_formulario.get('nombre', 'Cliente')} - {datos_formulario.get('empresa', 'Empresa')}"
            
            # Crear contenido para TotalFix
            html_content = self.crear_plantilla_correo(datos_formulario)
            html_part = MIMEText(html_content, 'html', 'utf-8')
            msg_principal.attach(html_part)
            
            # Crear mensaje de confirmación para el usuario
            msg_usuario = MIMEMultipart('alternative')
            msg_usuario['From'] = self.gmail_user
            msg_usuario['To'] = datos_formulario.get('email', '')
            msg_usuario['Subject'] = "✅ Confirmación de Consulta - TotalFix"
            
            html_usuario = self.crear_correo_usuario(datos_formulario)
            html_part_usuario = MIMEText(html_usuario, 'html', 'utf-8')
            msg_usuario.attach(html_part_usuario)
            
            # Configurar servidor SMTP
            logger.info("Conectando a servidor SMTP...")
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                logger.info("Iniciando TLS...")
                server.starttls(context=context)
                
                logger.info("Autenticando con Gmail...")
                server.login(self.gmail_user, self.gmail_password)
                logger.info("Autenticación exitosa")
                
                # Enviar correo a TotalFix (notificación)
                logger.info("Enviando correo de notificación a TotalFix...")
                server.send_message(msg_principal)
                logger.info(f"✅ Correo de notificación enviado a TotalFix")
                
                # Enviar correo al usuario (confirmación)
                logger.info("Enviando correo de confirmación al usuario...")
                server.send_message(msg_usuario)
                logger.info(f"✅ Correo de confirmación enviado a {datos_formulario.get('email')}")
                
            logger.info("Ambos correos enviados exitosamente (1 a TotalFix, 1 al usuario)")
            return True
            
        except smtplib.SMTPAuthenticationError as e:
            logger.error(f"Error de autenticación SMTP: {str(e)}")
            return False
        except smtplib.SMTPException as e:
            logger.error(f"Error SMTP: {str(e)}")
            return False
        except Exception as e:
            logger.error(f"Error al enviar correos: {str(e)}")
            return False
    
    def procesar_consulta(self, datos_formulario: Dict) -> Dict:
        """
        Procesa una consulta completa
        """
        try:
            logger.info(f"Procesando consulta para: {datos_formulario.get('nombre', 'Usuario')}")
            
            # Validar datos requeridos
            campos_requeridos = ['nombre', 'empresa', 'email', 'telefono', 'sector']
            for campo in campos_requeridos:
                if not datos_formulario.get(campo):
                    logger.error(f"Campo requerido faltante: {campo}")
                    return {
                        'success': False,
                        'error': f'Campo requerido faltante: {campo}'
                    }
            
            # Validar email
            if not self.validar_email(datos_formulario.get('email')):
                logger.error("Email inválido")
                return {
                    'success': False,
                    'error': 'Email inválido'
                }
            
            # Enviar correos
            if self.enviar_correo_consulta(datos_formulario):
                logger.info("Consulta procesada exitosamente")
                return {
                    'success': True,
                    'message': 'Consulta procesada exitosamente'
                }
            else:
                logger.error("Error al enviar correos")
                return {
                    'success': False,
                    'error': 'Error al enviar correos'
                }
                
        except Exception as e:
            logger.error(f"Error al procesar consulta: {str(e)}")
            return {
                'success': False,
                'error': f'Error interno: {str(e)}'
            }
    
    def validar_email(self, email: str) -> bool:
        """Valida formato de email"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None

# ================================================================== */
# Función Serverless para Vercel - Handler Corregido
# ================================================================== */

# Importaciones adicionales para compatibilidad con Vercel
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
import time
import hashlib

# Cache para evitar duplicados
_processed_requests = {}

class handler(BaseHTTPRequestHandler):
    """
    Handler compatible con Vercel Python Runtime
    Mantiene toda la lógica de correos intacta
    """
    
    def _set_headers(self, status_code=200, content_type='application/json'):
        """Configura headers CORS"""
        self.send_response(status_code)
        self.send_header('Content-Type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def _send_json_response(self, data, status_code=200):
        """Envía respuesta JSON"""
        self._set_headers(status_code)
        response = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.wfile.write(response)
    
    def do_OPTIONS(self):
        """Maneja preflight CORS"""
        logger.info("Manejando preflight OPTIONS")
        self._set_headers(200)
        self.wfile.write(b'')
    
    def do_POST(self):
        """Maneja solicitudes POST"""
        global _processed_requests
        
        try:
            logger.info("=" * 60)
            logger.info("POST request recibido")
            
            # Leer datos del body
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            
            logger.info(f"Body recibido (primeros 200 chars): {body[:200]}...")
            
            # Parsear datos primero para obtener información
            try:
                datos = json.loads(body) if body else {}
            except json.JSONDecodeError as e:
                logger.error(f"Error al parsear JSON: {str(e)}")
                self._send_json_response({
                    'success': False,
                    'error': 'Datos JSON inválidos'
                }, 400)
                return
            
            # Crear ID único basado en email + nombre + timestamp del cliente
            # Esto es más robusto que usar solo el body completo
            unique_data = f"{datos.get('email', '')}|{datos.get('nombre', '')}|{datos.get('timestamp', '')}"
            request_id = hashlib.md5(unique_data.encode()).hexdigest()
            current_time = time.time()
            
            logger.info(f"Request ID: {request_id[:12]}... | Email: {datos.get('email', 'N/A')}")
            
            # Protección contra duplicados (60 segundos de ventana)
            if request_id in _processed_requests:
                last_time = _processed_requests[request_id]
                time_diff = current_time - last_time
                if time_diff < 60:  # 60 segundos de protección
                    logger.warning(f"⚠️ REQUEST DUPLICADO BLOQUEADO - Recibido hace {time_diff:.1f}s")
                    logger.warning(f"Email: {datos.get('email')} | Nombre: {datos.get('nombre')}")
                    self._send_json_response({
                        'success': True,
                        'message': 'Consulta ya procesada (duplicado bloqueado)'
                    })
                    return
                else:
                    logger.info(f"Request antiguo ({time_diff:.1f}s), permitiendo reenvío")
            
            # Marcar request como procesado ANTES de enviar correos
            _processed_requests[request_id] = current_time
            logger.info(f"✓ Request marcado como procesado")
            
            # Limpiar cache antiguo (más de 10 minutos)
            _processed_requests = {
                req_id: timestamp for req_id, timestamp in _processed_requests.items()
                if current_time - timestamp < 600
            }
            logger.info(f"Cache de duplicados: {len(_processed_requests)} requests activos")
            
            # Validar que hay datos
            if not datos:
                logger.error("No se recibieron datos")
                self._send_json_response({
                    'success': False,
                    'error': 'No se recibieron datos'
                }, 400)
                return
            
            # Crear manejador de correos (lógica intacta)
            try:
                logger.info("Inicializando email handler...")
                email_handler = AutomatizafixEmailHandler()
                logger.info("Email handler inicializado correctamente")
            except ValueError as e:
                logger.error(f"Error al inicializar email handler: {str(e)}")
                self._send_json_response({
                    'success': False,
                    'error': 'Error de configuración del servidor'
                }, 500)
                return
            except Exception as e:
                logger.error(f"Error inesperado al inicializar: {str(e)}")
                self._send_json_response({
                    'success': False,
                    'error': 'Error interno del servidor'
                }, 500)
                return
            
            # Procesar consulta (lógica intacta)
            try:
                logger.info("Procesando consulta...")
                resultado = email_handler.procesar_consulta(datos)
                logger.info(f"Resultado: {resultado}")
            except Exception as e:
                logger.error(f"Error al procesar consulta: {str(e)}")
                self._send_json_response({
                    'success': False,
                    'error': 'Error al procesar la consulta'
                }, 500)
                return
            
            # Enviar respuesta
            if resultado['success']:
                logger.info("✅ Consulta procesada exitosamente")
                self._send_json_response(resultado, 200)
            else:
                logger.error(f"❌ Error: {resultado.get('error', 'Desconocido')}")
                self._send_json_response(resultado, 400)
                
        except Exception as e:
            logger.error(f"Error crítico: {str(e)}")
            self._send_json_response({
                'success': False,
                'error': 'Error crítico del servidor'
            }, 500)
    
    def do_GET(self):
        """Maneja solicitudes GET - Info del endpoint"""
        logger.info("GET request recibido")
        self._send_json_response({
            'service': 'Automatizafix Email API',
            'status': 'active',
            'version': '2.0',
            'endpoint': '/api/enviar-consulta',
            'method': 'POST'
        })
    
    def log_message(self, format, *args):
        """Sobrescribe log_message para usar nuestro logger"""
        logger.info(f"{self.address_string()} - {format % args}")