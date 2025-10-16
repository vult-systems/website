"use client";
import React from "react";
import ContentGrid from "../ui/content-grid";

interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  heroImage?: string;
  pubDate: Date;
  tags?: string[];
}

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  // Transform posts into ContentGrid items with formatted metadata
  const items = posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    heroImage: post.heroImage,
    tags: post.tags,
    metadata: (
      <>
        <time dateTime={post.pubDate.toISOString()}>
          {post.pubDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric' 
          })}
        </time>
        {post.tags && post.tags.length > 0 && (
          <>
            <span>•</span>
            <span className="truncate">{post.tags[0]}</span>
          </>
        )}
      </>
    )
  }));

  return (
    <ContentGrid 
      items={items}
      baseUrl="/log"
      filterType="tags"
      filterLabels={[
        "Web Dev",
        "Process",
        "Tutorial",
        "Education",
        "Thoughts",
        "Teaching",
        "Experiment",
        "3D",
        "Technical",
        "Houdini",
        "WIP"
      ]}
    />
  );
}
