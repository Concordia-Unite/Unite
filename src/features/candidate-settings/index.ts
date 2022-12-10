/* Candidate-settings

Candidate Settings
==================

Candidate can update their settings, and this implements that feature.
Included is a prefilled form with the current data of the candidate,
an update form, and a validator for that update form.

*/

import { usePreFilledUpdateForm } from "./hooks/usePreFilledUpdateForm";
import { PersonalInfoInput } from "./components/PersonalInfoInput";
import { updateFormValidator } from "./lib/update-form";

// Export Barrel
export { usePreFilledUpdateForm, PersonalInfoInput, updateFormValidator };
