import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
            <DialogContent className="max-w-6xl w-full h-full md:w-[95vw] md:h-[90vh] md:rounded-xl p-0 overflow-hidden bg-background border-border shadow-2xl rounded-none flex flex-col">
                <DialogHeader className="p-4 border-b border-border/40 flex flex-row items-center justify-between bg-secondary/5 shrink-0">
                    <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8 md:hidden"
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        <div className={`p-1.5 md:p-2 rounded-lg ${colors.bg} ${colors.text} shrink-0`}>
                            {getIcon(resource.type)}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <DialogTitle className="text-base md:text-lg font-semibold leading-none truncate">
                                {resource.title}
                            </DialogTitle>
                            <div className="flex items-center gap-2 mt-0.5 md:mt-1">
                                <Badge variant="outline" className="text-[10px] md:text-xs h-4 md:h-5 px-1 md:px-2">
                                    {resource.subject}
                                </Badge>
                                <span className="text-[10px] md:text-xs text-muted-foreground truncate hidden sm:inline">• By {resource.author}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 shrink-0">
                        <Button variant="outline" size="sm" className="gap-2 h-8 md:h-9 text-xs md:text-sm hidden sm:flex">
                            <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            Download
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8 md:h-9 md:w-9 hidden md:flex"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <DialogDescription className="sr-only">
                    Viewing study material: {resource.title}
                </DialogDescription>

                <div className="flex-1 overflow-hidden p-0 md:p-2 bg-muted/10 h-full relative">
                    {resource.type.toLowerCase() === 'video' ? (
                        <div className="relative w-full h-full md:rounded-lg overflow-hidden bg-black flex items-center justify-center">
                            <iframe
                                src={resource.url}
                                className="w-full h-full aspect-video"
                                title={resource.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : resource.type.toLowerCase() === 'markdown' || resource.type.toLowerCase() === 'notes' ? (
                        <div className="h-full w-full md:rounded-lg border-0 md:border border-border overflow-hidden bg-background">
                            <MarkdownPreview
                                content={resource.content || resource.url || "# No content available"}
                                className="h-full"
                            />
                        </div>
                    ) : resource.type.toLowerCase() === 'pdf' ? (
                        <div className="relative w-full h-full md:rounded-lg overflow-hidden bg-muted/20">
                            <iframe
                                src={resource.url}
                                className="w-full h-full"
                                title={resource.title}
                            />
                            <div className="absolute bottom-4 right-4 z-10 md:hidden">
                                <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
                                    <Download className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-6 md:p-10 text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4 md:mb-6 ring-4 ring-background">
                                {getIcon(resource.type)}
                            </div>
                            <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">Preview Not Available</h3>
                            <p className="text-sm md:text-base text-muted-foreground max-w-sm mb-6">
                                This file type cannot be previewed directly. Please download the file to view its contents.
                            </p>
                            <Button className="gap-2 w-full sm:w-auto h-11 md:h-10">
                                <Download className="h-4 w-4" />
                                Download File ({resource.type})
                            </Button>
                        </div>
                    )}
                </div>

                <div className="p-3 md:p-4 border-t border-border/40 bg-background md:bg-secondary/5 shrink-0">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                        <div className="flex items-center gap-3 md:gap-4">
                            <span className="text-muted-foreground hidden sm:inline">
                                Last updated: {resource.updatedAt || "Recently"}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                                <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                {resource.views || 0}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3">
                            <Button variant="ghost" size="sm" className="h-8 md:h-9 px-2 md:px-3">
                                Share
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 md:h-9 px-2 md:px-3">
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
