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
        Envía correo al contacto de TotalFix y copia al usuario
        """
        try:
            # Crear mensaje principal para TotalFix
            msg_principal = MIMEMultipart('alternative')
            msg_principal['From'] = self.gmail_user
            msg_principal['To'] = self.gmail_user  # TotalFix
            msg_principal['Cc'] = datos_formulario.get('email', '')  # Usuario
            msg_principal['Subject'] = f"🔧 Nueva Consulta: {datos_formulario.get('nombre', 'Cliente')} - {datos_formulario.get('empresa', 'Empresa')}"
            
            # Crear contenido
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
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.gmail_user, self.gmail_password)
                
                # Enviar correo principal a TotalFix
                server.send_message(msg_principal)
                logger.info(f"Correo principal enviado a TotalFix para {datos_formulario.get('nombre')}")
                
                # Enviar correo de confirmación al usuario
                server.send_message(msg_usuario)
                logger.info(f"Correo de confirmación enviado a {datos_formulario.get('email')}")
                
            return True
            
        except Exception as e:
            logger.error(f"Error al enviar correos: {str(e)}")
            return False
    
    def procesar_consulta(self, datos_formulario: Dict) -> Dict:
        """
        Procesa una consulta completa
        """
        try:
            # Validar datos requeridos
            campos_requeridos = ['nombre', 'empresa', 'email', 'telefono', 'sector']
            for campo in campos_requeridos:
                if not datos_formulario.get(campo):
                    return {
                        'success': False,
                        'error': f'Campo requerido faltante: {campo}'
                    }
            
            # Validar email
            if not self.validar_email(datos_formulario.get('email')):
                return {
                    'success': False,
                    'error': 'Email inválido'
                }
            
            # Enviar correos
            if self.enviar_correo_consulta(datos_formulario):
                return {
                    'success': True,
                    'message': 'Consulta procesada exitosamente'
                }
            else:
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
# Función Serverless para Vercel - Handler Python Puro
# ================================================================== */

from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Manejar peticiones OPTIONS para CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """Manejar peticiones POST para enviar consultas"""
        try:
            # Obtener datos del request
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            datos = json.loads(post_data.decode('utf-8'))
            
            # Crear manejador de correos
            email_handler = AutomatizafixEmailHandler()
            resultado = email_handler.procesar_consulta(datos)
            
            # Enviar respuesta
            self.send_response(200 if resultado['success'] else 400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(resultado).encode('utf-8'))
            
        except Exception as e:
            logger.error(f"Error en función serverless: {str(e)}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            error_response = {'success': False, 'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))