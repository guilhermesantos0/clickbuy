import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';

import style from './SelectMenu.module.scss';

interface Props {
    value: any,
    onValueChange: any,
    options: any[],
    placeholder: string,
    label: string,
    type: "category" | "state" | "city"
}

const SelectMenu: React.FC<Props> = ({ value, onValueChange, options, placeholder, label, type }) => {
    return (
        <Select.Root value={value} onValueChange={onValueChange}>
            <Select.Trigger className={`${style.Input} ${style.SelectTrigger}`} id="category" aria-label={label}>
                <Select.Value placeholder={placeholder} />
                <Select.Icon>
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content 
                side="bottom"
                align="start"
                position="popper"
                avoidCollisions={false}
                sideOffset={4}
                className={style.SelectContent}>

                    { type === "category" && (
                        <Select.Viewport>
                            {options.map((option) => (
                                <Select.Item key={option._id} value={option._id.toString()} className={style.SelectOption}>
                                    <Select.ItemText>{option.name}</Select.ItemText>
                                    <Select.ItemIndicator className={style.SelectItemIndicator}>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    )}
                    { type === "state" && (
                        <Select.Viewport>
                            {options.map((option) => (
                                <Select.Item key={option.id} value={option.sigla} className={style.SelectOption}>
                                    <Select.ItemText>{option.nome}</Select.ItemText>
                                    <Select.ItemIndicator className={style.SelectItemIndicator}>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    )}
                    
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default SelectMenu;