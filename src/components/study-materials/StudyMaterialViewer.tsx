import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Download, Eye } from "lucide-react";
import MarkdownPreview from "@/components/ui/markdown-preview";
import { getIcon, getResourceColor } from "./utils";
import type { StudyMaterial } from "./types";

interface StudyMaterialViewerProps {
  resource: StudyMaterial | null;
  onClose: () => void;
}

export function StudyMaterialViewer({ resource, onClose }: StudyMaterialViewerProps) {
  if (!resource) return null;

  const colors = getResourceColor(resource.type);

  return (
    <Dialog open={!!resource} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-none border-border/40 bg-background p-0 md:h-[90vh] md:w-[95vw] md:rounded-md">
        {/* Header */}
        <DialogHeader className="flex shrink-0 flex-row items-center justify-between border-b border-border/40 p-4">
          <div className="flex min-w-0 items-center gap-3 overflow-hidden">
            {/* Mobile back button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-md md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Icon */}
            <div className={`rounded-md border border-border/40 p-2 ${colors.text} shrink-0`}>
              {getIcon(resource.type)}
            </div>

            {/* Title and meta */}
            <div className="min-w-0">
              <DialogTitle className="truncate text-base font-medium md:text-lg">
                {resource.title}
              </DialogTitle>
              <div className="mt-0.5 flex items-center gap-2">
                <Badge variant="outline" className="rounded-md border-border/40 text-xs font-normal">
                  {resource.subject}
                </Badge>
                <span className="hidden truncate text-xs text-muted-foreground sm:inline">
                  By {resource.author}
                </span>
              </div>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden h-8 rounded-md sm:flex">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hidden h-8 w-8 rounded-md md:flex"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <DialogDescription className="sr-only">
          Viewing study material: {resource.title}
        </DialogDescription>

        {/* Content area */}
        <div className="relative flex-1 overflow-hidden bg-muted/30 p-0 md:p-2">
          {resource.type.toLowerCase() === "video" ? (
            <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black md:rounded-md">
              <iframe
                src={resource.url}
                className="aspect-video h-full w-full"
                title={resource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : resource.type.toLowerCase() === "markdown" ||
            resource.type.toLowerCase() === "notes" ? (
            <div className="h-full w-full overflow-hidden border-0 bg-background md:rounded-md md:border md:border-border/40">
              <MarkdownPreview
                content={resource.content || resource.url || "# No content available"}
                className="h-full"
              />
            </div>
          ) : resource.type.toLowerCase() === "pdf" ? (
            <div className="relative h-full w-full overflow-hidden bg-muted/20 md:rounded-md">
              <iframe
                src={resource.url}
                className="h-full w-full"
                title={resource.title}
              />
              {/* Mobile download FAB */}
              <div className="absolute bottom-4 right-4 z-10 md:hidden">
                <Button size="icon" className="h-10 w-10 rounded-md">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center md:p-10">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md border border-border/40 md:h-20 md:w-20">
                {getIcon(resource.type)}
              </div>
              <h3 className="mb-2 text-lg font-medium text-foreground md:text-xl">
                Preview Not Available
              </h3>
              <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                This file type cannot be previewed directly. Please download to view.
              </p>
              <Button className="h-9 w-full rounded-md sm:w-auto">
                <Download className="mr-1.5 h-4 w-4" />
                Download {resource.type}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-border/40 p-3 md:p-4">
          <div className="flex items-center gap-4 text-xs md:text-sm">
            <span className="hidden text-muted-foreground sm:inline">
              Updated: {resource.updatedAt || "Recently"}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
              {resource.views || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 rounded-md px-3 text-sm font-normal">
              Share
            </Button>
            <Button variant="ghost" size="sm" className="h-8 rounded-md px-3 text-sm font-normal">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}