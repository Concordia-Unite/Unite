/**
 * profile-biography.tsx
 * Ian Kollipara
 * 2022.10.05
 *
 * Profile Biography Component
 */

// Imports
import type { NextRouter } from "next/router";
import { useState } from "react";
import { Button, Text, Title, Stack } from "@mantine/core";
import BiographyModal from "../biography-modal";

type ProfileBiographyProps = {
  cid: string;
  initialBiography: string;
  isMe: boolean;
};

async function submitBiography(candidateCid: string, biographyValue: string) {
  try {
    await fetch(`/api/candidates/${candidateCid}`, {
      method: "PATCH",
      body: JSON.stringify({ biography: biographyValue }),
    });

    return true;
  } catch {
    return false;
  }
}

export const ProfileBiography = ({
  cid,
  initialBiography,
  isMe,
}: ProfileBiographyProps) => {
  const [showModal, setShowModal] = useState(false);
  const [biography, setBiography] = useState(initialBiography);

  if (isMe) {
    return (
      <Stack align={"center"}>
        <Title>Biography</Title>
        <BiographyModal
          toggle={showModal}
          setToggle={setShowModal}
          biographyValue={biography}
          setBiographyValue={setBiography}
          onSubmit={() =>
            submitBiography(cid, biography).then((res) => setShowModal(!res))
          }
        />
        <Text dangerouslySetInnerHTML={{ __html: biography }}></Text>
        <Button onClick={() => setShowModal(true)}>Change Biography</Button>
      </Stack>
    );
  } else {
    return (
      <Stack align={"center"}>
        <Title>Biography</Title>
        {biography !== "" ? (
          <Text dangerouslySetInnerHTML={{ __html: biography }} />
        ) : (
          <Text color={"dimmed"}>No Biography found</Text>
        )}
      </Stack>
    );
  }
};

export default ProfileBiography;
