import { useState } from 'react';
import pollService from "./services/polls.js"

function addPoll({ pollName, pollQuestion }) {
    // Tu możesz dodać funkcjonalność zapisu ankiety
    console.log(`Adding poll: ${pollName} - ${pollQuestion}`);

    event.preventDefault()
    const pollObject = {
      content: {pollName},
      question: {pollQuestion},
      anwsers: [0,0]
    }

    pollService.create(preventDefault).then(response => {
        setPolls(polls.concat(response.data))
    })


}

export default function LoginPage() {
    const [formData, setFormData] = useState({
        pollTitle: '',
        pollFrage: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPoll({ pollName: formData.pollTitle, pollQuestion: formData.pollFrage });
    };

    return (
        <form onSubmit={handleSubmit}>
            Name:
            <input name="pollTitle" type="text" value={formData.pollTitle} onChange={handleChange} /> <br />
            Question:
            <input name="pollFrage" type="text" value={formData.pollFrage} onChange={handleChange} /> <br />
            <button type="submit">Submit</button>
        </form>
    );
}
