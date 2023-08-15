import { Field } from "formik";
import { Tooltip } from "react-tooltip";

interface FormikInputComponentProps {
  name: string;
  className?: string;
  type: string;
  placeholder: string;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  tooltipPlacement?: "left" | "right";
}

const FormikInputComponent = ({
  name,
  className,
  type,
  placeholder,
  errors,
  touched,
  tooltipPlacement,
}: FormikInputComponentProps): JSX.Element => {
  const InputBorderColor = () => {
    if (errors[name] && touched[name]) {
      return "border-red-500";
    } else if (!errors[name] && touched[name]) {
      return "border-green-500";
    } else {
      return "";
    }
  };
  return (
    <>
      <div
        data-tooltip-id={`error-tooltip-${name}`}
        className={`${className} h-16`}
      >
        <Field
          name={name}
          className={`border rounded px-2 py-3 w-full ${InputBorderColor()}`}
          type={type}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && touched[name] ? (
        <Tooltip
          id={`error-tooltip-${name}`}
          place={`${tooltipPlacement ?? "right"}-start`}
          isOpen={errors[name] && touched[name] ? true : false}
        >
          <p className=" text-red-500 text-sm font-bold">{errors[name]}</p>
        </Tooltip>
      ) : null}
    </>
  );
};

export default FormikInputComponent;
