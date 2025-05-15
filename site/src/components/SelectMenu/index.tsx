import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';

import style from './SelectMenu.module.scss';

interface Props {
    value: any,
    onValueChange: any,
    options: any[],
    type: "category" | "state" | "city" | "condition" | "used" | "favFilter",
    disabled?: boolean,
    className?: string
}

const SelectMenu: React.FC<Props> = ({ value, onValueChange, options, type, disabled, className }) => {
    return (
        <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
            <Select.Trigger className={`${style.Input} ${style.SelectTrigger} ${className ? className : ""}`} id="category">
                <Select.Value/>
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
                    { type === "city" && (
                        <Select.Viewport>
                            {options.map((option) => (
                                <Select.Item key={option.id} value={option.nome} className={style.SelectOption}>
                                    <Select.ItemText>{option.nome}</Select.ItemText>
                                    <Select.ItemIndicator className={style.SelectItemIndicator}>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    )}
                    { type === "condition" && (
                        <Select.Viewport>
                            {options.map((option, idx) => (
                                <Select.Item key={idx} value={option} className={`${style.SelectOption} ${style.vw25}`}>
                                    <Select.ItemText>{option}</Select.ItemText>
                                    <Select.ItemIndicator className={style.SelectItemIndicator}>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    )}
                    { type === "used" && (
                        <Select.Viewport>
                            {options.map((option, idx) => (
                                <Select.Item key={idx} value={option.value} className={`${style.SelectOption} ${style.vw25}`}>
                                    <Select.ItemText>{option.label}</Select.ItemText>
                                    <Select.ItemIndicator className={style.SelectItemIndicator}>
                                        <CheckIcon />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    )}
                    { type === "favFilter" && (
                        <Select.Viewport>
                            {options.map((option, idx) => (
                                <Select.Item key={idx} value={option.value} className={style.SelectOption}>
                                    <Select.ItemText>{option.label}</Select.ItemText>
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