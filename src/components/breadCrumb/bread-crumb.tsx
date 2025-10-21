'use client';
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function BreadcrumbWithCustomSeparator() {
  const pathname = usePathname(); 
  const pathArray = pathname.split("/").filter(Boolean);

  const crumbs = pathArray.map((segment, index) => {
    const href = "/" + pathArray.slice(0, index + 1).join("/");
    const name = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { name, href };
  });

  return (
    <Breadcrumb >
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => (
          <BreadcrumbItem key={idx}>
            <BreadcrumbLink asChild>
              <Link href={crumb.href}>{crumb.name}</Link>
            </BreadcrumbLink>
            {idx < crumbs.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
