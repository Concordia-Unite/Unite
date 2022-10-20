/**
 * settings.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Candidate Settings
 */

import {
  AppShell,
  Avatar,
  Title,
  createStyles,
  Input,
  Switch,
  Grid,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { trpcClient } from "../../utils/trpc";
import RichTextEditor from "../../components/rte";
import { useEffect, useState } from "react";
import type {
  Candidate,
  CandidateAddress,
  CandidateEducation,
  School,
} from "@prisma/client";
import ReactInputMask from "react-input-mask";
import { IconPhone } from "@tabler/icons";
import { Header } from "../../components/header";
import { AddEducation } from "../../components/add-education";
const useStyles = createStyles((theme) => ({
  profilePic: {
    minHeight: "100%",
    minWidth: "100%",

    [theme.fn.smallerThan("md")]: {
      minHeight: "25vh",
      width: "25vh",
    },
  },
}));

const loadCandidateValues = async () =>
  await trpcClient.candidate.getCurrent.query({
    includeAddresses: true,
    includeEducation: true,
    includeSchools: false,
  });

const Settings: NextPage = () => {
  const { classes } = useStyles();
  const [biography, setBiography] = useState<string>();
  const settingsForm = useForm<
    Omit<
      Candidate & {
        attended: CandidateEducation[];
        addresses: CandidateAddress[];
      },
      "uid" | "cid" | "wasRostered" | "isMarried"
    >
  >({
    initialValues: {
      profilePictureUrl: "",
      email: "",
      firstName: "",
      lastName: "",
      showAddress: false,
      attended: [],
      addresses: [],
      biography: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    loadCandidateValues().then((values) => {
      settingsForm.setValues(values);
      setBiography(values.biography);
    });
  }, []);

  return (
    <AppShell header={<Header />}>
      <Title align="center">User Settings</Title>
      <form onSubmit={settingsForm.onSubmit((values) => console.log(values))}>
        <Grid grow gutter={"md"}>
          <Grid.Col md={12} lg={4}>
            <Avatar
              component="button"
              src={settingsForm.values.profilePictureUrl}
              color="cyan"
              className={classes.profilePic}
            >
              Click to Set
            </Avatar>
          </Grid.Col>
          <Grid.Col md={12} lg={8}>
            <Input.Wrapper label="Change your First Name">
              <Input
                placeholder="First Name"
                {...settingsForm.getInputProps("firstName")}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Change your Last Name">
              <Input
                placeholder="Last Name"
                {...settingsForm.getInputProps("lastName")}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Change your Email">
              <Input
                type={"email"}
                placeholder="Your Email"
                {...settingsForm.getInputProps("email")}
              />
            </Input.Wrapper>
            <Input.Wrapper label="Change your Phone Number">
              <Input
                component={ReactInputMask}
                mask="(999) 999-9999"
                icon={<IconPhone />}
                {...settingsForm.getInputProps("phoneNumber")}
              />
            </Input.Wrapper>
            <Switch
              label="Show Address?"
              {...settingsForm.getInputProps("showAddress")}
            />
            <Input.Wrapper label="Update Your Biography">
              <RichTextEditor
                style={{ minHeight: "20vh" }}
                controls={[
                  [
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "clean",
                    "sub",
                    "sup",
                  ],
                  ["h1", "h2", "h3", "h4"],
                  ["alignLeft", "alignCenter", "alignRight"],
                  [
                    "unorderedList",
                    "orderedList",
                    "link",
                    "video",
                    "blockquote",
                  ],
                ]}
                value={biography}
                onChange={setBiography}
              />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col md={12} lg={6}>
            <AddEducation form={settingsForm} />
          </Grid.Col>
          <Grid.Col md={12} lg={6}></Grid.Col>
        </Grid>
        <Group pt={"xl"} position="center">
          <Button variant="default">Cancel</Button>
          <Button variant="outline">Apply Changes</Button>
        </Group>
      </form>
    </AppShell>
  );
};

export default Settings;
