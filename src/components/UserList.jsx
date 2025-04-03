import { useEffect, useState } from "react";

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error("Respuesta inesperada:", data);
        }
      })
      .catch((err) => console.error("Error al obtener usuarios:", err));
  }, []);

  const handleToggleEstado = async (id) => {
    const confirm = window.confirm("¿Deseas cambiar el estado de este usuario?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:4000/api/users/status/${id}`, {
        method: "PUT",
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Estado actualizado");
        setUsuarios((prev) =>
          prev.map((u) => (u._id === id ? { ...u, enabled: !u.enabled } : u))
        );
      } else {
        alert("❌ Error al cambiar estado");
        console.error("Respuesta:", result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {usuarios.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ margin: 0 }}>{user.nombre} {user.apellido}</h3>
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Rol:</strong> {user.tipoUsuario}</p>
          <p><strong>Estado:</strong> {user.enabled ? "Activo" : "Inactivo"}</p>

          <button
            onClick={() => handleToggleEstado(user._id)}
            style={{
              marginTop: "10px",
              backgroundColor: user.enabled ? "#d9534f" : "#5cb85c",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {user.enabled ? "Desactivar" : "Activar"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
