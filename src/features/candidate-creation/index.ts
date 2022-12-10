/* Candidate Creation

Candidate Creation
==================

This feature implements Candidate Creation through the use of a form,
as well as a component. The form used is pre-filled with the current user's
login info, making the experience easier.

*/

import { PersonalInfoInput } from "./components/PersonalInfoInput";
import { useSessionPreFilledForm } from "./hooks/useSessionPreFilledForm";

// Export Barrel

export { PersonalInfoInput, useSessionPreFilledForm };
