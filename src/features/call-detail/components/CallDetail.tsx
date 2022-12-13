import { Accordion, Avatar, createStyles, Table, Title } from "@mantine/core";
import { PlacementRequestDetail } from "@features/placement-request-detail";
import type { RouterOutputs } from "@services/trpc";

const useStyles = createStyles((theme) => ({
  candidateBio: {
    display: "flex",
    alignItems: "flex-start",
  },
}));

interface Props {
  call: NonNullable<RouterOutputs["call"]["getById"]>;
}

export function CallDetail(props: Props) {
  const { classes } = useStyles();
  return (
    <>
      <Title order={3}>
        Call for {props.call.placementRequest.positionPosition} from{" "}
        {props.call.placementRequest.requestee.name}
      </Title>
      <Title order={4} color="dimmed">
        With Candidate {props.call.candidate.user.name}
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Property</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Status</td>
            <td>{props.call.status}</td>
          </tr>
        </tbody>
      </Table>
      <hr />
      <section className={classes.candidateBio}>
        <Avatar
          mr={"md"}
          src={props.call.candidate.user.image ?? ""}
          size="xl"
        />
        <section>
          <Title order={4}>{props.call.candidate.user.name}</Title>
          <Title order={5} color="dimmed">
            Email:{" "}
            <a href={`mailto:${props.call.candidate.user.email}`}>
              {props.call.candidate.user.email}
            </a>
          </Title>
        </section>
      </section>
      <hr />
      <PlacementRequestDetail placementRequest={props.call.placementRequest} />
    </>
  );
}
