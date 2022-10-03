/*
 * create-candidate.tsx
 * Ian Kollipara
 * 2022-09-29
 *
 * Create Candidate Page
 */

// Imports
import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import {
    AppShell,
    Title,
    Input,
    Select,
    Stepper,
    Group,
    NativeSelect,
    Switch,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import Header from "@/components/header";
import { useSession } from "next-auth/react";
import {
    IconAt,
    IconPhone,
    IconHome,
    IconRoad,
    IconSchool,
    IconCalendarEvent,
} from "@tabler/icons";
import client from "@/lib/prismadb";
import InputMask from "react-input-mask";

const numberOfSteps = 5;

const CreateCandidate: NextPage = (props: {
    data: { sid: string; name: string }[];
}) => {
    const { data, status } = useSession();
    const [active, setActive] = useState(0);
    const nextStep = () =>
        setActive((current) => (current < numberOfSteps ? current + 1 : current));
    const prevStep = () =>
        setActive((current) => (current > 0 ? current - 1 : current));

    const schools = props.data;

    const candidateForm = useForm({
        initialValues: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@gmail.com",
            phoneNumber: "",
            isMarried: false,
            wasRostered: false,
            addressHouseNumber: 0,
            addressStreet: "",
            addressState: "",
            addressZipCode: "",
            addressCountry: "United States",
            educationDegree: "",
            educationIsGraduated: false,
            educationGraduationDate: null,
            educationAt: (schools.length && schools[0].name) || "Unknown School",
        },
    });

    return (
        <AppShell header={<Header />}>
            <Title align="center" order={1}>
                Create your Candidate Profile
            </Title>
            <form onSubmit={candidateForm.onSubmit((value) => console.log(value))}>
                <Stepper active={active} onStepClick={setActive} breakpoint="md">
                    <Stepper.Step label="First Step" description="Add Your Email">
                        <Input.Wrapper
                            required
                            label="Your Email"
                            description="This is your email identifier. This can be changed later. Your Email should match the one used in either Google or Microsoft."
                        >
                            <Input type="email" icon={<IconAt />} />
                        </Input.Wrapper>
                    </Stepper.Step>
                    <Stepper.Step label="Second Step" description="Contact Information">
                        <Input.Wrapper
                            required
                            label="Your Name"
                            description="Please enter your first and last name."
                        >
                            <Group grow position="apart">
                                <Input placeholder="First Name" />
                                <Input placeholder="Last Name" />
                            </Group>
                        </Input.Wrapper>
                        <Input.Wrapper
                            label="Your Phone Number"
                            description="Add your phone number so Schools and Districts can contact you. This information can be hidden."
                        >
                            <Input
                                icon={<IconPhone />}
                                component={InputMask}
                                mask="+1 (999) 999-9999"
                                placeholder="Your Phone Number"
                            />
                        </Input.Wrapper>
                        <Switch label="Married?" />
                        <Switch label="Rostered?" />
                    </Stepper.Step>
                    <Stepper.Step label="Third Step" description="Your Address">
                        <Input.Wrapper label="House Number">
                            <Input icon={<IconHome />} />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label="Street"
                            description="Please use the full name, no abbreviations"
                        >
                            <Input icon={<IconRoad />} />
                        </Input.Wrapper>
                        <Input.Wrapper
                            label="Zip Code"
                            description="Please enter your ZipCode."
                        >
                            <Input
                                placeholder="Zip Code"
                                component={InputMask}
                                mask="99999"
                            />
                        </Input.Wrapper>
                    </Stepper.Step>
                    <Stepper.Step label="Fourth Step" description="Your Education">
                        Please just add your Undergraduate here.
                        <NativeSelect
                            label="Your Degree"
                            description="The type of degree you earned"
                            data={["B.S. Education", "B.A. Education", "B.S.", "B.A."]}
                            placeholder="Select One"
                        />
                        <Switch label="Graduated?" />
                        <DatePicker
                            icon={<IconCalendarEvent />}
                            label="Graduation Date"
                            description="Please select your graduation date"
                        />
                        <NativeSelect
                            icon={<IconSchool />}
                            label="Your Institution"
                            description="Select a valid institution"
                            data={schools.map((school) => {
                                return { label: school.name, value: school.sid };
                            })}
                        />
                    </Stepper.Step>
                </Stepper>
            </form>
        </AppShell>
    );
};

// Backend
export const getServerSideProps: GetServerSideProps = async (context) => {
    const schools = await client.school.findMany({
        select: {
            sid: true,
            name: true,
        },
    });

    return {
        props: {
            data: schools,
        },
    };
};

export default CreateCandidate;
