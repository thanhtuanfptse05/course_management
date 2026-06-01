import React from 'react';
import { Form as RBForm } from 'react-bootstrap';

function FormField({
    type = 'text',
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    validationMessage,
    options = [],
    rows = 4,
    disabled = false,
}) {
    const controlProps = {
        name,
        value,
        onChange,
        placeholder,
        required,
        disabled,
    };

    const renderControl = () => {
        if (type === 'select') {
            return (
                <RBForm.Select {...controlProps}>
                    <option value="">Choose...</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </RBForm.Select>
            );
        }

        if (type === 'textarea') {
            return <RBForm.Control as="textarea" rows={rows} {...controlProps} />;
        }

        return <RBForm.Control type={type} {...controlProps} />;
    };

    return (
        <RBForm.Group className="mb-3" controlId={`form-${name}`}>
            {label && (
                <RBForm.Label>
                    {label}
                    {required && <span className="text-danger"> *</span>}
                </RBForm.Label>
            )}
            {renderControl()}
            {validationMessage && <RBForm.Text className="text-danger">{validationMessage}</RBForm.Text>}
        </RBForm.Group>
    );
}

export default FormField;
