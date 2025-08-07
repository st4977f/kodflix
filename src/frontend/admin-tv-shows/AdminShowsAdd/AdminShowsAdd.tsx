import React, { Component } from 'react';
import './AdminShowsAdd.scss';

interface AdminShowsAddState {
    id: string;
    title: string;
    description: string[];
    synopsis: string;
    trailerId: string;
}

export default class AdminShowsAdd extends Component<{}, AdminShowsAddState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: ['', '', ''],
            synopsis: '',
            trailerId: ''
        };
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { id, title, description, synopsis, trailerId } = this.state;
        const payload = { id, title, description, synopsis, trailerId };

        try {
            const response = await fetch('/api/shows', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                // Success: clear form or show message
                this.setState({
                    id: '',
                    title: '',
                    description: ['', '', ''],
                    synopsis: '',
                    trailerId: ''
                });
                alert('Show added successfully!');
            } else {
                // Error: show error message
                alert('Failed to add show.');
            }
        } catch (error) {
            alert('Error submitting form.');
        }
    };

    onInputChange = (name: string, value: string) => {
        this.setState({ [name]: value } as unknown as Pick<AdminShowsAddState, keyof AdminShowsAddState>);
    };

    onMultipleInput = (name: 'description', value: string, index: number) => {
        this.setState(prevState => {
            const updatedArr = [...prevState.description];
            updatedArr[index] = value;
            return { description: updatedArr };
        });
    };

    render() {
        const { id, title, description, synopsis, trailerId } = this.state;
        return (
            <div className="add-show-container">
                <div className="add-show-title">Add New Show</div>
                <form onSubmit={this.handleSubmit} className="add-form">
                    <ul>
                        <li className="form-section">
                            <label>Add TV Show Title: </label>
                            <input
                                type="text"
                                value={title}
                                placeholder="TV Show Title..."
                                name="title"
                                onChange={e => this.onInputChange(e.target.name, e.target.value)}
                                autoComplete="off" />
                        </li>
                        <li className="form-section">
                            <label>Add TV Show ID: </label>
                            <input
                                type="text"
                                value={id}
                                placeholder="TV Show ID..."
                                name="id"
                                onChange={e => this.onInputChange(e.target.name, e.target.value)}
                                autoComplete="off" />
                        </li>
                        <li className="form-section">
                            <label>Add TV Show Genres (max 3): </label>
                            <div className="multiple-input">
                                {description.map((desc, index) => (
                                    <input
                                        type="text"
                                        key={`desc-${index}`}
                                        value={desc}
                                        placeholder="Genre..."
                                        onChange={e => this.onMultipleInput('description', e.target.value, index)}
                                        autoComplete="off" />
                                ))}
                            </div>
                        </li>
                        <li className="form-section">
                            <label>Add TV Show Synopsis: </label>
                            <textarea
                                value={synopsis}
                                placeholder="TV Show Synopsis..."
                                name="synopsis"
                                onChange={e => this.onInputChange(e.target.name, e.target.value)}
                                autoComplete="off" />
                        </li>
                        <li className="form-section">
                            <label>Add YouTube Trailer ID: </label>
                            <input
                                type="text"
                                value={trailerId}
                                placeholder="YouTube Trailer ID..."
                                name="trailerId"
                                onChange={e => this.onInputChange(e.target.name, e.target.value)}
                                autoComplete="off" />
                        </li>
                    </ul>
                    <div className="submitBtn">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
  }