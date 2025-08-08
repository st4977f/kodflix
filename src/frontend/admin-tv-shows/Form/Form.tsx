import React from 'react';
import './Form.scss';

export interface TVShowFormData {
  id: string;
  title: string;
  description: string[];
  synopsis: string;
  trailerId: string;
}

interface FormProps {
  data: TVShowFormData;
  onInputChange: (name: string, value: string) => void;
  onMultipleInput: (name: 'description', value: string, index: number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  title?: string;
  labels?: {
    title?: string;
    id?: string;
    description?: string;
    synopsis?: string;
    trailerId?: string;
  };
}

const Form: React.FC<FormProps> = ({
  data,
  onInputChange,
  onMultipleInput,
  onSubmit,
  submitLabel = 'Submit',
  title = 'Title',
  labels = {},
}) => (
  <div className="show-container">
    <div className="show-title">{title}</div>
    <form onSubmit={onSubmit} className="form">
      <ul>
        <li className="form-section">
          <label>{labels.title}</label>
          <input
            type="text"
            value={data.title}
            placeholder={labels.title}
            name="title"
            onChange={e => onInputChange(e.target.name, e.target.value)}
            autoComplete="off" />
        </li>
        <li className="form-section">
          <label>{labels.id}</label>
          <input
            type="text"
            value={data.id}
            placeholder={labels.id}
            name="id"
            onChange={e => onInputChange(e.target.name, e.target.value)}
            autoComplete="off" />
        </li>
        <li className="form-section">
          <label>{labels.description}</label>
          <div className="multiple-input">
            {data.description.map((desc, index) => (
              <input
                type="text"
                key={`desc-${index}`}
                value={desc}
                placeholder={'Genre...'}
                onChange={e => onMultipleInput('description', e.target.value, index)}
                autoComplete="off" />
            ))}
          </div>
        </li>
        <li className="form-section">
          <label>{labels.synopsis}</label>
          <textarea
            value={data.synopsis}
            placeholder={labels.synopsis}
            name="synopsis"
            onChange={e => onInputChange(e.target.name, e.target.value)}
            autoComplete="off" />
        </li>
        <li className="form-section">
          <label>{labels.trailerId}</label>
          <input
            type="text"
            value={data.trailerId}
            placeholder={labels.trailerId}
            name="trailerId"
            onChange={e => onInputChange(e.target.name, e.target.value)}
            autoComplete="off" />
        </li>
      </ul>
      <div className="submitBtn">
        <input type="submit" value={submitLabel} />
      </div>
    </form>
  </div>
);

export default Form;
