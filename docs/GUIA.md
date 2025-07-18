# 🚀 RED SOLUCIONES - GUÍA DE INSTALACIÓN Y USO

## 📋 ¿Qué es este sistema?

Este es un **sistema backend completo** que utiliza **Google Sheets como base de datos**. 

Permite:
- ✅ Leer datos de cualquier hoja de Google Sheets
- ✅ Agregar nuevos registros
- ✅ Actualizar información existente
- ✅ Exportar datos a JSON
- ✅ Interfaz web moderna y fácil de usar

---

## 🛠️ INSTALACIÓN PASO A PASO

### 1️⃣ Requisitos Previos
```bash
# Verificar que tienes Node.js instalado
node --version

# Si no tienes Node.js, descárgalo de:
# https://nodejs.org/
```

### 2️⃣ Instalación
```bash
# 1. Abrir terminal en la carpeta del proyecto
cd "/Users/arturopinzon/Desktop/Esta vez"

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor (automático)
npm start
```

### 3️⃣ Verificación
- El servidor se iniciará en: `http://localhost:3001`
- Si ves el mensaje "✅ Conexión exitosa con Google Sheets" = ¡Todo funciona!

---

## 🌐 CÓMO USAR EL SISTEMA

### Opción 1: Interfaz Web (Más Fácil)
1. Abrir navegador
2. Ir a: `http://localhost:3001`
3. ¡Usar la interfaz visual!

### Opción 2: API REST (Para Programadores)
```bash
# Verificar estado del sistema
curl http://localhost:3001/api/health

# Ver todas las hojas disponibles
curl http://localhost:3001/api/sheets

# Ver datos de una hoja específica
curl "http://localhost:3001/api/sheets/01_Clientes/data"
```

---

## 📊 HOJAS DISPONIBLES EN TU SISTEMA

Tu Google Sheet tiene estas hojas:
1. **01_Clientes** - Información de clientes
2. **02_Cobranza** - Control de cobranza
3. **Fallas - Reportes** - Reportes de fallas
4. **04_Inventario** - Control de inventario
5. **05_Prospectos** - Seguimiento de prospectos
6. **06_Desconexiones** - Control de desconexiones
7. **07_Proveedores** - Información de proveedores
8. **09_Dashboard** - Dashboard principal
9. **10_Config** - Configuraciones
10. **Clientes** - Clientes adicionales
11. **Pagos** - Control de pagos
12. **Inventario** - Inventario adicional

---

## 🔧 CONFIGURACIÓN

### Archivo `.env` (Variables de entorno)
```env
PORT=3001                                               # Puerto del servidor
GOOGLE_SHEETS_ID=1OZKZIpn6U1nCfrDM_yGmC6jKj6iLH_MQz814LjEBRMQ  # ID de tu Google Sheet
NODE_ENV=development                                    # Entorno de desarrollo
```

### Archivo `credentials.json`
- ✅ Ya está configurado con tus credenciales de Google
- ❗ **NO compartir este archivo** - contiene claves privadas

---

## 📖 EJEMPLOS PRÁCTICOS

### Ejemplo 1: Ver clientes
```bash
# En terminal
curl "http://localhost:3001/api/sheets/01_Clientes/data"

# En navegador
http://localhost:3001/api/sheets/01_Clientes/data
```

### Ejemplo 2: Agregar nuevo cliente
```bash
curl -X POST http://localhost:3001/api/sheets/01_Clientes/rows \
  -H "Content-Type: application/json" \
  -d '{"values":["Cliente Nuevo","123456789","email@ejemplo.com"]}'
```

### Ejemplo 3: Ver inventario
```bash
curl "http://localhost:3001/api/sheets/04_Inventario/data"
```

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema: "Puerto en uso"
```bash
# Verificar qué está usando el puerto
lsof -i :3001

# Cambiar puerto en .env
PORT=3002
```

### Problema: "Error de conexión a Google"
1. Verificar que `credentials.json` existe
2. Verificar que el Google Sheet está compartido con el service account
3. Email del service account: `red-soluciones-fo@dev-spirit-466223-v9.iam.gserviceaccount.com`

### Problema: "Módulos no encontrados"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

---

## 📱 COMANDOS ÚTILES

```bash
# Iniciar servidor
npm start

# Iniciar con script automático
./start.sh

# Verificar estado
curl http://localhost:3001/api/health

# Ver logs en tiempo real
tail -f server.log  # (si existe)

# Detener servidor
Ctrl + C
```

---

## 🎯 PRÓXIMOS PASOS

1. **Personalizar**: Modificar `public/index.html` para tu marca
2. **Ampliar**: Agregar más endpoints específicos para tu negocio
3. **Seguridad**: Agregar autenticación si es necesario
4. **Deploy**: Subir a un servidor en la nube

---

## 📞 SOPORTE

- **Archivo de configuración**: `.github/copilot-instructions.md`
- **Documentación API**: `http://localhost:3001/api/health`
- **Logs del servidor**: En la terminal donde ejecutas `npm start`

---

**🔥 Desarrollado por Red Soluciones**
