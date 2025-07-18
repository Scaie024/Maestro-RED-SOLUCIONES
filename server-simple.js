/**
 * =============================================================================
 * RED SOLUCIONES - SISTEMA BACKEND CON GOOGLE SHEETS (VERSIÓN SIMPLE)
 * =============================================================================
 */

const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuración Google Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getGoogleSheetsInstance() {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, 'credentials.json'),
        scopes: SCOPES,
    });
    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
}

// Funciones principales
async function getSheetsInfo() {
    const sheets = await getGoogleSheetsInstance();
    const response = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
    });
    return response.data.sheets.map(sheet => ({
        title: sheet.properties.title,
        sheetId: sheet.properties.sheetId,
        rowCount: sheet.properties.gridProperties?.rowCount || 0,
        columnCount: sheet.properties.gridProperties?.columnCount || 0
    }));
}

async function readSheetData(sheetName, range = 'A:Z') {
    const sheets = await getGoogleSheetsInstance();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!${range}`,
    });
    return response.data.values || [];
}

async function appendRowData(sheetName, values) {
    const sheets = await getGoogleSheetsInstance();
    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'RAW',
        requestBody: { values: [values] },
    });
    return response.data;
}

async function updateRangeData(sheetName, range, values) {
    const sheets = await getGoogleSheetsInstance();
    const response = await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!${range}`,
        valueInputOption: 'RAW',
        requestBody: { values: values },
    });
    return response.data;
}

// =============================================================================
// RUTAS API
// =============================================================================

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Estado del servidor
app.get('/api/health', async (req, res) => {
    try {
        const sheetsInfo = await getSheetsInfo();
        res.json({
            success: true,
            message: '✅ Servidor funcionando correctamente',
            timestamp: new Date().toISOString(),
            port: PORT,
            googleSheets: {
                connected: true,
                spreadsheetId: SPREADSHEET_ID,
                totalSheets: sheetsInfo.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: '❌ Error de conexión',
            error: error.message
        });
    }
});

// Lista de hojas
app.get('/api/sheets', async (req, res) => {
    try {
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
            error: error.message
        });
    }
});

// Datos de una hoja
app.get('/api/sheets/:sheetName/data', async (req, res) => {
    try {
        const { sheetName } = req.params;
        const { range = 'A:Z' } = req.query;
        
        const data = await readSheetData(sheetName, range);
        
        let result = { 
            raw: data,
            totalRows: data.length
        };
        
        if (data.length > 0) {
            const headers = data[0];
            const rows = data.slice(1).map((row, index) => {
                const obj = { _rowNumber: index + 2 };
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
            error: error.message
        });
    }
});

// Agregar nueva fila
app.post('/api/sheets/:sheetName/rows', async (req, res) => {
    try {
        const { sheetName } = req.params;
        const { values } = req.body;
        
        if (!values || !Array.isArray(values)) {
            return res.status(400).json({
                success: false,
                error: 'Se requiere un array de valores',
                example: { values: ["valor1", "valor2", "valor3"] }
            });
        }
        
        const result = await appendRowData(sheetName, values);
        
        res.json({
            success: true,
            message: `Nueva fila agregada a "${sheetName}"`,
            valuesAdded: values,
            result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Actualizar rango - usando POST para evitar problemas con caracteres especiales
app.post('/api/sheets/:sheetName/update', async (req, res) => {
    try {
        const { sheetName } = req.params;
        const { range, values } = req.body;
        
        if (!range || !values || !Array.isArray(values)) {
            return res.status(400).json({
                success: false,
                error: 'Se requieren los campos "range" y "values"',
                example: { 
                    range: "A1:B2", 
                    values: [["valor1", "valor2"], ["valor3", "valor4"]] 
                }
            });
        }
        
        const result = await updateRangeData(sheetName, range, values);
        
        res.json({
            success: true,
            message: `Rango "${range}" actualizado en "${sheetName}"`,
            range,
            valuesUpdated: values,
            result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        availableEndpoints: [
            'GET /',
            'GET /api/health',
            'GET /api/sheets',
            'GET /api/sheets/:sheetName/data',
            'POST /api/sheets/:sheetName/rows',
            'POST /api/sheets/:sheetName/update'
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
    console.log(`📍 Servidor: http://localhost:${PORT}`);
    console.log(`📊 Google Sheets ID: ${SPREADSHEET_ID}`);
    console.log(`🕐 Iniciado: ${new Date().toLocaleString()}`);
    console.log('='.repeat(60));
    
    try {
        const sheets = await getSheetsInfo();
        console.log('✅ Conexión exitosa con Google Sheets');
        console.log(`📋 Hojas disponibles (${sheets.length}):`);
        sheets.forEach((sheet, index) => {
            console.log(`   ${index + 1}. ${sheet.title} (${sheet.rowCount}x${sheet.columnCount})`);
        });
        console.log('='.repeat(60));
        console.log(`🌐 Interfaz web: http://localhost:${PORT}`);
        console.log(`🔍 Estado: http://localhost:${PORT}/api/health`);
        console.log('='.repeat(60) + '\n');
    } catch (error) {
        console.log('❌ Error:', error.message);
        console.log('='.repeat(60) + '\n');
    }
});

module.exports = app;
