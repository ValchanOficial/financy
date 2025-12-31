import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Label } from "../ui/label";

export function InputWithLabel({ 
  label, 
  id, 
  type, 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  IconLeft, 
  IconRight, 
  info,
  disabled = false
}: {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  IconLeft?: React.ReactNode;
  IconRight?: React.ReactNode;
  info?: string;
  disabled?: boolean;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <InputGroup className="h-12">
        <InputGroupInput
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="h-12"
            disabled={disabled}
        />
        {IconLeft && (
          <InputGroupAddon>
            {IconLeft}
          </InputGroupAddon>
        )}
        {IconRight && (
          <InputGroupAddon align="inline-end">
            {IconRight}
          </InputGroupAddon>
        )}
      </InputGroup>
      {info && <p className="text-sm text-gray-500">{info}</p>}
  </div>)
}