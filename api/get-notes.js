// API endpoint para obtener todas las notas guardadas
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    // En un entorno real, aquí obtendrías las notas de una base de datos
    // Por ahora, devolvemos notas de ejemplo
    
    const sampleNotes = [
      {
        id: '1',
        title: 'Nota de ejemplo 1',
        content: 'Esta es una nota de ejemplo. Puedes enviar cualquier información a la API y se guardará aquí.',
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Información del sistema',
        content: 'El sistema está funcionando correctamente. Todas las peticiones POST a /api/save-note se guardarán y mostrarán aquí.',
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    ];

    res.status(200).json({
      success: true,
      notes: sampleNotes,
      count: sampleNotes.length
    });

  } catch (error) {
    console.error('Error al obtener las notas:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
