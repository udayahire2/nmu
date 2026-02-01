import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, Clock, ExternalLink, Download } from "lucide-react";
import { getIcon, getResourceColor } from "./utils";
import type { StudyMaterial } from "./types";

interface StudyMaterialCardProps {
    resource: StudyMaterial;
    index: number;
    onView: (resource: StudyMaterial) => void;
}

export function StudyMaterialCard({ resource, index, onView }: StudyMaterialCardProps) {
    const colors = getResourceColor(resource.type);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
        >
            <Card className="group h-full flex flex-col border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden">
                <CardHeader className="p-4 pb-2 space-y-3">
                    {/* Type Badge */}
                    <div className="flex justify-between items-start">
                        <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} ${colors.ring} ring-1`}>
                            {getIcon(resource.type)}
                        </div>
                        <div className="flex gap-1">
                            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 h-5">
                                {resource.type}
                            </Badge>
                            {resource.isNew && (
                                <Badge className="bg-green-500/20 text-green-600 hover:bg-green-500/30 text-[10px] px-2 py-0.5 h-5">
                                    New
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Resource Info */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground">
                                {resource.subject}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{resource.rating || 4.5}</span>
                            </div>
                        </div>

                        <CardTitle className="text-base font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {resource.title}
                        </CardTitle>

                        <p className="text-xs text-muted-foreground line-clamp-1">
                            By {resource.author}
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="p-4 pt-0 flex-grow">
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {resource.description || "Comprehensive study material covering key concepts, examples, and problem sets."}
                        </p>

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/20">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1" title="Views">
                                    <Eye className="h-3 w-3" />
                                    {resource.views}
                                </span>
                                <span className="flex items-center gap-1" title="Duration/Pages">
                                    <Clock className="h-3 w-3" />
                                    {resource.duration || "N/A"}
                                </span>
                            </div>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                                {resource.semester || "Sem ?"}
                            </span>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-3 flex gap-2">
                    <Button
                        className="flex-1 h-9 rounded-lg bg-primary hover:bg-primary/90 shadow-sm text-xs"
                        size="sm"
                        onClick={() => onView(resource)}
                    >
                        {resource.type.toLowerCase() === 'video' ? 'Watch Now' : 'View Material'}
                        <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-border/60 hover:border-primary/50 hover:bg-secondary"
                        title="Download"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add download logic hint or callback
                        }}
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
