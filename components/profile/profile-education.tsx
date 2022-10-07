/**
 * profile-education.tsx
 * Ian Kollipara
 * 2022.10.05
 *
 * Profile Page Education
 */

// Imports
import { Group, Stack, Text, Title } from "@mantine/core";
import type { CandidateEducation, School } from "@prisma/client";
import { IconSchool } from "@tabler/icons";
import Address from "@/components/address";

type ProfileEducationProps = {
  education: (CandidateEducation & { at: School })[];
  alignment: string;
};

export const ProfileEducation = ({
  education,
  alignment,
}: ProfileEducationProps) => {
  return (
    <>
      <Title align={alignment as any}>Education</Title>
      {education.map((e) => (
        <Stack>
          <Group>
            <IconSchool />
            <Stack justify={"center"} spacing={0}>
              <Text>{e.at.name}</Text>
              <Text color={"dimmed"}>{e.degree}</Text>
            </Stack>
          </Group>
          <Address address={e.at} />
        </Stack>
      ))}
    </>
  );
};

export default ProfileEducation;
