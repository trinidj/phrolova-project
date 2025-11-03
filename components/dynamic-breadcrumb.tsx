"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatLabel = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = formatLabel(decodeURIComponent(segment));
    const isLast = index === segments.length - 1;

    return { href, label, isLast };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home link - always shown */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Only show separator and other items if not on home page */}
        {breadcrumbs.length > 0 && (
          <>
            <BreadcrumbSeparator />
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="contents">
                <BreadcrumbItem>
                  {crumb.isLast ? (
                    // Active page - not clickable
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    // Intermediate pages - clickable
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {/* Add separator if not the last item */}
                {!crumb.isLast && <BreadcrumbSeparator />}
              </div>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
