/**
 * useNotifyNewMember.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Notification Hook for creating members
 */

// Imports
import { useNotify } from "@hooks/useNotify";

/**
 * ### useNotifyNewMember
 *
 * Handles prefilling useNotify for member creation.
 */
export const useNotifyNewMember = () =>
  useNotify({
    loading: "Adding Member now...",
    success: "Member successfully added!",
    failure: "Something went wrong",
  });
