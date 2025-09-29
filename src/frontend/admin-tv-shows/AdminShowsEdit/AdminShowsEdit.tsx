import React, { Component } from 'react';
import Form from '../Form/Form';
import fetchData from '../../common/fetch';
import { useParams, useNavigate } from 'react-router-dom';

interface AdminShowsEditState {
    id: string;
    title: string;
    description: string[];
    synopsis: string;
    trailerId: string;
}

interface AdminShowsEditProps {
    id?: string;
}

class AdminShowsEdit extends Component<AdminShowsEditProps & { navigate?: Function }, AdminShowsEditState> {
    constructor(props: AdminShowsEditProps) {
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
            const response = await fetchData(`/api/shows/${id}`, {
                method: 'PUT',
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
                alert('Show edited successfully!');
                if (this.props.navigate) {
                    this.props.navigate('../list');
                }
            } else {
                // Error: show error message
                alert('Failed to edit show.');
            }
        } catch (error) {
            alert('Error submitting form.');
        }
    };

    onInputChange = (name: string, value: string) => {
        this.setState({ [name]: value } as unknown as Pick<AdminShowsEditState, keyof AdminShowsEditState>);
    };

    onMultipleInput = (name: 'description', value: string, index: number) => {
        this.setState(prevState => {
            const updatedArr = [...prevState.description];
            updatedArr[index] = value;
            return { description: updatedArr };
        });
    };

    async componentDidMount() {
        // Get show ID from props (injected by wrapper)
        const id = this.props.id;
        if (id) {
            try {
                const res = await fetchData(`/rest/shows/${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    body: ''
                });
                if (res.ok) {
                    const show = await res.json();
                    this.setState({
                        id: show.id,
                        title: show.title,
                        description: show.description || ['', '', ''],
                        synopsis: show.synopsis || '',
                        trailerId: show.trailerId || ''
                    });
                }
            } catch (err) {
                // handle error
            }
        }
    }

    render() {
        return (
            <Form
                data={this.state}
                onInputChange={this.onInputChange}
                onMultipleInput={this.onMultipleInput}
                onSubmit={this.handleSubmit}
                submitLabel="Save Changes"
                title="Admin - Edit TV Show"
                labels={{
                    title: 'Edit TV Show Title',
                    id: 'Edit TV Show ID',
                    description: 'Edit TV Show Genres (max 3)',
                    synopsis: 'Edit TV Show Synopsis',
                    trailerId: 'Edit YouTube Trailer ID'
                }}
            />
        );
    }
}

// Wrapper to inject params as props
function AdminShowsEditWrapper() {
    const params = useParams();
    const navigate = useNavigate();
    return <AdminShowsEdit id={params.id} navigate={navigate} />;
}

export default AdminShowsEditWrapper;