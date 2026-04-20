const API = "http://localhost:5000/api/admins";
const getToken = () => localStorage.getItem("token");
/* GET */
export const fetchAdminsAPI = async () => {
    const res = await fetch(API, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.json();
};
/* CREATE */
export const createAdminAPI = async (data) => {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};
/* UPDATE */
export const updateAdminAPI = async (id, data) => {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
};
/* DELETE */
export const deleteAdminAPI = async (id) => {
    await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};
