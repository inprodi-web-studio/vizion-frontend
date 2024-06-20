import React, { CSSProperties, forwardRef, useImperativeHandle } from "react";
import registerComponent, { CodeComponentMeta } from "@plasmicapp/host/registerComponent";
import { WarningDiamond } from "@phosphor-icons/react";
import { theme } from "antd";

import { Registerable } from "./registerable";

interface FormFieldProps {
    error: string;
    label: string;
    name: string;
    className: string;
    content: any;
    onErrorChange: any;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(({
    name,
    label,
    error,
    content,
    className,
    onErrorChange,
}, ref) => {
    useImperativeHandle(ref, () => ({
        setFieldError : (message: string) => {
            onErrorChange(message);
        },
      }) as any, [onErrorChange]);

      const handleClearError = () => {
        onErrorChange(null);
    };

    const labelContainerStyles: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const labelStyles: CSSProperties = {
        marginBottom: "4px",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
    };

    const errorContainerStyles: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "6px",
        color: theme.useToken().token.colorError,
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "16px",
        marginTop: "4px",
    };

    return (
        <div className={`form_field-inprodi ${className}`} ref={ref}>
            <div>
                <div className="label-container" style={labelContainerStyles}>
                    <label htmlFor={name} style={labelStyles}>
                        {label}
                    </label>
                </div>

                { React.cloneElement( content, { error, onClearError : handleClearError } )}

                { error && (
                    <div className="error-container" style={errorContainerStyles}>
                        <WarningDiamond size={12} weight="bold" />
                        <p className="field_error">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export const formFieldMeta: CodeComponentMeta<FormFieldProps> = {
    name: "Form Field",
    displayName: "Form Field",
    states : {
        error : {
            type : "writable",
            variableType : "text",
            valueProp : "error",
            onChangeProp : "onErrorChange",
        },
    },
    props: {
        name: {
            type: "string",
            defaultValue: "",
            description: "The name of the form field",
        },
        label: {
            type: "string",
            defaultValue: "Input Label",
            description: "The label of the form field",
        },
        content: {
            type: "slot",
            description: "The content of the form field",
        },
        error: {
            type: "string",
            description: "The error of the form field",
            defaultValue: "",
        },
        onErrorChange : {
            type : "eventHandler",
            argTypes : [],
        },
    },
    refActions: {
        setFieldError: {
            description: "Set a manual error to the field",
            argTypes: [{ name: "message", type: "string" }],
        },
    },
    importPath: "inprodi-design-system",
    importName: "FormField",
};

export function registerFormField(
    loader?: Registerable,
    customFormFieldMeta?: CodeComponentMeta<FormFieldProps>
) {
    const doRegisterComponent: typeof registerComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(FormField, customFormFieldMeta ?? formFieldMeta);
}