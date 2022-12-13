import { Paper, Table, Text, Title } from "@mantine/core";
import type { RouterOutputs } from "@services/trpc";

interface Props {
  placementRequest: NonNullable<RouterOutputs["placementRequest"]["getById"]>;
}

export function PlacementRequestDetail(props: Props) {
  return (
    <>
      <Title order={3}>
        {props.placementRequest.positionPosition} in{" "}
        {props.placementRequest.subject}
      </Title>
      <Title color={"dimmed"} order={5}>
        From {props.placementRequest.requestee.name} -{" "}
        {props.placementRequest.requestee.variant.valueOf()}
      </Title>
      <Table highlightOnHover withColumnBorders withBorder>
        <thead>
          <tr>
            <th>Name</th>
            <th>Property</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full Time</td>
            <td>{props.placementRequest.isFullTime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Tenured</td>
            <td>{props.placementRequest.isTenured ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Salary</td>
            <td>${props.placementRequest.salary.toString()}</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>{props.placementRequest.startDate.toLocaleDateString()}</td>
          </tr>
          <tr>
            <td>Social Security Contribution</td>
            <td>
              {props.placementRequest.socialSecurityContribution.valueOf()}
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </Table>
      <Paper px="md" mt={"md"} withBorder shadow={"sm"}>
        <Text
          dangerouslySetInnerHTML={{
            __html: props.placementRequest.description,
          }}
        />
      </Paper>
    </>
  );
}
