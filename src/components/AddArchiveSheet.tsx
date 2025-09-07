"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addArchive } from "@/lib/archive.client";

// Lazy load UIW Markdown Editor
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), { ssr: false });

export function AddArchiveSheet() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  // Auto-generate slug
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    } else setSlug("");
  }, [title]);

  const handleSubmit = async () => {
    if (!title || !slug || !content || !date) return;

    const res = await addArchive({ title, slug, content, date });
    if (!res.error) {
      setOpen(false);
      setTitle("");
      setSlug("");
      setContent("");
      setDate("");
    } else {
      alert(res.error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">Add Archive</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Add New Archive</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <Label>Slug (auto)</Label>
            <Input value={slug} readOnly />
          </div>

          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <Label>Content</Label>
            <MdEditor
              style={{ height: "300px" }}
              value={content}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
              onChange={({ text }) => setContent(text)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Add Article
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
