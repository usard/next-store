import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';

export type checkboxInputProps = {
    name: string,
    labelText: string,
    defaultChecked?:boolean
}

function CheckboxInput({name, labelText, defaultChecked=false}: checkboxInputProps) {

  return (
    <div className='mb-2 flex flex-wrap gap-3 items-center'>
        <Checkbox id={name} defaultChecked={defaultChecked}  />
        <Label htmlFor={name}>{labelText}</Label>
    </div>
  )
}

export default CheckboxInput