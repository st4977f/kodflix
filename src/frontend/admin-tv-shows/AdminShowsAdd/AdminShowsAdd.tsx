import React, { Component } from 'react';
import Form from '../Form/Form';

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
        return (
            <Form
                data={this.state}
                onInputChange={this.onInputChange}
                onMultipleInput={this.onMultipleInput}
                onSubmit={this.handleSubmit}
                submitLabel="Add Show"
                title="Add New Show"
                labels={{
                    title: 'Add TV Show Title',
                    id: 'Add TV Show ID',
                    description: 'Add TV Show Genres (max 3):',
                    synopsis: 'Add TV Show Synopsis:',
                    trailerId: 'Add YouTube Trailer ID:'
                }}
            />
        );
    }
  }