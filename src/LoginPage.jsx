import { useState } from 'react';
import pollService from './services/polls';


function LoginPage({ setPolls }) {
    const [formData, setFormData] = useState({
        pollName: '',
        pollQuestion: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pollObject = {
            name: formData.pollName,
            question: formData.pollQuestion,
        };

        pollService.create(pollObject)
            .then(response => {
                setPolls(prevPolls => [...prevPolls, response.data]);
                setFormData({ pollName: '', pollQuestion: '' }); // Resetowanie formularza
            })
            .catch(error => {
                console.error("Failed to create poll:", error);
                alert("Failed to create poll. Please try again.");
            });
    };

    return (
        <div className="login-page-container">
            <h2>Create a New Poll</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        name="pollName"
                        type="text"
                        value={formData.pollName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Question:
                    <input
                        name="pollQuestion"
                        type="text"
                        value={formData.pollQuestion}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LoginPage;
