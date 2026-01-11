import React from 'react';
import { cn } from '@/lib/utils';
import {
    PlusIcon,
} from 'lucide-react';

export function ContactCard({
    title = 'Contact With Us',
    description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
    contactInfo,
    className,
    formSectionClassName,
    children,
    ...props
}) {
    return (
        <div
            className={cn(
                'bg-card border border-white/10 relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3',
                className,
            )}
            {...props}
        >
            <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-white/20" />
            <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-white/20" />
            <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-white/20" />
            <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-white/20" />
            <div className="flex flex-col justify-between lg:col-span-2">
                <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
                    <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
                        {title}
                    </h1>
                    <p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
                        {description}
                    </p>
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mt-4">
                        {contactInfo?.map((info, index) => (
                            <ContactInfo key={index} {...info} />
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={cn(
                    'bg-muted/40 flex h-full w-full items-center border-t border-white/10 p-4 md:col-span-1 md:border-t-0 md:border-l md:p-8',
                    formSectionClassName,
                )}
            >
                {children}
            </div>
        </div >
    );
}

function ContactInfo({
    icon: Icon,
    label,
    value,
    className,
    ...props
}) {
    return (
        <div className={cn('flex items-start gap-3 py-3', className)} {...props}>
            <div className="bg-muted/40 rounded-lg p-3 shrink-0">
                <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
                <p className="font-medium text-sm md:text-base">{label}</p>
                <p className="text-muted-foreground text-xs md:text-sm break-all">{value}</p>
            </div>
        </div>
    );
}
