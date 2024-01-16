"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createIngress } from "@/actions/ingress";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngerssType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const [ingerssType, setIngerssType] = useState<IngerssType>(RTMP);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingerssType))
        .then(() => {
          toast.success("Ingress created");
          closeRef.current?.click();
        })
        .catch((err) => {
          console.log(err);

          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingerssType}
          onValueChange={(value) => setIngerssType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingerss Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="w-4 h-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current
            connection.
          </AlertDescription>
        </Alert>
        <div className="flex items-center justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="primary" onClick={onSubmit} disabled={isPending}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
