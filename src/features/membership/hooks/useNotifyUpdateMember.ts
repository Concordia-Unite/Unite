/**
 * useNotifyUpdateMember.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Notification Hook for updating members
 */

// Imports
import { useNotify } from "@hooks/useNotify";

/**
 * ### useNotifyUpdateMember
 *
 * Handles prefilling useNotify for member updating.
 */
export const useNotifyUpdateMember = () =>
  useNotify({
    loading: "Updated Member now...",
    success: "Member successfully updated!",
    failure: "Something went wrong",
  });
