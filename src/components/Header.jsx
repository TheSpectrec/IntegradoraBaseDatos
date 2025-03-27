import logo from "../assets/img/LOGOTIPO.png";

const Header = () => {
  return (
    <div
      className="w-100 py-2 px-4 d-flex align-items-center shadow-lg"
      style={{
        background: "linear-gradient(to right, #D3D3C5, #BEBEAA)",
        height: "100px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <img src={logo} alt="Logo" style={{ width: "160px", height: "auto" }} />
      <div className="text-center flex-grow-1">
        <h2 className="fw-bold text-uppercase mb-0">Control de Visitas</h2>
        <h4 className="fw-bold text-uppercase mb-0">A Fraccionamiento</h4>
      </div>
    </div>
  );
};

export default Header;
