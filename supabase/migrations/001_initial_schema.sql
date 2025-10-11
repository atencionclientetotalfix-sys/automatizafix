-- TotalFix Database Schema
-- ================================================================== */
-- Migración inicial para el sistema de TotalFix
-- ================================================================== */

-- Crear tabla de consultas
CREATE TABLE IF NOT EXISTS consultas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    empresa VARCHAR(255) NOT NULL,
    cargo VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    dolores TEXT[], -- Array de dolores identificados
    descripcion TEXT,
    consentimiento BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'nuevo' -- nuevo, contactado, en_proceso, cerrado
);

-- Crear tabla de seguimiento de consultas
CREATE TABLE IF NOT EXISTS seguimiento_consultas (
    id SERIAL PRIMARY KEY,
    consulta_id INTEGER REFERENCES consultas(id) ON DELETE CASCADE,
    accion VARCHAR(100) NOT NULL, -- email_enviado, llamada_realizada, etc.
    descripcion TEXT,
    usuario_responsable VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de configuraciones del sistema
CREATE TABLE IF NOT EXISTS configuraciones (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar configuraciones iniciales
INSERT INTO configuraciones (clave, valor, descripcion) VALUES
('email_contacto', 'atencioncliente.totalfix@gmail.com', 'Email principal de contacto'),
('telefono_contacto', '+56961932656', 'Teléfono de contacto'),
('empresa_nombre', 'TotalFix', 'Nombre de la empresa'),
('empresa_direccion', 'Puerto Montt, Chile', 'Dirección de la empresa'),
('sectores_disponibles', '["Distribución eléctrica", "Industrial", "Acuícola", "Construcción", "Servicios", "Otro"]', 'Sectores disponibles en el formulario'),
('dolores_disponibles', '["Falta de Trazabilidad en SST", "Papeleo Excesivo", "Aprobaciones Lentas", "Reporte de Incidente Ineficiente", "Falta de Estandarización", "Necesidad de Integración"]', 'Dolores disponibles en el formulario')
ON CONFLICT (clave) DO NOTHING;

-- Crear índices para optimización
CREATE INDEX IF NOT EXISTS idx_consultas_email ON consultas(email);
CREATE INDEX IF NOT EXISTS idx_consultas_empresa ON consultas(empresa);
CREATE INDEX IF NOT EXISTS idx_consultas_sector ON consultas(sector);
CREATE INDEX IF NOT EXISTS idx_consultas_created_at ON consultas(created_at);
CREATE INDEX IF NOT EXISTS idx_consultas_status ON consultas(status);

CREATE INDEX IF NOT EXISTS idx_seguimiento_consulta_id ON seguimiento_consultas(consulta_id);
CREATE INDEX IF NOT EXISTS idx_seguimiento_created_at ON seguimiento_consultas(created_at);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para updated_at
CREATE TRIGGER update_consultas_updated_at 
    BEFORE UPDATE ON consultas 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuraciones_updated_at 
    BEFORE UPDATE ON configuraciones 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Crear vista para consultas con seguimiento
CREATE OR REPLACE VIEW consultas_con_seguimiento AS
SELECT 
    c.*,
    COUNT(s.id) as total_seguimientos,
    MAX(s.created_at) as ultimo_seguimiento,
    STRING_AGG(s.accion, ', ' ORDER BY s.created_at DESC) as acciones_recientes
FROM consultas c
LEFT JOIN seguimiento_consultas s ON c.id = s.consulta_id
GROUP BY c.id;

-- Crear función para obtener estadísticas
CREATE OR REPLACE FUNCTION obtener_estadisticas_consultas()
RETURNS TABLE (
    total_consultas BIGINT,
    consultas_nuevas BIGINT,
    consultas_contactadas BIGINT,
    consultas_en_proceso BIGINT,
    consultas_cerradas BIGINT,
    sector_mas_comun VARCHAR(100),
    dolores_mas_comunes TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_consultas,
        COUNT(*) FILTER (WHERE status = 'nuevo') as consultas_nuevas,
        COUNT(*) FILTER (WHERE status = 'contactado') as consultas_contactadas,
        COUNT(*) FILTER (WHERE status = 'en_proceso') as consultas_en_proceso,
        COUNT(*) FILTER (WHERE status = 'cerrado') as consultas_cerradas,
        (SELECT sector FROM consultas GROUP BY sector ORDER BY COUNT(*) DESC LIMIT 1) as sector_mas_comun,
        (SELECT ARRAY_AGG(DISTINCT unnest(dolores)) FROM consultas WHERE dolores IS NOT NULL) as dolores_mas_comunes
    FROM consultas;
END;
$$ LANGUAGE plpgsql;

-- Comentarios en las tablas
COMMENT ON TABLE consultas IS 'Tabla principal de consultas recibidas desde el formulario';
COMMENT ON TABLE seguimiento_consultas IS 'Tabla de seguimiento de acciones realizadas en cada consulta';
COMMENT ON TABLE configuraciones IS 'Tabla de configuraciones del sistema';

COMMENT ON COLUMN consultas.dolores IS 'Array de dolores identificados por el cliente';
COMMENT ON COLUMN consultas.status IS 'Estado de la consulta: nuevo, contactado, en_proceso, cerrado';
COMMENT ON COLUMN seguimiento_consultas.accion IS 'Tipo de acción realizada: email_enviado, llamada_realizada, reunion_agendada, etc.';

