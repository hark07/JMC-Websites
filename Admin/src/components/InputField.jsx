const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        border
        rounded-lg
        px-4
        py-2
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        "
      />
    </div>
  );
};

export default InputField;