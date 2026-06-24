"use client";

import { useSyncExternalStore } from "react";

import { OBFUSCATED_CONTACT } from "@/data/obfuscatedContact";
import { decodeContactPayload } from "@/lib/contactCipher";

export type RevealedContact = {
  email: string;
  phone: string;
};

const SERVER_SNAPSHOT = null;

let clientSnapshot: RevealedContact | null = null;

function subscribeNoop() {
  return () => {};
}

function getClientSnapshot(): RevealedContact {
  if (clientSnapshot === null) {
    clientSnapshot = {
      email: decodeContactPayload(OBFUSCATED_CONTACT.email),
      phone: decodeContactPayload(OBFUSCATED_CONTACT.phone),
    };
  }
  return clientSnapshot;
}

function getServerSnapshot(): null {
  return SERVER_SNAPSHOT;
}

export function useRevealedContact(): RevealedContact | null {
  return useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
}
