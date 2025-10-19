#!/usr/bin/env python3
"""
Automatizafix - Función Serverless para Vercel (Backup)
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
    
    def enviar_correo_consulta(self, datos_formulario: Dict) -> bool:
        """Envía correo al contacto de TotalFix"""
        try:
            # Crear mensaje principal para TotalFix
            msg_principal = MIMEMultipart('alternative')
            msg_principal['From'] = self.gmail_user
            msg_principal['To'] = self.gmail_user  # TotalFix
            msg_principal['Subject'] = f"🔧 Nueva Consulta: {datos_formulario.get('nombre', 'Cliente')} - {datos_formulario.get('empresa', 'Empresa')}"
            
            # Crear contenido
            html_content = self.crear_plantilla_correo(datos_formulario)
            html_part = MIMEText(html_content, 'html', 'utf-8')
            msg_principal.attach(html_part)
            
            # Configurar servidor SMTP
            context = ssl.create_default_context()
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.gmail_user, self.gmail_password)
                server.send_message(msg_principal)
                logger.info(f"Correo enviado a TotalFix para {datos_formulario.get('nombre')}")
                
            return True
            
        except Exception as e:
            logger.error(f"Error al enviar correo: {str(e)}")
            return False
    
    def procesar_consulta(self, datos_formulario: Dict) -> Dict:
        """Procesa una consulta completa"""
        try:
            # Validar datos requeridos
            campos_requeridos = ['nombre', 'empresa', 'email', 'telefono', 'sector']
            for campo in campos_requeridos:
                if not datos_formulario.get(campo):
                    return {
                        'success': False,
                        'error': f'Campo requerido faltante: {campo}'
                    }
            
            # Enviar correo
            if self.enviar_correo_consulta(datos_formulario):
                return {
                    'success': True,
                    'message': 'Consulta procesada exitosamente'
                }
            else:
                return {
                    'success': False,
                    'error': 'Error al enviar correo'
                }
                
        except Exception as e:
            logger.error(f"Error al procesar consulta: {str(e)}")
            return {
                'success': False,
                'error': f'Error interno: {str(e)}'
            }

# ================================================================== */
# Función Serverless para Vercel - Handler Simplificado
# ================================================================== */

def handler(request):
    """
    Handler simplificado para Vercel
    """
    try:
        # Headers CORS
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        }
        
        # Manejar preflight OPTIONS
        if request.method == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'OK'})
            }
        
        # Solo permitir POST
        if request.method != 'POST':
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'error': 'Método no permitido'
                })
            }
        
        # Obtener datos del request
        try:
            datos = request.get_json()
        except:
            datos = {}
        
        if not datos:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'error': 'No se recibieron datos'
                })
            }
        
        # Crear manejador de correos
        email_handler = AutomatizafixEmailHandler()
        
        # Procesar consulta
        resultado = email_handler.procesar_consulta(datos)
        
        if resultado['success']:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(resultado)
            }
        else:
            return {
                'statusCode': 400,
                'headers': headers,
                'body': json.dumps(resultado)
            }
            
    except Exception as e:
        logger.error(f"Error en función serverless: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'error': 'Error interno del servidor'
            })
        }
