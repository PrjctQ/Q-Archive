"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
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
import type { User } from "@supabase/supabase-js"

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Lazy load UIW Markdown Editor
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

// TODO: Current component accepts user as prop.
// Utilizing global context would be a much better approach

// NOTE: Using `getUser` requires unnecessary API calls

export function AddArchiveSheet({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date | undefined>();

  // Auto-generate slug
  function updateTitleAndSlug(value: string) {
    setTitle(value);
    let generatedSlug = "";

    if (value) {
      generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }
    setSlug(() => generatedSlug);
  }

  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: async () => {
      if (!date) return;

      const localISODate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString();

      await addArchive({
        title,
        slug,
        content,
        date: localISODate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setOpen(false);
      setTitle("");
      setSlug("");
      setContent("");
      setDate(undefined);
    },
  });


  async function handleSubmit() {
    if (!title || !slug || !content || !date) return;

    mutation.mutate();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">Add Archive</Button>
      </SheetTrigger>
      <SheetContent side="right" className="md:min-w-2xl p-10">
        <SheetHeader>
          <SheetTitle>Add New Archive</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 m-3">
          <div className="space-y-2.5">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => updateTitleAndSlug(e.target.value)}
            />
          </div>

          <div className="space-y-2.5">
            <Label>Slug (auto)</Label>
            <Input value={slug} readOnly />
          </div>

          <div className="flex items-center gap-4">
            {/* Date picker */}
          <div className="space-y-2.5">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="data-[empty=true]:text-muted-foreground w-54 md:w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

            {/* Author Info */}
            <div className="space-y-2.5 w-full">
              <Label>Author</Label>
              <Input value={user.email} readOnly />
            </div>

          <div className="space-y-2.5">
            <Label className="space-y-2.5">Content</Label>
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

interface Props {
  user: User
}
