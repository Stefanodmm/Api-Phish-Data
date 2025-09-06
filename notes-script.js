document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const notesContainer = document.getElementById('notesContainer');
    const emptyState = document.getElementById('emptyState');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const refreshBtn = document.getElementById('refreshBtn');
    const testApiBtn = document.getElementById('testApiBtn');
    const addNoteForm = document.getElementById('addNoteForm');
    const testModal = document.getElementById('testModal');
    const toastContainer = document.getElementById('toastContainer');

    // URL base de la API (se ajustará automáticamente según el entorno)
    const API_BASE = window.location.origin;

    // Función para mostrar toast notifications
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Mostrar toast con animación
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Ocultar y remover toast después de 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Función para mostrar/ocultar loading
    function setLoading(isLoading) {
        loadingIndicator.style.display = isLoading ? 'block' : 'none';
    }

    // Función para formatear fecha
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Función para cargar y mostrar las notas
    async function loadNotes() {
        try {
            setLoading(true);
            
            const response = await fetch(`${API_BASE}/api/get-notes`);
            const data = await response.json();

            if (data.success && data.notes) {
                displayNotes(data.notes);
                showToast(`${data.count} notas cargadas`, 'success');
            } else {
                throw new Error(data.error || 'Error al cargar las notas');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error al cargar las notas: ' + error.message, 'error');
            showEmptyState();
        } finally {
            setLoading(false);
        }
    }

    // Función para mostrar las notas en el DOM
    function displayNotes(notes) {
        notesContainer.innerHTML = '';
        
        if (notes.length === 0) {
            showEmptyState();
            return;
        }

        emptyState.style.display = 'none';
        
        // Ordenar notas por fecha de creación (más recientes primero)
        notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        notes.forEach(note => {
            const noteElement = createNoteElement(note);
            notesContainer.appendChild(noteElement);
        });
    }

    // Función para crear elemento de nota
    function createNoteElement(note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note-item';
        noteDiv.innerHTML = `
            <div class="note-header">
                <h3 class="note-title">${escapeHtml(note.title || 'Sin título')}</h3>
                <span class="note-timestamp">${formatDate(note.createdAt || note.timestamp)}</span>
            </div>
            <div class="note-content">${escapeHtml(note.content)}</div>
        `;
        return noteDiv;
    }

    // Función para escapar HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Función para mostrar estado vacío
    function showEmptyState() {
        notesContainer.innerHTML = '';
        emptyState.style.display = 'block';
    }

    // Función para enviar nueva nota
    async function saveNote(title, content) {
        try {
            const response = await fetch(`${API_BASE}/api/save-note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();

            if (data.success) {
                showToast('Nota guardada exitosamente', 'success');
                // Recargar las notas para mostrar la nueva
                setTimeout(() => loadNotes(), 500);
                return true;
            } else {
                throw new Error(data.error || 'Error al guardar la nota');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error al guardar la nota: ' + error.message, 'error');
            return false;
        }
    }

    // Event Listeners
    refreshBtn.addEventListener('click', loadNotes);

    // Manejar envío del formulario
    addNoteForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();

        if (!content) {
            showToast('El contenido es requerido', 'error');
            return;
        }

        const success = await saveNote(title || 'Nota sin título', content);
        
        if (success) {
            // Limpiar formulario
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
        }
    });

    // Modal de prueba de API
    testApiBtn.addEventListener('click', function() {
        testModal.style.display = 'block';
        
        // Mostrar ejemplo de petición
        const testRequest = document.getElementById('testRequest');
        testRequest.textContent = JSON.stringify({
            title: "Nota de prueba",
            content: "Esta es una nota de prueba enviada desde el modal",
            timestamp: new Date().toISOString()
        }, null, 2);
    });

    // Cerrar modal
    document.querySelector('.close').addEventListener('click', function() {
        testModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === testModal) {
            testModal.style.display = 'none';
        }
    });

    // Enviar petición de prueba
    document.getElementById('sendTestRequest').addEventListener('click', async function() {
        const testResponse = document.getElementById('testResponse');
        testResponse.style.display = 'none';
        
        try {
            const response = await fetch(`${API_BASE}/api/save-note`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Nota de prueba",
                    content: "Esta es una nota de prueba enviada desde el modal de prueba de API",
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();
            
            testResponse.style.display = 'block';
            testResponse.className = 'test-response ' + (data.success ? 'success' : 'error');
            testResponse.innerHTML = `
                <strong>Respuesta de la API:</strong><br>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;

            if (data.success) {
                showToast('Petición de prueba exitosa', 'success');
                setTimeout(() => loadNotes(), 1000);
            }
        } catch (error) {
            testResponse.style.display = 'block';
            testResponse.className = 'test-response error';
            testResponse.innerHTML = `<strong>Error:</strong> ${error.message}`;
            showToast('Error en la petición de prueba', 'error');
        }
    });

    // Cargar notas al inicializar la página
    loadNotes();

    // Auto-refresh cada 30 segundos
    setInterval(loadNotes, 30000);

    // Mostrar información inicial
    setTimeout(() => {
        showToast('Sistema cargado. Las notas se actualizan automáticamente cada 30 segundos.', 'success');
    }, 1000);
});
