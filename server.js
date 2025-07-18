/**
 * =============================================================================
 * RED SOLUCIONES - SISTEMA BACKEND CON GOOGLE SHEETS
 * =============================================================================
 * 
 * Sistema que utiliza Google Sheets como base de datos principal.
 * Proporciona una API REST completa para operaciones CRUD.
 * 
 * Autor: Red Soluciones
 * Fecha: 18 de Julio 2025
 * Puerto: 3001 (configurable en .env)
 * =============================================================================
 */

// =============================================================================
// IMPORTACIONES Y CONFIGURACIÓN INICIAL
// =============================================================================
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// =============================================================================
// CONFIGURACIÓN DEL SERVIDOR
// =============================================================================
const app = express();
const PORT = process.env.PORT || 3001;  // Puerto por defecto: 3001
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

// Verificar que tenemos las variables necesarias
if (!SPREADSHEET_ID) {
    console.error('❌ ERROR: No se encontró GOOGLE_SHEETS_ID en .env');
    process.exit(1);
}

// =============================================================================
// MIDDLEWARES
// =============================================================================
app.use(cors());                           // Permitir requests desde cualquier origen
app.use(express.json());                   // Parsear JSON en requests
app.use(express.static('public'));         // Servir archivos estáticos desde /public

// =============================================================================
// CONFIGURACIÓN DE GOOGLE SHEETS API
// =============================================================================
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Crear instancia autenticada de Google Sheets
 * @returns {Promise} Instancia de Google Sheets API
 */
async function getGoogleSheetsInstance() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.join(__dirname, 'credentials.json'),
            scopes: SCOPES,
        });

        const authClient = await auth.getClient();
        return google.sheets({ version: 'v4', auth: authClient });
    } catch (error) {
        console.error('❌ Error creando instancia de Google Sheets:', error.message);
        throw error;
    }
}

// =============================================================================
// FUNCIONES PRINCIPALES PARA GOOGLE SHEETS
// =============================================================================

/**
 * Obtener información de todas las hojas del spreadsheet
 * @returns {Promise<Array>} Lista de hojas con sus propiedades
 */
async function getSheetsInfo() {
    try {
        const sheets = await getGoogleSheetsInstance();
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });
        
        return response.data.sheets.map(sheet => ({
            title: sheet.properties.title,
            sheetId: sheet.properties.sheetId,
            gridProperties: sheet.properties.gridProperties,
            rowCount: sheet.properties.gridProperties?.rowCount || 0,
            columnCount: sheet.properties.gridProperties?.columnCount || 0
        }));
    } catch (error) {
        console.error('❌ Error obteniendo información de las hojas:', error.message);
        throw error;
    }
}

/**
 * Leer datos de una hoja específica
 * @param {string} sheetName - Nombre de la hoja
 * @param {string} range - Rango a leer (ej: "A:Z" o "A1:E10")
 * @returns {Promise<Array>} Datos de la hoja
 */
async function readSheetData(sheetName, range = 'A:Z') {
    try {
        const sheets = await getGoogleSheetsInstance();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: `${sheetName}!${range}`,
        });
        
        console.log(`📊 Leyendo datos de "${sheetName}" - Rango: ${range}`);
        return response.data.values || [];
    } catch (error) {
        console.error(`❌ Error leyendo datos de "${sheetName}":`, error.message);
        throw error;
    }
}

/**
 * Escribir datos en una hoja (actualizar rango específico)
 * @param {string} sheetName - Nombre de la hoja
 * @param {string} range - Rango a actualizar
 * @param {Array} values - Valores a escribir
 * @returns {Promise} Resultado de la operación
 */
async function writeSheetData(sheetName, range, values) {
    try {
        const sheets = await getGoogleSheetsInstance();
        const response = await sheets.spreadsheets.values.update({
            spreadsheetId: SPREADSHEET_ID,
            range: `${sheetName}!${range}`,
            valueInputOption: 'RAW',
            requestBody: {
                values: values,
            },
        });
        
        console.log(`✅ Datos actualizados en "${sheetName}" - Rango: ${range}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error escribiendo en "${sheetName}":`, error.message);
        throw error;
    }
}

/**
 * Agregar nueva fila al final de una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {Array} values - Valores de la nueva fila
 * @returns {Promise} Resultado de la operación
 */
async function appendRowData(sheetName, values) {
    try {
        const sheets = await getGoogleSheetsInstance();
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${sheetName}!A:Z`,
            valueInputOption: 'RAW',
            requestBody: {
                values: [values],
            },
        });
        
        console.log(`✅ Nueva fila agregada a "${sheetName}"`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error agregando fila a "${sheetName}":`, error.message);
        throw error;
    }
}

// =============================================================================
// API ROUTES - ENDPOINTS REST
// =============================================================================

/**
 * RUTA PRINCIPAL - Página de inicio
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * GET /api/sheets
 * Obtener información de todas las hojas disponibles
 */
app.get('/api/sheets', async (req, res) => {
    try {
        console.log('📋 Solicitando lista de hojas...');
        const sheetsInfo = await getSheetsInfo();
        
        res.json({
            success: true,
            message: 'Lista de hojas obtenida exitosamente',
            spreadsheetId: SPREADSHEET_ID,
            totalSheets: sheetsInfo.length,
            sheets: sheetsInfo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error obteniendo lista de hojas'
        });
    }
});

/**
 * GET /api/sheets/:sheetName/data
 * Obtener datos de una hoja específica
 * Query params: ?range=A:Z (opcional)
 */
app.get('/api/sheets/:sheetName/data', async (req, res) => {
    try {
        const { sheetName } = req.params;
        const { range = 'A:Z' } = req.query;
        
        console.log(`📊 Solicitando datos de "${sheetName}"...`);
        const data = await readSheetData(sheetName, range);
        
        // Procesar datos para mayor claridad
        let result = { 
            raw: data,
            totalRows: data.length,
            totalColumns: data.length > 0 ? Math.max(...data.map(row => row.length)) : 0
        };
        
        // Si hay datos, estructurar con headers
        if (data.length > 0) {
            const headers = data[0];
            const rows = data.slice(1).map((row, index) => {
                const obj = { _rowNumber: index + 2 }; // +2 porque empezamos en fila 2
                headers.forEach((header, colIndex) => {
                    obj[header] = row[colIndex] || '';
                });
                return obj;
            });
            
            result.headers = headers;
            result.rows = rows;
            result.dataRows = rows.length;
        }
        
        res.json({
            success: true,
            message: `Datos de "${sheetName}" obtenidos exitosamente`,
            sheetName,
            range,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: `Error obteniendo datos de "${req.params.sheetName}"`
        });
    }
});

/**
 * POST /api/sheets/:sheetName/rows
 * Agregar nueva fila a una hoja
 * Body: { "values": ["valor1", "valor2", "valor3"] }
 */
app.post('/api/sheets/:sheetName/rows', async (req, res) => {
    try {
        const { sheetName } = req.params;
        const { values } = req.body;
        
        // Validación de entrada
        if (!values || !Array.isArray(values)) {
            return res.status(400).json({
                success: false,
                error: 'Se requiere un array de valores en el campo "values"',
                example: { values: ["valor1", "valor2", "valor3"] }
            });
        }
        
        console.log(`➕ Agregando nueva fila a "${sheetName}"...`);
        const result = await appendRowData(sheetName, values);
        
        res.json({
            success: true,
            message: `Nueva fila agregada exitosamente a "${sheetName}"`,
            valuesAdded: values,
            result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: `Error agregando fila a "${req.params.sheetName}"`
        });
    }
});

/**
 * PUT /api/sheets/:sheetName/range/:range
 * Actualizar datos en un rango específico
 * Body: { "values": [["fila1col1", "fila1col2"], ["fila2col1", "fila2col2"]] }
 */
app.put('/api/sheets/:sheetName/range/:rangeParam', async (req, res) => {
    try {
        const { sheetName, rangeParam } = req.params;
        const { values } = req.body;
        
        // Validación de entrada
        if (!values || !Array.isArray(values)) {
            return res.status(400).json({
                success: false,
                error: 'Se requiere un array de valores en el campo "values"',
                example: { values: [["valor1", "valor2"], ["valor3", "valor4"]] }
            });
        }
        
        console.log(`🔄 Actualizando rango "${rangeParam}" en "${sheetName}"...`);
        const result = await writeSheetData(sheetName, rangeParam, values);
        
        res.json({
            success: true,
            message: `Rango "${rangeParam}" actualizado exitosamente en "${sheetName}"`,
            range: rangeParam,
            valuesUpdated: values,
            result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: `Error actualizando rango "${req.params.rangeParam}" en "${req.params.sheetName}"`
        });
    }
});

/**
 * GET /api/health
 * Verificar estado del servidor y conexión a Google Sheets
 */
app.get('/api/health', async (req, res) => {
    try {
        const sheetsInfo = await getSheetsInfo();
        res.json({
            success: true,
            message: 'Servidor funcionando correctamente',
            timestamp: new Date().toISOString(),
            googleSheets: {
                connected: true,
                spreadsheetId: SPREADSHEET_ID,
                totalSheets: sheetsInfo.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error de conexión',
            timestamp: new Date().toISOString(),
            googleSheets: {
                connected: false,
                error: error.message
            }
        });
    }
});

// =============================================================================
// MANEJO DE ERRORES 404
// =============================================================================
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        availableEndpoints: [
            'GET /',
            'GET /api/sheets',
            'GET /api/sheets/:sheetName/data',
            'POST /api/sheets/:sheetName/rows',
            'PUT /api/sheets/:sheetName/range/:rangeParam',
            'GET /api/health'
        ]
    });
});

// =============================================================================
// INICIAR SERVIDOR
// =============================================================================
app.listen(PORT, async () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 RED SOLUCIONES - GOOGLE SHEETS BACKEND');
    console.log('='.repeat(60));
    console.log(`� Servidor ejecutándose en: http://localhost:${PORT}`);
    console.log(`📊 Google Sheets ID: ${SPREADSHEET_ID}`);
    console.log(`🕐 Iniciado: ${new Date().toLocaleString()}`);
    console.log('='.repeat(60));
    
    // Verificar conexión con Google Sheets al iniciar
    try {
        console.log('🔍 Verificando conexión con Google Sheets...');
        const sheets = await getSheetsInfo();
        console.log('✅ Conexión exitosa con Google Sheets');
        console.log(`📋 Hojas disponibles (${sheets.length}):`);
        sheets.forEach((sheet, index) => {
            console.log(`   ${index + 1}. ${sheet.title} (${sheet.rowCount}x${sheet.columnCount})`);
        });
        console.log('='.repeat(60));
        console.log('🌐 Interfaz web disponible en: http://localhost:' + PORT);
        console.log('📖 API Documentation: http://localhost:' + PORT + '/api/health');
        console.log('='.repeat(60) + '\n');
    } catch (error) {
        console.log('❌ Error conectando con Google Sheets:');
        console.log('   ' + error.message);
        console.log('='.repeat(60) + '\n');
    }
});

// =============================================================================
// MANEJO GRACEFUL DE CIERRE
// =============================================================================
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor gracefully...');
    process.exit(0);
});

module.exports = app;
