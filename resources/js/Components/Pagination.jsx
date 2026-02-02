import { Link } from '@inertiajs/react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

export default function PaginationLinks({ links }) {
    if (links.length <= 3) return null

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                {links.map((link, index) => {
                    if (!link.url) {
                        return (
                            <PaginationItem key={index}>
                                <span className="px-3 py-2 text-sm text-muted-foreground">
                                    {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                                </span>
                            </PaginationItem>
                        )
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                asChild
                                isActive={link.active}
                            >
                                <Link
                                    href={link.url}
                                    preserveScroll
                                    preserveState
                                >
                                    {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                                </Link>
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}
            </PaginationContent>
        </Pagination>
    )
}
