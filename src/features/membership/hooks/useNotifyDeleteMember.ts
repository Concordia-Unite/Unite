/**
 * useNotifyDeleteMember.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Notification Hook for deleting members
 */

// Imports
import { useNotify } from "@hooks/useNotify";

/**
 * ### useNotifyDeleteMember
 *
 * Handles prefilling useNotify for member deletion.
 */
export const useNotifyDeleteMember = () =>
  useNotify({
    loading: "Deleting Member now...",
    success: "Member successfully deleted!",
    failure: "Something went wrong",
  });
