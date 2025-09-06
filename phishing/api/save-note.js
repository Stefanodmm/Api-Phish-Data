// API endpoint para guardar información
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { content, title, timestamp } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'El contenido es requerido' });
    }

    // Crear una nota con timestamp si no se proporciona
    const note = {
      id: Date.now().toString(),
      title: title || 'Nota sin título',
      content: content,
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // En un entorno real, aquí guardarías en una base de datos
    // Por ahora, simularemos que se guarda exitosamente
    
    // Para este ejemplo, usaremos el almacenamiento en memoria del servidor
    // En producción deberías usar una base de datos como MongoDB, PostgreSQL, etc.
    
    console.log('Nota guardada:', note);

    res.status(200).json({
      success: true,
      message: 'Nota guardada exitosamente',
      note: note
    });

  } catch (error) {
    console.error('Error al guardar la nota:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
