import type { FC } from 'react';
import { cn } from '@/shared/lib/cn';
import type { AsAnchor, AsButton, ButtonProps } from './Button.types';
import s from './Button.module.css';

export const Button: FC<ButtonProps> = (props) => {
    const { variant = 'primary', size = 'md', className, children, ...rest } = props;
    const cls = cn(s.root, s[variant], s[size], className);

    if ('href' in rest && rest.href !== undefined) {
        const { href, ...anchorRest } = rest as AsAnchor;

        return (
            <a href={href} className={cls} {...anchorRest}>
                {children}
            </a>
        );
    }

    return (
        <button className={cls} {...(rest as AsButton)}>
            {children}
        </button>
    );
};
