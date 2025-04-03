const CrearButton = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        background: '#3D563D', color: 'white', padding: '10px 20px', borderRadius: '10px',
        fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem'
      }}
    >
      <span style={{ fontSize: '20px', color: 'white'}}></span> CREAR NUEVO
    </button>
  );
  
  export default CrearButton;