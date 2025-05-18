import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Share1Icon, Link2Icon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import style from './ShareDropdown.module.scss';

import { ReactComponent as WhatsApp } from '../../../../assets/Footer/face.svg';
import { ReactComponent as Facebook } from '../../../../assets/Footer/whats.svg';
import { ReactComponent as X } from '../../../../assets/Footer/twitter.svg';

interface ShareDropdownProps {
    url?: string;
    product: string
}

const ShareDropdown: React.FC<ShareDropdownProps> = ({ url, product }) => {
    const currentUrl = url || window.location.href;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            toast.success('Link copiado!');
        } catch {
            toast.error('Erro ao copiar link');
        }
    };

    const text = `Confira *${product}*!! Encontre no ClickBuy! ${encodeURIComponent(currentUrl)}`

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${text}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${text}`,
        twitter: `https://twitter.com/intent/tweet?url=${text}`
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className={style.TriggerButton}>
                    <Share1Icon className={style.Icon} />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className={style.DropdownContent} sideOffset={5}>
                    <DropdownMenu.Item className={style.Item} onClick={handleCopy}>
                        <Link2Icon /> Copiar Link
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={style.Item} asChild>
                        <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp className={style.ShareIcon} /> WhatsApp</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={style.Item} asChild>
                        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"><Facebook className={style.ShareIcon} /> Facebook</a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={style.Item} asChild>
                        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer"><X className={style.ShareIcon} /> Twitter</a>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default ShareDropdown;
