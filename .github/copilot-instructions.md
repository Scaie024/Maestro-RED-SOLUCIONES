<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Red Soluciones - Google Sheets Backend System

Este proyecto es un sistema backend que utiliza Google Sheets como base de datos, proporcionando una API REST para realizar operaciones CRUD.

## Tecnologías Principales
- **Node.js** con Express.js
- **Google Sheets API v4** para conectividad
- **Service Account Authentication** para autenticación segura
- **Frontend vanilla HTML/CSS/JavaScript** para interfaz de usuario

## Estructura del Proyecto
- `server.js` - Servidor principal con API REST
- `credentials.json` - Credenciales del service account de Google
- `public/index.html` - Interfaz web para interactuar con los datos
- `.env` - Variables de entorno

## APIs Disponibles
- `GET /api/sheets` - Lista todas las hojas del spreadsheet
- `GET /api/sheets/:sheetName/data` - Obtiene datos de una hoja específica
- `POST /api/sheets/:sheetName/rows` - Agrega nueva fila a una hoja
- `PUT /api/sheets/:sheetName/range/:range` - Actualiza un rango específico

## Consideraciones de Desarrollo
- Usar async/await para operaciones asíncronas
- Manejar errores adecuadamente con try/catch
- Validar datos de entrada antes de enviar a Google Sheets
- Mantener la estructura de datos consistente
- Implementar logging apropiado para debugging

## Funcionalidades del Sistema
- Lectura de datos desde Google Sheets
- Escritura de nuevos registros
- Actualización de rangos específicos
- Interfaz web responsive para gestión
- Exportación de datos a JSON
- Manejo de errores robusto
