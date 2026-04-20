import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
    const navigate = useNavigate();
    return (_jsxs("div", { style: {
            textAlign: "center",
            marginTop: "100px",
        }, children: [_jsx("h1", { style: { fontSize: "60px" }, children: "404" }), _jsx("h2", { children: "Page Not Found" }), _jsx("p", { children: "The page you are looking for does not exist." }), _jsx("button", { onClick: () => navigate("/"), style: {
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }, children: "Go to Home" })] }));
}
