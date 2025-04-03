const CasaRow = ({ direccion, numero }) => (
  <tr>
    <td style={{ padding: '10px' }}>{direccion}</td>
    <td style={{ padding: '10px' }}>{numero}</td>
    <td style={{ padding: '10px' }}>
      <button title="Visualizar">👁️</button>
      <button title="Editar">✏️</button>
      <button title="Deshabilitar">🚫</button>
    </td>
  </tr>
);

export default CasaRow;
