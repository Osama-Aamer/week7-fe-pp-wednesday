import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = ({setIsAuthenticated}) => {

    const API_URL = "/api/users"
    
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
        membership_status: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value,
        });
    }

const addUser = async (body) => {

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            console.error("Error creating user")
        }

        const data = await response.json()

        localStorage.setItem("token", data.token)

        return data 

    } catch (error) {
        console.error("Fail creating new product")
    }
}

const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);

    addUser(form)
    setForm({
        name: "",
        username: "",
        password: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
        membership_status: ""
    });
      setIsAuthenticated(true);
      navigate("/");       
};

return (
    <div className="create">
        <h2>Register</h2>
        <form onSubmit={submitForm}>
            <label>Name:</label>
            <input
                type="text"
                required
                name="name"
                value={form.name}
                onChange={handleInputChange}
            />

            <label>Username:</label>
            <input
                name="username"
                required
                value={form.username}
                onChange={handleInputChange}
            ></input>

            <label>Password:</label>
            <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleInputChange}
            />

            <label>Phone number:</label>
            <input
                type="text"
                name="phone_number"
                required
                value={form.phone_number}
                onChange={handleInputChange}
            />

            <label>Gender:</label>
            <input
                type="text"
                name="gender"
                required
                value={form.gender}
                onChange={handleInputChange}
            />

            <label>Date of birth:</label>
            <input
                type="date"
                name="date_of_birth"
                required
                value={form.contactEmail}
                onChange={handleInputChange}
            />


            <label>Membership status:</label>
            <input
                type="text"
                name="membership_status"
                required
                value={form.membership_status}
                onChange={handleInputChange}
            />

            <button type="submit">Submit</button>
        </form>
    </div>
);
};

export default RegistrationPage;
