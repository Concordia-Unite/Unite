/*
 * biography-modal.tsx
 * Ian Kollipara
 * 2022-10-03
 *
 * Biography Modal
 */

// Imports
import { Button, DefaultProps, Group, Modal } from "@mantine/core";
import RichTextEditor from "@/components/rich-text-editor";
import { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";

interface BiographyModalProps extends DefaultProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  biographyValue: string;
  setBiographyValue: Dispatch<SetStateAction<string>>;
  onSubmit: (value: string) => void;
}

const BiographyModal = ({
  toggle,
  setBiographyValue,
  biographyValue,
  setToggle,
  onSubmit,
}: BiographyModalProps) => {
  return (
    <Modal
      title="Write your Biography"
      size="80%"
      centered
      opened={toggle}
      onClose={() => setToggle(false)}
    >
      <RichTextEditor
        controls={[
          ["bold", "italic", "underline", "strike", "clean", "sub", "sup"],
          ["h1", "h2", "h3", "h4"],
          ["alignLeft", "alignCenter", "alignRight"],
          [
            "unorderedList",
            "orderedList",
            "link",
            "video",
            "blockquote",
            "code",
          ],
        ]}
        value={biographyValue}
        style={{ minHeight: "50vh" }}
        onChange={setBiographyValue}
      />
      <Group mt="md" position="center">
        <Button onClick={() => onSubmit(biographyValue)} variant="subtle">
          Post
        </Button>
        <Button
          onClick={() => {
            setToggle(false);
            setBiographyValue("");
          }}
          color="red"
          variant="subtle"
        >
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default BiographyModal;
