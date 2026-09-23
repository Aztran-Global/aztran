"use client";

import { useMutation, useQuery } from "convex/react";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback, useMemo, useState, type ReactElement } from "react";
import { toast } from "sonner";
import type { GenericId } from "convex/values";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ChevronDown } from "lucide-react";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useHydratedFormState } from "@/hooks/useHydratedFormState";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import { parseYoutubeVideoId, youtubeEmbedUrl } from "@/lib/youtube";

type StorageId = GenericId<"_storage">;

type FormState = {
  title: string;
  slug: string;
  youtubeUrl: string;
  summary: string;
  referenceDate: string;
  displayDate: string;
  seoTitle: string;
  seoDescription: string;
  coverImageId?: StorageId;
};

function emptyForm(): FormState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    title: "",
    slug: "",
    youtubeUrl: "",
    summary: "",
    referenceDate: today,
    displayDate: "",
    seoTitle: "",
    seoDescription: "",
  };
}

function fromDoc(d: Doc<"marketRecaps">): FormState {
  return {
    title: d.title,
    slug: d.slug,
    youtubeUrl: `https://www.youtube.com/watch?v=${d.youtubeVideoId}`,
    summary: d.summary,
    referenceDate: d.referenceDate,
    displayDate: d.displayDate,
    seoTitle: d.seoTitle ?? "",
    seoDescription: d.seoDescription ?? "",
    coverImageId: d.coverImageId,
  };
}

export function MarketRecapForm({
  marketRecapId,
}: {
  marketRecapId?: Id<"marketRecaps">;
}): ReactElement {
  const router = useRouter();
  const staffReady = useConvexStaffSessionReady();
  const existing = useQuery(
    api.marketRecaps.getMarketRecapById,
    staffReady && marketRecapId ? { id: marketRecapId } : "skip",
  );
  const verifyHuman = useRecaptchaGate();
  const createMarketRecap = useMutation(api.marketRecaps.createMarketRecap);
  const updateMarketRecap = useMutation(api.marketRecaps.updateMarketRecap);
  const publishMarketRecap = useMutation(api.marketRecaps.publishMarketRecap);
  const unpublishMarketRecap = useMutation(
    api.marketRecaps.unpublishMarketRecap,
  );
  const deleteMarketRecap = useMutation(api.marketRecaps.deleteMarketRecap);

  const [form, setForm, hydrated] = useHydratedFormState(
    marketRecapId,
    existing,
    emptyForm,
    fromDoc,
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, [setForm]);

  const coverUrl = useQuery(
    api.storage.getFileUrl,
    existing?.coverImageId ? { storageId: existing.coverImageId } : "skip",
  );
  const liveCoverUrl = useQuery(
    api.storage.getFileUrl,
    form.coverImageId ? { storageId: form.coverImageId } : "skip",
  );
  const previewCover = liveCoverUrl ?? coverUrl ?? null;

  const parsedVideoId = useMemo(
    () => parseYoutubeVideoId(form.youtubeUrl),
    [form.youtubeUrl],
  );

  if (marketRecapId && !hydrated) {
    return <div className="p-8 text-sm text-zinc-400">Loading…</div>;
  }

  const guard = async (action: string): Promise<boolean> => {
    try {
      await verifyHuman(action);
      return true;
    } catch {
      toast.error("Verification failed. Please try again.");
      return false;
    }
  };

  const buildArgs = (status: "draft" | "published") => ({
    title: form.title,
    slug: form.slug || slugify(form.title, { lower: true, strict: true }),
    youtubeUrl: form.youtubeUrl,
    summary: form.summary,
    referenceDate: form.referenceDate,
    displayDate: form.displayDate || form.referenceDate,
    status,
    coverImageId: form.coverImageId,
    seoTitle: form.seoTitle || undefined,
    seoDescription: form.seoDescription || undefined,
  });

  const saveDraft = async (): Promise<void> => {
    if (!parsedVideoId) {
      toast.error("Enter a valid YouTube URL or video ID.");
      return;
    }
    if (!(await guard("admin_market_recap_draft"))) return;
    const args = buildArgs("draft");
    if (marketRecapId) {
      await updateMarketRecap({ id: marketRecapId, patch: { ...args } });
    } else {
      await createMarketRecap(args);
    }
    router.push("/admin/market-recaps");
  };

  const publish = async (): Promise<void> => {
    if (!parsedVideoId) {
      toast.error("Enter a valid YouTube URL or video ID.");
      return;
    }
    if (!(await guard("admin_market_recap_publish"))) return;
    if (marketRecapId) {
      await updateMarketRecap({
        id: marketRecapId,
        patch: { ...buildArgs("draft") },
      });
      await publishMarketRecap({ id: marketRecapId });
    } else {
      const id = await createMarketRecap(buildArgs("draft"));
      await publishMarketRecap({ id });
    }
    router.push("/admin/market-recaps");
  };

  const unpublish = async (): Promise<void> => {
    if (!marketRecapId) return;
    if (!(await guard("admin_market_recap_unpublish"))) return;
    await unpublishMarketRecap({ id: marketRecapId });
    router.refresh();
  };

  const remove = async (): Promise<void> => {
    if (!marketRecapId) return;
    if (!(await guard("admin_market_recap_delete"))) return;
    await deleteMarketRecap({ id: marketRecapId });
    setConfirmOpen(false);
    router.push("/admin/market-recaps");
  };

  const published = existing?.status === "published";

  return (
    <motion.div
      className="mx-auto max-w-3xl space-y-6 rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-xl md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => void saveDraft()}>
          Save Draft
        </Button>
        <Button type="button" onClick={() => void publish()}>
          Publish
        </Button>
        {marketRecapId && published ? (
          <Button type="button" variant="secondary" onClick={() => void unpublish()}>
            Unpublish
          </Button>
        ) : null}
        {marketRecapId ? (
          <Button
            type="button"
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </Button>
        ) : null}
      </div>

      <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/5 px-4 py-3 font-body text-[13px] leading-relaxed text-white/80">
        <p className="font-medium text-cyan-200/95">Public site</p>
        <p className="mt-1.5">
          Published market recaps appear at{" "}
          <code className="rounded bg-black/30 px-1 py-0.5 text-[12px]">
            /insights/market-recaps
          </code>{" "}
          and on the Market Recaps tab of the main insights hub.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            onBlur={() => {
              if (!form.slug && form.title) {
                set(
                  "slug",
                  slugify(form.title, { lower: true, strict: true, trim: true }),
                );
              }
            }}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className="mt-2 font-mono text-sm"
          />
        </div>
        <div>
          <Label htmlFor="referenceDate">Reference date (ISO)</Label>
          <Input
            id="referenceDate"
            type="date"
            value={form.referenceDate}
            onChange={(e) => set("referenceDate", e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="displayDate">Display date</Label>
          <Input
            id="displayDate"
            value={form.displayDate}
            onChange={(e) => set("displayDate", e.target.value)}
            placeholder="March 2026"
            className="mt-2"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input
            id="youtubeUrl"
            value={form.youtubeUrl}
            onChange={(e) => set("youtubeUrl", e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-2"
          />
          {form.youtubeUrl.trim() && !parsedVideoId ? (
            <p className="mt-2 text-sm text-red-400">
              Could not parse a video ID from this URL.
            </p>
          ) : null}
          {parsedVideoId ? (
            <p className="mt-2 text-sm text-emerald-400/90">
              Video ID: {parsedVideoId}
            </p>
          ) : null}
        </div>
      </div>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-white/10 px-4 py-3 text-sm font-medium">
          Embed preview
          <ChevronDown className="size-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          {parsedVideoId ? (
            <div className="aspect-video overflow-hidden rounded-lg border border-white/10">
              <iframe
                src={youtubeEmbedUrl(parsedVideoId)}
                title="Preview"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-sm text-zinc-400">
              Enter a valid YouTube URL to preview the embed.
            </p>
          )}
        </CollapsibleContent>
      </Collapsible>

      <div>
        <Label htmlFor="summary">About this market recap</Label>
        <Textarea
          id="summary"
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          className="mt-2 min-h-[120px]"
          placeholder="What moved markets, over what period, and why it matters."
        />
      </div>

      <div>
        <Label>Thumbnail</Label>
        <div className="mt-2">
          <ImageUploader
            storageId={form.coverImageId}
            previewUrl={previewCover}
            onUploaded={(id) => set("coverImageId", id)}
            onRemoved={() => {
              setForm((f) => {
                const next = { ...f };
                delete next.coverImageId;
                return next;
              });
            }}
            label="Thumbnail"
          />
        </div>
      </div>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-white/10 px-4 py-3 text-sm font-medium">
          SEO
          <ChevronDown className="size-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <div>
            <Label htmlFor="seoTitle">SEO title</Label>
            <Input
              id="seoTitle"
              value={form.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO description</Label>
            <Textarea
              id="seoDescription"
              value={form.seoDescription}
              onChange={(e) => set("seoDescription", e.target.value)}
              className="mt-2 min-h-[80px]"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete market recap?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This permanently removes the market recap and its thumbnail.
          </p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => void remove()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
